import React, { useState, useEffect } from 'react';
import * as styles from './TaskCard.css';
import { Play, Pause, Trash2, Check } from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { formatTime } from '../utils/time';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onToggleTimer: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleTimer, onDelete, onStatusChange }) => {
  const [elapsed, setElapsed] = useState(task.totalTime);

  useEffect(() => {
    let interval: number | undefined;
    if (!task.isPaused && task.status === 'doing') {
      interval = window.setInterval(() => {
        const lastEntry = task.timeEntries[task.timeEntries.length - 1];
        if (lastEntry && !lastEntry.end) {
          const currentElapsed = new Date().getTime() - new Date(lastEntry.start).getTime();
          setElapsed(task.totalTime + currentElapsed);
        }
      }, 1000);
    } else {
      setElapsed(task.totalTime);
    }
    return () => clearInterval(interval);
  }, [task.isPaused, task.totalTime, task.timeEntries, task.status]);

  return (
    <div className={clsx(styles.card, styles.cardStatusBg[task.status])}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.controls}>
          {(task.status as string) !== 'done' && (
            <button 
              className={styles.timerButton} 
              onClick={() => onToggleTimer(task.id)}
              title={task.isPaused ? '시작' : '정지'}
            >
              {task.isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            </button>
          )}
          
          {(task.status as string) !== 'done' && (
            <button 
              className={styles.doneButton} 
              onClick={() => onStatusChange(task.id, 'done')}
              title="즉시 완료"
            >
              <Check size={18} />
            </button>
          )}
          
          <button 
            className={styles.deleteButton} 
            onClick={() => onDelete(task.id)}
            title="삭제"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {(elapsed > 0 || task.status === 'doing') && (
        <div className={styles.timerSection}>
          <div className={clsx(styles.timeText, !task.isPaused && styles.active)}>
            {formatTime(elapsed)}
          </div>
        </div>
      )}
    </div>
  );
};
