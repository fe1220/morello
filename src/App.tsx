import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useDashboard } from './hooks/useDashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskCard } from './components/TaskCard';
import { JobCard } from './components/JobCard';
import { Auth } from './components/Auth';
import * as styles from './App.css';
import clsx from 'clsx';
import { LayoutDashboard, Briefcase, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { 
    tasks, jobs, loading: dataLoading,
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, deleteJob 
  } = useDashboard(user);
  const [activeTab, setActiveTab] = useState<'tasks' | 'jobs'>('tasks');

  const handleAddTask = () => {
    const title = prompt('새로운 할 일을 입력하세요:');
    if (title) addTask(title);
  };

  const handleAddJob = () => {
    const company = prompt('회사명을 입력하세요:');
    const position = prompt('지원 직무를 입력하세요:');
    if (company && position) addJob(company, position);
  };

  if (authLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>로딩 중...</div>;

  if (!user) return <Auth />;

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
            <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            로그아웃
          </button>
        </nav>
      </header>

      <main>
        {dataLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>데이터 동기화 중...</div>
        ) : activeTab === 'tasks' ? (
          <KanbanBoard
            title="생산성 대시보드"
            columns={[
              {
                id: 'todo',
                title: '할 일',
                count: tasks.filter(t => t.status === 'todo').length,
                onAdd: handleAddTask,
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
                onAdd: handleAddJob,
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
    </div>
  );
};

export default App;
