import React from 'react';
import * as styles from './JobCard.css';
import { Job, JobStatus } from '../types';
import { Trash2, ExternalLink, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onCardClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onStatusChange, onCardClick }) => {
  const statusLabels: Record<JobStatus, string> = {
    pending: '관심/준비',
    applied: '서류접수',
    interviewing: '면접진행',
    ended: '종료/불합격',
    passed: '합격',
  };

  const getSiteName = (url?: string) => {
    if (!url) return null;
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('wanted')) return '원티드';
    if (lowerUrl.includes('remember')) return '리멤버';
    if (lowerUrl.includes('groupby')) return '그룹바이';
    return '기타';
  };

  const siteName = getSiteName(job.url);

  return (
    <div className={clsx(styles.card, styles.cardStatusBg[job.status])} onClick={() => onCardClick(job)}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.companyWrapper}>
            <h3 className={styles.company}>{job.company}</h3>
          </div>
        </div>
      </div>
      
      <div className={styles.positionWrapper}>
        <p className={styles.position}>{job.position}</p>
        {job.url && (
          <div className={styles.linkWrapper}>
            <span className={styles.siteNameText}>{siteName}</span>
            <a 
              href={job.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.linkIcon}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
      
      {job.memo && <p className={styles.memo}>{job.memo}</p>}
      
      <div className={styles.footer}>
        <div className={styles.statusSelectWrapper}>
          <select 
            className={clsx(styles.statusSelect, styles.statusColors[job.status])}
            value={job.status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(job.id, e.target.value as JobStatus);
            }}
            onClick={(e) => e.stopPropagation()}
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
