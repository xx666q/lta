import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 管理员工作台';
    return () => { document.title = originalTitle; };
  }, []);

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(`搜索: ${globalSearchValue}`);
      // 实际项目中这里会执行搜索逻辑
    }
  };

  const handleNotificationClick = () => {
    console.log('查看通知');
    // 实际项目中这里会显示通知列表
  };

  const handleUserMenuClick = () => {
    console.log('打开用户菜单');
    // 实际项目中这里会显示用户菜单
  };

  const handleAiCustomerServiceClick = () => {
    console.log('打开AI客服');
    // 实际项目中这里会打开AI客服
  };

  const handleAiChatFloatClick = () => {
    console.log('打开AI客服');
    // 实际项目中这里会打开AI客服
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    console.log('管理员退出登录');
    navigate('/login');
  };

  const handleQuickServiceManageClick = () => {
    console.log('跳转到服务管理页面');
    // 实际项目中这里会跳转到服务管理页面
  };

  const handleQuickContentModerationClick = () => {
    console.log('跳转到内容巡查页面');
    // 实际项目中这里会跳转到内容巡查页面
  };

  const handleTaskViewClick = (taskId: string) => {
    console.log(`查看任务详情: ${taskId}`);
    // 实际项目中这里会跳转到任务详情页面
  };

  const handleTaskApproveClick = (taskId: string) => {
    console.log(`通过任务: ${taskId}`);
    // 实际项目中这里会处理任务通过逻辑
  };

  const handleTaskRejectClick = (taskId: string) => {
    console.log(`拒绝任务: ${taskId}`);
    // 实际项目中这里会处理任务拒绝逻辑
  };

  const handleTaskCommentClick = (taskId: string) => {
    console.log(`处理投诉: ${taskId}`);
    // 实际项目中这里会处理投诉逻辑
  };

  const handleTableRowClick = (taskId: string) => {
    console.log(`查看任务详情: ${taskId}`);
    // 实际项目中这里会跳转到任务详情页面
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 顶部导航栏 */}
      <nav className={`${styles.glassNav} fixed top-0 left-0 right-0 z-50 h-16`}>
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <i className="fas fa-paw text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-accent">宠托帮</h1>
          </div>
          
          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索用户、服务、订单..." 
                value={globalSearchValue}
                onChange={(e) => setGlobalSearchValue(e.target.value)}
                onKeyPress={handleGlobalSearchKeyPress}
                className={`w-full px-4 py-2 pl-10 pr-4 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light"></i>
            </div>
          </div>
          
          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 消息通知 */}
            <button 
              onClick={handleNotificationClick}
              className={`relative p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
            >
              <i className="fas fa-bell text-text-secondary text-lg"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button 
                onClick={handleUserMenuToggle}
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
              >
                <img src="https://s.coze.cn/image/Tc7gGNDWrug/" 
                     alt="管理员头像" className="w-8 h-8 rounded-full" />
                <span className="text-text-primary font-medium">管理员</span>
                <i className="fas fa-chevron-down text-text-light text-sm"></i>
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${styles.glassEffect} py-1 z-10`}>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-white/30 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* 左侧菜单 */}
        <aside className={`${styles.glassSidebar} w-64 min-h-screen p-4`}>
          <nav className="space-y-2">
            <Link to="/admin-dashboard" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <Link to="#" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-users text-lg"></i>
              <span className="font-medium">用户管理</span>
            </Link>
            <Link to="#" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-cog text-lg"></i>
              <span className="font-medium">服务管理</span>
            </Link>
            <Link to="#" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <Link to="#" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-eye text-lg"></i>
              <span className="font-medium">内容巡查</span>
            </Link>
            <Link to="/data-dashboard" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-chart-bar text-lg"></i>
              <span className="font-medium">数据看板</span>
            </Link>
            <Link to="#" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-cogs text-lg"></i>
              <span className="font-medium">系统设置</span>
            </Link>
            <Link to="/admin-profile" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-user text-lg"></i>
              <span className="font-medium">个人中心</span>
            </Link>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6 min-h-screen">
          {/* 页面头部 */}
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">欢迎回来，管理员！</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">工作台</span>
                </nav>
              </div>
              <button 
                onClick={handleAiCustomerServiceClick}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 数据概览区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">数据概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">总注册用户数</p>
                    <p className="text-2xl font-bold text-secondary">1,247</p>
                    <p className="text-green-600 text-xs mt-1">
                      <i className="fas fa-arrow-up"></i> +12% 本月
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">活跃服务商数</p>
                    <p className="text-2xl font-bold text-accent">89</p>
                    <p className="text-green-600 text-xs mt-1">
                      <i className="fas fa-arrow-up"></i> +8% 本月
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-store text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">今日订单数</p>
                    <p className="text-2xl font-bold text-secondary">23</p>
                    <p className="text-green-600 text-xs mt-1">
                      <i className="fas fa-arrow-up"></i> +15% 今日
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-shopping-cart text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">待处理审核</p>
                    <p className="text-2xl font-bold text-accent">12</p>
                    <p className="text-red-600 text-xs mt-1">
                      <i className="fas fa-exclamation-triangle"></i> 需要处理
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-accent text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 快捷操作区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">快捷操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={handleQuickUserManageClick}
                className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">用户管理</h4>
                    <p className="text-text-light text-sm">管理平台用户账户</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={handleQuickServiceManageClick}
                className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-cog text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">服务管理</h4>
                    <p className="text-text-light text-sm">管理托管服务内容</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={handleQuickContentModerationClick}
                className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-eye text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">内容巡查</h4>
                    <p className="text-text-light text-sm">审核和巡查平台内容</p>
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* 待处理任务列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">待处理任务</h3>
              <Link to="#" className="text-secondary hover:text-accent text-sm font-medium">查看全部</Link>
            </div>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">任务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">用户/服务商</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">提交时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">紧急程度</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr 
                      onClick={() => handleTableRowClick('task-1')}
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">资质审核</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/_yGMeH8AUWI/" 
                               alt="李阿姨" className="w-6 h-6 rounded-full" />
                          <span>李阿姨 - 托管服务商</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-15 09:30</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">中等</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskViewClick('task-1');
                          }}
                          className="text-secondary hover:text-accent"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskApproveClick('task-1');
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskRejectClick('task-1');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      onClick={() => handleTableRowClick('task-2')}
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">投诉处理</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/1Twx77L_nYI/" 
                               alt="张小明" className="w-6 h-6 rounded-full" />
                          <span>张小明 - 宠物主人</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-15 14:20</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">紧急</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskViewClick('task-2');
                          }}
                          className="text-secondary hover:text-accent"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskCommentClick('task-2');
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <i className="fas fa-comment"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      onClick={() => handleTableRowClick('task-3')}
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">资质审核</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/z5gUxTgA6nM/" 
                               alt="王小姐" className="w-6 h-6 rounded-full" />
                          <span>王小姐 - 托管服务商</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-15 16:45</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">普通</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskViewClick('task-3');
                          }}
                          className="text-secondary hover:text-accent"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskApproveClick('task-3');
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskRejectClick('task-3');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* AI预测概览 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">AI预测概览</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-secondary text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-accent mb-2">未来7日订单峰值预测</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary text-sm">预测峰值日期：</span>
                      <span className="font-medium text-secondary">2024-01-20 (周六)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary text-sm">预计订单量：</span>
                      <span className="font-medium text-secondary">45-55 单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary text-sm">较平日增长：</span>
                      <span className="font-medium text-green-600">+80%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className={`${styles.progressBar} h-2 rounded-full`} style={{width: '75%'}}></div>
                    </div>
                    <p className="text-text-light text-xs">
                      <i className="fas fa-info-circle mr-1"></i>
                      建议提前准备充足的托管服务资源，确保服务质量
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiChatFloatClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default AdminDashboard;