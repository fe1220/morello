import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useDashboard } from './hooks/useDashboard';
import { Auth } from './components/Auth';
import { TaskCard } from './components/TaskCard';
import { JobCard } from './components/JobCard';
import { Modal } from './components/Modal';
import { TaskStatus, JobStatus } from './types';
import * as modalStyles from './components/Modal.css';
import * as styles from './App.css';
import clsx from 'clsx';
import { LayoutDashboard, Briefcase, LogOut, LogIn, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const App: React.FC = () => {
  const { user, isGuest, loading: authLoading, signOut } = useAuth();
  const { 
    tasks, jobs, 
    addTask, updateTaskStatus, toggleTimer, deleteTask,
    addJob, updateJobStatus, deleteJob 
  } = useDashboard(user, isGuest);
  
  const [activeTab, setActiveTab] = useState<'tasks' | 'jobs'>('tasks');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  
  // Job form state
  const [jobCompany, setJobCompany] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [jobMemo, setJobMemo] = useState('');

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#0ea5e9' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Morello 로딩 중...</div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <Auth />;
  }

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(taskTitle);
    setTaskTitle('');
    setIsTaskModalOpen(false);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(jobCompany, jobPosition, jobUrl, jobMemo);
    setJobCompany('');
    setJobPosition('');
    setJobUrl('');
    setJobMemo('');
    setIsJobModalOpen(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (activeTab === 'tasks') {
      updateTaskStatus(draggableId, destination.droppableId as TaskStatus);
    } else {
      updateJobStatus(draggableId, destination.droppableId as JobStatus);
    }
  };

  const taskColumns: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: '할 일' },
    { id: 'doing', title: '진행 중' },
    { id: 'done', title: '완료' },
  ];

  const jobColumns: { id: JobStatus; title: string }[] = [
    { id: 'pending', title: '관심/준비' },
    { id: 'applied', title: '서류접수' },
    { id: 'interviewing', title: '면접진행' },
    { id: 'ended', title: '종료/불합격' },
    { id: 'passed', title: '합격' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span style={{ fontSize: '1.5rem' }}>🌊</span> Morello
        </div>
        <nav className={styles.nav}>
          <button 
            className={clsx(styles.navItem, activeTab === 'tasks' && styles.activeNav)} 
            onClick={() => setActiveTab('tasks')}
          >
            <LayoutDashboard size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            생산성 관리
          </button>
          <button 
            className={clsx(styles.navItem, activeTab === 'jobs' && styles.activeNav)} 
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          {activeTab === 'tasks' ? '생산성 대시보드' : '취업 진행 상황'}
        </h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.board}>
            {(activeTab === 'tasks' ? taskColumns : jobColumns).map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={clsx(styles.column, snapshot.isDraggingOver && styles.columnDraggingOver)}
                  >
                    <div className={styles.columnHeader}>
                      <h2 className={styles.columnTitle}>{column.title}</h2>
                      <span className={styles.count}>
                        {activeTab === 'tasks' 
                          ? tasks.filter(t => t.status === column.id).length 
                          : jobs.filter(j => j.status === column.id).length}
                      </span>
                    </div>
                    
                    {column.id === (activeTab === 'tasks' ? 'todo' : 'pending') && (
                      <button 
                        className={styles.addButton} 
                        onClick={() => activeTab === 'tasks' ? setIsTaskModalOpen(true) : setIsJobModalOpen(true)}
                      >
                        <Plus size={18} style={{ marginRight: '4px' }} /> 추가하기
                      </button>
                    )}

                    <div className={styles.cardList}>
                      {activeTab === 'tasks' 
                        ? tasks
                            .filter(task => task.status === column.id)
                            .map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      marginBottom: '12px',
                                      opacity: snapshot.isDragging ? 0.8 : 1
                                    }}
                                  >
                                    <TaskCard 
                                      task={task} 
                                      onToggleTimer={toggleTimer} 
                                      onDelete={deleteTask}
                                      onStatusChange={updateTaskStatus}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                        : jobs
                            .filter(job => job.status === column.id)
                            .map((job, index) => (
                              <Draggable key={job.id} draggableId={job.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      marginBottom: '12px',
                                      opacity: snapshot.isDragging ? 0.8 : 1
                                    }}
                                  >
                                    <JobCard 
                                      job={job} 
                                      onDelete={deleteJob}
                                      onStatusChange={updateJobStatus}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                      }
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Modals remain the same */}
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

      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="새로운 취업 정보">
        <form onSubmit={handleJobSubmit} className={modalStyles.form}>
          <div>
            <label className={modalStyles.label}>회사명</label>
            <input 
              className={modalStyles.input}
              value={jobCompany}
              onChange={(e) => setJobCompany(e.target.value)}
              placeholder="회사 이름을 입력하세요"
              autoFocus
              required
            />
          </div>
          <div>
            <label className={modalStyles.label}>포지션</label>
            <input 
              className={modalStyles.input}
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              placeholder="공고상의 직무를 입력하세요"
              required
            />
          </div>
          <div>
            <label className={modalStyles.label}>공고 링크 (선택)</label>
            <input 
              className={modalStyles.input}
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={modalStyles.label}>메모 (선택)</label>
            <textarea 
              className={modalStyles.textarea}
              value={jobMemo}
              onChange={(e) => setJobMemo(e.target.value)}
              placeholder="간단한 메모를 남겨보세요"
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
