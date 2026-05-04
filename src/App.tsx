import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useDashboard } from './hooks/useDashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskCard } from './components/TaskCard';
import { JobCard } from './components/JobCard';
import { Auth } from './components/Auth';
import { Modal } from './components/Modal';
import * as modalStyles from './components/Modal.css';
import * as styles from './App.css';
import clsx from 'clsx';
import { LayoutDashboard, Briefcase, LogOut, LogIn } from 'lucide-react';

const App: React.FC = () => {
  const { user, isGuest, loading: authLoading, signOut } = useAuth();
  const { 
    tasks, jobs, loading: dataLoading,
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, deleteJob 
  } = useDashboard(user, isGuest);
  
  const [activeTab, setActiveTab] = useState<'tasks' | 'jobs'>('tasks');
  
  // Modal States - Moved up to avoid hook order violation
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // Form States - Moved up
  const [taskTitle, setTaskTitle] = useState('');
  const [jobForm, setJobForm] = useState({ company: '', position: '', url: '', memo: '' });

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle) {
      addTask(taskTitle);
      setTaskTitle('');
      setIsTaskModalOpen(false);
    }
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobForm.company && jobForm.position) {
      addJob(jobForm.company, jobForm.position, jobForm.url, jobForm.memo);
      setJobForm({ company: '', position: '', url: '', memo: '' });
      setIsJobModalOpen(false);
    }
  };

  // Conditional returns MUST come after all hook calls
  if (authLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b' }}>로딩 중...</div>;
  if (!user && !isGuest) return <Auth />;

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>🌊 Morello</h1>
        </div>
        <nav className={styles.nav}>
          <button 
            className={clsx(styles.navItem, activeTab === 'tasks' && styles.navActive)}
            onClick={() => setActiveTab('tasks')}
          >
            <LayoutDashboard size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            생산성 관리
          </button>
          <button 
            className={clsx(styles.navItem, activeTab === 'jobs' && styles.navActive)}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            취업 현황
          </button>
          <button className={styles.navItem} onClick={signOut}>
            {user ? (
              <>
                <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                로그아웃
              </>
            ) : (
              <>
                <LogIn size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                로그인
              </>
            )}
          </button>
        </nav>
      </header>

      <main>
        {dataLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>데이터 동기화 중...</div>
        ) : activeTab === 'tasks' ? (
          <KanbanBoard
            title="생산성 대시보드"
            columns={[
              {
                id: 'todo',
                title: '할 일',
                count: tasks.filter(t => t.status === 'todo').length,
                onAdd: () => setIsTaskModalOpen(true),
                children: tasks.filter(t => t.status === 'todo').map(t => (
                  <TaskCard 
                    key={t.id} 
                    task={t} 
                    onToggleTimer={toggleTimer} 
                    onDelete={deleteTask}
                    onStatusChange={updateTaskStatus}
                  />
                ))
              },
              {
                id: 'doing',
                title: '진행 중',
                count: tasks.filter(t => t.status === 'doing').length,
                children: tasks.filter(t => t.status === 'doing').map(t => (
                  <TaskCard 
                    key={t.id} 
                    task={t} 
                    onToggleTimer={toggleTimer} 
                    onDelete={deleteTask}
                    onStatusChange={updateTaskStatus}
                  />
                ))
              },
              {
                id: 'done',
                title: '완료',
                count: tasks.filter(t => t.status === 'done').length,
                children: tasks.filter(t => t.status === 'done').map(t => (
                  <TaskCard 
                    key={t.id} 
                    task={t} 
                    onToggleTimer={toggleTimer} 
                    onDelete={deleteTask}
                    onStatusChange={updateTaskStatus}
                  />
                ))
              }
            ]}
          />
        ) : (
          <KanbanBoard
            title="취업 진행 상황"
            columns={[
              {
                id: 'pending',
                title: '관심/준비',
                count: jobs.filter(j => j.status === 'pending').length,
                onAdd: () => setIsJobModalOpen(true),
                children: jobs.filter(j => j.status === 'pending').map(j => (
                  <JobCard key={j.id} job={j} onStatusChange={updateJobStatus} onDelete={deleteJob} />
                ))
              },
              {
                id: 'applied',
                title: '서류접수',
                count: jobs.filter(j => j.status === 'applied').length,
                children: jobs.filter(j => j.status === 'applied').map(j => (
                  <JobCard key={j.id} job={j} onStatusChange={updateJobStatus} onDelete={deleteJob} />
                ))
              },
              {
                id: 'interviewing',
                title: '면접진행',
                count: jobs.filter(j => j.status === 'interviewing').length,
                children: jobs.filter(j => j.status === 'interviewing').map(j => (
                  <JobCard key={j.id} job={j} onStatusChange={updateJobStatus} onDelete={deleteJob} />
                ))
              },
              {
                id: 'ended',
                title: '종료/불합격',
                count: jobs.filter(j => j.status === 'ended').length,
                children: jobs.filter(j => j.status === 'ended').map(j => (
                  <JobCard key={j.id} job={j} onStatusChange={updateJobStatus} onDelete={deleteJob} />
                ))
              },
              {
                id: 'passed',
                title: '합격',
                count: jobs.filter(j => j.status === 'passed').length,
                children: jobs.filter(j => j.status === 'passed').map(j => (
                  <JobCard key={j.id} job={j} onStatusChange={updateJobStatus} onDelete={deleteJob} />
                ))
              }
            ]}
          />
        )}
      </main>

      {/* Task Modal */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="새로운 할 일">
        <form onSubmit={handleTaskSubmit} className={modalStyles.form}>
          <div>
            <input 
              className={modalStyles.input}
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="할 일을 입력하세요"
              autoFocus
              required
            />
          </div>
          <div className={modalStyles.buttonGroup}>
            <button type="button" className={modalStyles.cancelButton} onClick={() => setIsTaskModalOpen(false)}>취소</button>
            <button type="submit" className={modalStyles.submitButton}>추가하기</button>
          </div>
        </form>
      </Modal>

      {/* Job Modal */}
      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="새로운 취업 정보">
        <form onSubmit={handleJobSubmit} className={modalStyles.form}>
          <div>
            <label className={modalStyles.label}>회사명</label>
            <input 
              className={modalStyles.input}
              value={jobForm.company}
              onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
              placeholder="회사 이름을 입력하세요"
              required
            />
          </div>
          <div>
            <label className={modalStyles.label}>지원 직무</label>
            <input 
              className={modalStyles.input}
              value={jobForm.position}
              onChange={(e) => setJobForm({...jobForm, position: e.target.value})}
              placeholder="예: 프론트엔드 개발자"
              required
            />
          </div>
          <div>
            <label className={modalStyles.label}>공고 링크 (URL)</label>
            <input 
              className={modalStyles.input}
              value={jobForm.url}
              onChange={(e) => setJobForm({...jobForm, url: e.target.value})}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={modalStyles.label}>간단 메모</label>
            <textarea 
              className={modalStyles.textarea}
              value={jobForm.memo}
              onChange={(e) => setJobForm({...jobForm, memo: e.target.value})}
              placeholder="연봉 정보, 우대 사항 등 기록"
            />
          </div>
          <div className={modalStyles.buttonGroup}>
            <button type="button" className={modalStyles.cancelButton} onClick={() => setIsJobModalOpen(false)}>취소</button>
            <button type="submit" className={modalStyles.submitButton}>추가하기</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default App;
