import React from 'react';
import * as styles from './JobCard.css';
import { Job, JobStatus } from '../types';
import clsx from 'clsx';
import { MoreHorizontal } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange, onDelete }) => {
  const statusLabels: Record<JobStatus, string> = {
    pending: '관심/준비',
    applied: '서류접수',
    interviewing: '면접진행',
    ended: '종료/불합격',
    passed: '합격',
  };

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className={styles.company}>{job.company}</div>
          <div className={styles.position}>{job.position}</div>
        </div>
        <button onClick={() => onDelete(job.id)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {(Object.keys(statusLabels) as JobStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(job.id, s)}
            className={clsx(styles.badge, job.status === s && (styles.statusColors as any)[s])}
            style={{ 
              cursor: 'pointer', 
              border: 'none',
              background: job.status === s ? undefined : 'rgba(255, 255, 255, 0.05)',
              color: job.status === s ? undefined : '#94a3b8'
            }}
          >
            {statusLabels[s]}
          </button>
        ))}
      </div>
    </div>
  );
};
