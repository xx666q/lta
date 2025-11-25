import React from 'react';
import styles from './styles.module.css';

export interface Task {
  id: string;
  type: string;
  typeColor: string;
  user: { name: string; avatar: string };
  time: string;
  urgency: string;
  urgencyColor: string;
  actions: ('view' | 'approve' | 'reject' | 'comment')[];
}

interface Props {
  tasks: Task[];
  onAction: (action: string, id: string) => void;
}

const TaskTable: React.FC<Props> = ({ tasks, onAction }) => (
  <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white/20">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">任务类型</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">用户</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">提交时间</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">紧急程度</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {tasks.map((t) => (
            <tr
              key={t.id}
              className={`${styles.tableRow} hover:bg-white/10 cursor-pointer`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 text-xs font-medium ${t.typeColor} rounded-full`}>
                  {t.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <img src={t.user.avatar} alt={t.user.name} className="w-6 h-6 rounded-full" />
                  <span>{t.user.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{t.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium ${t.urgencyColor} rounded-full`}>
                  {t.urgency}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                {t.actions.map((act) => (
                  <button
                    key={act}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction(act, t.id);
                    }}
                    className="text-secondary hover:text-accent"
                    title={act}
                  >
                    <i className={`fas fa-${
                      act === 'view' ? 'eye' : act === 'approve' ? 'check' : act === 'reject' ? 'times' : 'comment'
                    }`}></i>
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TaskTable;
