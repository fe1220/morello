import React, { useState, useEffect } from 'react';
import * as styles from './TaskCard.css';
import { Play, Pause, Square, Trash2 } from 'lucide-react';
import { Task } from '../types';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onToggleTimer: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: any) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleTimer, onDelete, onStatusChange }) => {
  const [elapsed, setElapsed] = useState(task.totalTime);

  useEffect(() => {
    let interval: any;
    if (!task.isPaused && task.status === 'doing') {
      const lastEntry = task.timeEntries[task.timeEntries.length - 1];
      const startTime = new Date(lastEntry.start).getTime();
      
      interval = setInterval(() => {
        const now = new Date().getTime();
        setElapsed(task.totalTime + (now - startTime));
      }, 1000);
    } else {
      setElapsed(task.totalTime);
    }
    return () => clearInterval(interval);
  }, [task.isPaused, task.totalTime, task.timeEntries, task.status]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.title}>{task.title}</div>
        <button className={styles.iconButton} onClick={() => onDelete(task.id)}>
          <Trash2 size={14} />
        </button>
      </div>

      {task.status === 'doing' && (
        <div className={styles.timerSection}>
          <div className={clsx(styles.timeText, !task.isPaused && styles.active)}>
            {formatTime(elapsed)}
          </div>
          <div className={styles.controls}>
            <button className={styles.iconButton} onClick={() => onToggleTimer(task.id)}>
              {task.isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            </button>
            <button className={styles.iconButton} onClick={() => onStatusChange(task.id, 'done')}>
              <Square size={16} fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {task.status === 'todo' && (
        <button 
          className={styles.iconButton} 
          style={{ alignSelf: 'flex-start', color: '#38bdf8' }}
          onClick={() => onStatusChange(task.id, 'doing')}
        >
          <Play size={16} style={{ marginRight: '4px' }} /> 시작하기
        </button>
      )}

      {task.status === 'done' && (
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          소요 시간: {formatTime(task.totalTime)}
        </div>
      )}
    </div>
  );
};
