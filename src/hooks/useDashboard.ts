import { useState, useEffect, useCallback } from 'react';
import { Task, Job, TaskStatus, JobStatus } from '../types';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useDashboard = (user: User | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    
    const [tasksRes, jobsRes] = await Promise.all([
      supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      supabase.from('jobs').select('*').order('date', { ascending: false })
    ]);

    if (tasksRes.data) {
      setTasks(tasksRes.data.map(t => ({
        ...t,
        totalTime: Number(t.total_time),
        timeEntries: t.time_entries,
        createdAt: t.created_at,
        isPaused: t.is_paused
      })));
    }
    if (jobsRes.data) setJobs(jobsRes.data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = async (title: string) => {
    if (!user) return;
    const { data, error } = await supabase.from('tasks').insert({
      user_id: user.id,
      title,
      status: 'todo',
      time_entries: [],
      total_time: 0,
      is_paused: true,
    }).select().single();

    if (data) {
      const newTask: Task = { ...data, totalTime: 0, timeEntries: [], createdAt: data.created_at };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const dbUpdates: any = {};
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.isPaused !== undefined) dbUpdates.is_paused = updates.isPaused;
    if (updates.timeEntries) dbUpdates.time_entries = updates.timeEntries;
    if (updates.totalTime !== undefined) dbUpdates.total_time = updates.totalTime;

    const { error } = await supabase.from('tasks').update(dbUpdates).eq('id', id);
    if (!error) {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const toggleTimer = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const now = new Date().toISOString();
    let updates: Partial<Task> = {};

    if (task.isPaused) {
      // Start
      updates = {
        isPaused: false,
        timeEntries: [...task.timeEntries, { start: now }]
      };
    } else {
      // Pause
      const lastEntry = task.timeEntries[task.timeEntries.length - 1];
      if (!lastEntry || lastEntry.end) return;

      const updatedEntries = [...task.timeEntries];
      updatedEntries[updatedEntries.length - 1] = { ...lastEntry, end: now };
      const sessionTime = new Date(now).getTime() - new Date(lastEntry.start).getTime();
      
      updates = {
        isPaused: true,
        timeEntries: updatedEntries,
        totalTime: task.totalTime + sessionTime
      };
    }
    await updateTask(id, updates);
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    let updates: Partial<Task> = { status };
    
    if (status === 'done' && !task.isPaused) {
      const now = new Date().toISOString();
      const lastEntry = task.timeEntries[task.timeEntries.length - 1];
      if (lastEntry && !lastEntry.end) {
        const updatedEntries = [...task.timeEntries];
        updatedEntries[updatedEntries.length - 1] = { ...lastEntry, end: now };
        const sessionTime = new Date(now).getTime() - new Date(lastEntry.start).getTime();
        updates.isPaused = true;
        updates.timeEntries = updatedEntries;
        updates.totalTime = task.totalTime + sessionTime;
      }
    }
    await updateTask(id, updates);
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addJob = async (company: string, position: string) => {
    if (!user) return;
    const { data, error } = await supabase.from('jobs').insert({
      user_id: user.id,
      company,
      position,
      status: 'pending',
    }).select().single();

    if (data) setJobs(prev => [data, ...prev]);
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    const { error } = await supabase.from('jobs').update({ status }).eq('id', id);
    if (!error) setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j));
  };

  const deleteJob = async (id: string) => {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (!error) setJobs(prev => prev.filter(j => j.id !== id));
  };

  return {
    tasks, jobs, loading,
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, deleteJob
  };
};
