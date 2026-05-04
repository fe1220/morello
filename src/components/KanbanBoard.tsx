import React from 'react';
import * as styles from './KanbanBoard.css';
import { Plus } from 'lucide-react';

interface KanbanBoardProps {
  title: string;
  columns: {
    id: string;
    title: string;
    count: number;
    onAdd?: () => void;
    children: React.ReactNode;
  }[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ title, columns }) => {
  return (
    <div>
      <h2 style={{ paddingLeft: '24px', marginTop: '24px' }}>{title}</h2>
      <div className={styles.boardContainer}>
        {columns.map((col) => (
          <div key={col.id} className={styles.column}>
            <div className={styles.columnHeader}>
              <span>{col.title}</span>
              <span className={styles.columnCount}>{col.count}</span>
            </div>
            {col.onAdd && (
              <button className={styles.addButton} onClick={col.onAdd}>
                <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                추가하기
              </button>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {col.children}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
