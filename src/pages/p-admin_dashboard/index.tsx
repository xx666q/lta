import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminHeader, AdminSidebar, StatCard, QuickAction, TaskTable } from '@/components';
import { Task } from '@/components/TaskTable';
import styles from './styles.module.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '宠托帮 - 管理员工作台';
  }, []);

  const statList = [
    { title: '总注册用户数', value: '1,247', trend: '+12% 本月', trendType: 'up' as const, icon: 'fa-users', colorClass: 'bg-secondary/20 text-secondary' },
    { title: '活跃服务商数', value: '89', trend: '+8% 本月', trendType: 'up' as const, icon: 'fa-store', colorClass: 'bg-accent/20 text-accent' },
    { title: '今日订单数', value: '23', trend: '+15% 今日', trendType: 'up' as const, icon: 'fa-shopping-cart', colorClass: 'bg-secondary/20 text-secondary' },
    { title: '待处理审核', value: '12', trend: '需要处理', trendType: 'warning' as const, icon: 'fa-clock', colorClass: 'bg-accent/20 text-accent' },
  ];

  const quickList = [
    { title: '用户管理', desc: '管理平台用户账户', icon: 'fa-users', colorClass: 'bg-secondary/20 text-secondary', onClick: () => navigate('/users') },
    { title: '服务管理', desc: '管理托管服务内容', icon: 'fa-cog', colorClass: 'bg-secondary/20 text-secondary', onClick: () => navigate('/services') },
    { title: '内容巡查', desc: '审核和巡查平台内容', icon: 'fa-eye', colorClass: 'bg-secondary/20 text-secondary', onClick: () => navigate('/content') },
  ];

  const taskList: Task[] = [
    { id: 'task-1', type: '资质审核', typeColor: 'bg-blue-100 text-blue-800', user: { name: '李阿姨 - 托管服务商', avatar: 'https://s.coze.cn/image/_yGMeH8AUWI/' }, time: '2024-01-15 09:30', urgency: '中等', urgencyColor: 'bg-yellow-100 text-yellow-800', actions: ['view', 'approve', 'reject'] },
    { id: 'task-2', type: '投诉处理', typeColor: 'bg-red-100 text-red-800', user: { name: '张小明 - 宠物主人', avatar: 'https://s.coze.cn/image/1Twx77L_nYI/' }, time: '2024-01-15 14:20', urgency: '紧急', urgencyColor: 'bg-red-100 text-red-800', actions: ['view', 'comment'] },
    { id: 'task-3', type: '资质审核', typeColor: 'bg-blue-100 text-blue-800', user: { name: '王小姐 - 托管服务商', avatar: 'https://s.coze.cn/image/z5gUxTgA6nM/' }, time: '2024-01-15 16:45', urgency: '普通', urgencyColor: 'bg-green-100 text-green-800', actions: ['view', 'approve', 'reject'] },
  ];

  return (
    <div className={styles.pageWrapper}>
      <AdminHeader />
      <div className="flex pt-16">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">数据概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statList.map((s) => <StatCard key={s.title} {...s} />)}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">快捷操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickList.map((q) => <QuickAction key={q.title} {...q} />)}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">待处理任务</h3>
              <Link to="#" className="text-secondary hover:text-accent text-sm font-medium">查看全部</Link>
            </div>
            <TaskTable tasks={taskList} onAction={(action, id) => console.log(action, id)} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
