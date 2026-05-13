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
    
    try {
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
            timeEntries: t.time_entries || [],
            createdAt: t.created_at,
            isPaused: t.is_paused,
            status: t.status as TaskStatus
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
      const { data, error } = await supabase.from('tasks').insert({
        user_id: user.id,
        title: newTaskObj.title,
        status: newTaskObj.status,
        time_entries: newTaskObj.timeEntries,
        total_time: newTaskObj.totalTime,
        is_paused: newTaskObj.isPaused,
      }).select().single();

      if (error) {
        console.error('Error adding task:', error);
        return;
      }

      if (data) {
        const task: Task = { 
          ...data, 
          totalTime: Number(data.total_time), 
          timeEntries: data.time_entries || [], 
          createdAt: data.created_at,
          isPaused: data.is_paused,
          status: data.status as TaskStatus
        };
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
    // 낙관적 업데이트: 로컬 상태를 먼저 변경하여 즉각적인 피드백 제공
    const previousTasks = [...tasks];
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    setTasks(updated);
    saveLocal('morello_tasks', updated);

    if (user) {
      const dbUpdates: any = {};
      if (updates.status) dbUpdates.status = updates.status;
      if (updates.isPaused !== undefined) dbUpdates.is_paused = updates.isPaused;
      if (updates.timeEntries) dbUpdates.time_entries = updates.timeEntries;
      if (updates.totalTime !== undefined) dbUpdates.total_time = updates.totalTime;

      const { error } = await supabase.from('tasks').update(dbUpdates).eq('id', id);
      if (error) {
        console.error('Error updating task:', error);
        // 실패 시 롤백 (선택 사항이지만 안정성을 위해 권장)
        setTasks(previousTasks);
      }
    }
  };

  const toggleTimer = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const now = new Date().toISOString();
    let updates: Partial<Task> = {};

    if (task.isPaused) {
      updates = { isPaused: false, timeEntries: [...task.timeEntries, { start: now }] };
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
    
    // updateTask가 낙관적 업데이트를 수행하므로 즉시 반영됨
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
    const previousTasks = [...tasks];
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveLocal('morello_tasks', updated);

    if (user) {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) {
        console.error('Error deleting task:', error);
        setTasks(previousTasks);
      }
    }
  };

  const addJob = async (company: string, position: string, url?: string, memo?: string) => {
    const newJobObj = { company, position, url, memo, status: 'pending' as JobStatus, date: new Date().toISOString().split('T')[0] };
    if (user) {
      const { data, error } = await supabase.from('jobs').insert({ user_id: user.id, ...newJobObj }).select().single();
      if (error) {
        console.error('Error adding job:', error);
        return;
      }
      if (data) setJobs(prev => [data, ...prev]);
    } else {
      const job: Job = { ...newJobObj, id: crypto.randomUUID() };
      const updated = [job, ...jobs];
      setJobs(updated);
      saveLocal('morello_jobs', updated);
    }
  };

  const updateJob = async (id: string, updates: Partial<Job>) => {
    const previousJobs = [...jobs];
    const updated = jobs.map(j => j.id === id ? { ...j, ...updates } : j);
    setJobs(updated);
    saveLocal('morello_jobs', updated);

    if (user) {
      const { error } = await supabase.from('jobs').update(updates).eq('id', id);
      if (error) {
        console.error('Error updating job:', error);
        setJobs(previousJobs);
      }
    }
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    await updateJob(id, { status });
  };

  const deleteJob = async (id: string) => {
    const previousJobs = [...jobs];
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    saveLocal('morello_jobs', updated);

    if (user) {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (error) {
        console.error('Error deleting job:', error);
        setJobs(previousJobs);
      }
    }
  };

  return {
    tasks, jobs, loading,
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, updateJob, deleteJob
  };
};
