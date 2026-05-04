import { useState, useEffect, useCallback } from 'react';
import { Task, Job, TaskStatus, JobStatus } from '../types';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useDashboard = (user: User | null, isGuest: boolean) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Helper for LocalStorage (Guest Mode) ---
  const saveLocal = (key: string, data: any) => {
    if (isGuest && !user) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const fetchData = useCallback(async () => {
    if (!user && !isGuest) return;
    setLoading(true);
    
    if (user) {
      // Supabase Mode
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
    } else {
      // Guest Mode (LocalStorage)
      const localTasks = localStorage.getItem('morello_tasks');
      const localJobs = localStorage.getItem('morello_jobs');
      if (localTasks) setTasks(JSON.parse(localTasks));
      if (localJobs) setJobs(JSON.parse(localJobs));
    }
    setLoading(false);
  }, [user, isGuest]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTask = async (title: string) => {
    const newTaskObj = {
      title,
      status: 'todo' as TaskStatus,
      timeEntries: [],
      totalTime: 0,
      isPaused: true,
      createdAt: new Date().toISOString(),
    };

    if (user) {
      const { data } = await supabase.from('tasks').insert({
        user_id: user.id,
        title: newTaskObj.title,
        status: newTaskObj.status,
        time_entries: newTaskObj.timeEntries,
        total_time: newTaskObj.totalTime,
        is_paused: newTaskObj.isPaused,
      }).select().single();
      if (data) {
        const task: Task = { ...data, totalTime: 0, timeEntries: [], createdAt: data.created_at };
        setTasks(prev => [task, ...prev]);
      }
    } else {
      const task: Task = { ...newTaskObj, id: crypto.randomUUID() };
      const updated = [task, ...tasks];
      setTasks(updated);
      saveLocal('morello_tasks', updated);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (user) {
      const dbUpdates: any = {};
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.isPaused !== undefined) dbUpdates.is_paused = updates.isPaused;
      if (updates.timeEntries) dbUpdates.time_entries = updates.timeEntries;
      if (updates.totalTime !== undefined) dbUpdates.total_time = updates.totalTime;
      await supabase.from('tasks').update(dbUpdates).eq('id', id);
    }
    
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    setTasks(updated);
    saveLocal('morello_tasks', updated);
  };

  const toggleTimer = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const now = new Date().toISOString();
    let updates: Partial<Task> = {};

    if (task.isPaused) {
      updates = { isPaused: false, timeEntries: [...task.timeEntries, { start: now }] };
      // Todo 상태에서 시작하면 자동으로 Doing으로 변경
      if (task.status === 'todo') {
        updates.status = 'doing';
      }
    } else {
      const lastEntry = task.timeEntries[task.timeEntries.length - 1];
      if (!lastEntry || lastEntry.end) return;
      const updatedEntries = [...task.timeEntries];
      updatedEntries[updatedEntries.length - 1] = { ...lastEntry, end: now };
      const sessionTime = new Date(now).getTime() - new Date(lastEntry.start).getTime();
      updates = { isPaused: true, timeEntries: updatedEntries, totalTime: task.totalTime + sessionTime };
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
    if (user) await supabase.from('tasks').delete().eq('id', id);
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveLocal('morello_tasks', updated);
  };

  const addJob = async (company: string, position: string, url?: string, memo?: string) => {
    const newJobObj = { company, position, url, memo, status: 'pending' as JobStatus, date: new Date().toISOString().split('T')[0] };
    if (user) {
      const { data } = await supabase.from('jobs').insert({ user_id: user.id, ...newJobObj }).select().single();
      if (data) setJobs(prev => [data, ...prev]);
    } else {
      const job: Job = { ...newJobObj, id: crypto.randomUUID() };
      const updated = [job, ...jobs];
      setJobs(updated);
      saveLocal('morello_jobs', updated);
    }
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    if (user) await supabase.from('jobs').update({ status }).eq('id', id);
    const updated = jobs.map(j => j.id === id ? { ...j, status } : j);
    setJobs(updated);
    saveLocal('morello_jobs', updated);
  };

  const deleteJob = async (id: string) => {
    if (user) await supabase.from('jobs').delete().eq('id', id);
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    saveLocal('morello_jobs', updated);
  };

  return {
    tasks, jobs, loading,
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, deleteJob
  };
};
