import React from 'react';
import * as styles from './JobCard.css';
import { Job, JobStatus } from '../types';
import { Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

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
        <div className={styles.statusSelectWrapper}>
          <select 
            className={clsx(styles.statusSelect, styles.statusColors[job.status])}
            value={job.status}
            onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
          >
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <ChevronDown size={12} className={styles.selectIcon} />
        </div>
        <span className={styles.date}>{job.date}</span>
      </div>
    </div>
  );
};
