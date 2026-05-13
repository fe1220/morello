import React, { useState, useEffect, useRef } from 'react';
import * as styles from './TaskCard.css';
import { Play, Pause, Trash2, Check, GripVertical, Pencil } from 'lucide-react';
import { Task, TaskStatus } from '../types';
import { formatTime } from '../utils/time';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onToggleTimer: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onUpdateTitle: (id: string, title: string) => void; // 제목 수정 함수 추가
  dragHandleProps?: any;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, onToggleTimer, onDelete, onStatusChange, onUpdateTitle, dragHandleProps 
}) => {
  const [elapsed, setElapsed] = useState(task.totalTime);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleSubmit = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onUpdateTitle(task.id, editedTitle.trim());
    } else {
      setEditedTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleTitleSubmit();
    if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={clsx(styles.card, styles.cardStatusBg[task.status])}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <div {...dragHandleProps} className={styles.dragHandle}>
            <GripVertical size={16} />
          </div>
          
          {isEditing ? (
            <input
              ref={inputRef}
              className={styles.editInput}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <h3 className={styles.title} onClick={() => setIsEditing(true)}>
              {task.title}
            </h3>
          )}
        </div>
        
        <div className={styles.controls}>
          {!isEditing && (
            <>
              <button 
                className={styles.iconButton}
                onClick={() => setIsEditing(true)}
                title="수정"
              >
                <Pencil size={14} />
              </button>

              {(task.status as string) !== 'done' && (
                <button 
                  className={styles.timerButton} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTimer(task.id);
                  }}
                  title={task.isPaused ? '시작' : '정지'}
                >
                  {task.isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                </button>
              )}
              
              {(task.status as string) !== 'done' && (
                <button 
                  className={styles.doneButton} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(task.id, 'done');
                  }}
                  title="즉시 완료"
                >
                  <Check size={18} />
                </button>
              )}
              
              <button 
                className={styles.deleteButton} 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                title="삭제"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {(elapsed > 0 || task.status === 'doing') && (
        <div className={styles.timerSection}>
          <div style={{ width: '24px' }} />
          <div className={clsx(styles.timeText, !task.isPaused && styles.active)}>
            {formatTime(elapsed)}
          </div>
        </div>
      )}
    </div>
  );
};
