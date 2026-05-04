export type TaskStatus = 'todo' | 'doing' | 'done';

export interface TimeEntry {
  start: string;
  end?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  timeEntries: TimeEntry[];
  totalTime: number; // in milliseconds
  isPaused: boolean;
}

export type JobStatus = 'pending' | 'applied' | 'interviewing' | 'ended' | 'passed';

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  date: string;
  notes?: string;
  url?: string;
  memo?: string;
}

export interface DashboardData {
  tasks: Task[];
  jobs: Job[];
}
