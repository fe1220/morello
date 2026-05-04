import React from 'react';
import * as styles from './JobCard.css';
import { Job, JobStatus } from '../types';
import { Trash2, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  const statusLabels: Record<JobStatus, string> = {
    pending: '관심/준비',
    applied: '서류접수',
    interviewing: '면접진행',
    ended: '종료/불합격',
    passed: '합격',
  };

  return (
    <div className={clsx(styles.card, styles.cardStatusBg[job.status])}>
      <div className={styles.header}>
        <h3 className={styles.company}>{job.company}</h3>
        <button className={styles.deleteButton} onClick={() => onDelete(job.id)}>
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className={styles.positionWrapper}>
        <p className={styles.position}>{job.position}</p>
        {job.url && (
          <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
      
      {job.memo && <p className={styles.memo}>{job.memo}</p>}
      
      <div className={styles.footer}>
        <span className={clsx(styles.statusBadge, styles.statusColors[job.status])}>
          {statusLabels[job.status]}
        </span>
        <span className={styles.date}>{job.date}</span>
      </div>
    </div>
  );
};
