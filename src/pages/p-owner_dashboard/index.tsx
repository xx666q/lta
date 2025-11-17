

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [globalSearchValue, setGlobalSearchValue] = useState('');

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 宠物主人工作台';
    return () => { document.title = originalTitle; };
  }, []);

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = globalSearchValue.trim();
      if (searchTerm) {
        navigate(`/service-discovery?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  const handleNotificationClick = () => {
    console.log('查看通知功能');
    // 注释：此功能在个人中心或专门的通知页面实现
  };

  const handleUserAvatarClick = () => {
    navigate('/owner-profile');
  };

  const handleAiCustomerServiceClick = () => {
    console.log('需要调用第三方接口实现AI客服功能');
    // 注释：此功能需要调用AI客服API，在原型阶段仅做UI展示
  };

  const handleAiChatFloatClick = () => {
    console.log('需要调用第三方接口实现AI客服功能');
    // 注释：此功能需要调用AI客服API，在原型阶段仅做UI展示
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/cloud-view');
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('需要调用第三方接口实现实时聊天功能');
    // 注释：此功能需要调用聊天API，在原型阶段仅做UI展示
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('编辑订单功能');
    // 注释：此功能在托管日历页面实现
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要取消这个订单吗？')) {
      console.log('取消订单功能');
      // 注释：此功能在托管日历页面实现
    }
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('需要调用第三方接口实现服务评价功能');
    // 注释：此功能需要模态弹窗实现，在原型阶段仅做UI展示
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('查看订单详情功能');
    // 注释：此功能在服务详情页面实现
  };

  const handleTableRowClick = (orderId: string) => {
    navigate(`/service-detail?orderId=${orderId}`);
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
                placeholder="搜索托管服务..." 
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button 
                onClick={handleUserAvatarClick}
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
              >
                <img src="https://s.coze.cn/image/cBROkl94PBc/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
                <span className="text-text-primary font-medium">张小明</span>
                <i className="fas fa-chevron-down text-text-light text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* 左侧菜单 */}
        <aside className={`${styles.glassSidebar} w-64 min-h-screen p-4`}>
          <nav className="space-y-2">
            <Link to="/owner-dashboard" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <Link to="/service-discovery" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-search text-lg"></i>
              <span className="font-medium">寻找服务</span>
            </Link>
            <Link to="/pet-profile" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-paw text-lg"></i>
              <span className="font-medium">我的宠物</span>
            </Link>
            <Link to="/owner-calendar" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-calendar-alt text-lg"></i>
              <span className="font-medium">托管日历</span>
            </Link>
            <Link to="/owner-profile" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
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
                <h2 className="text-2xl font-bold text-accent mb-2">欢迎回来，张小明！</h2>
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

          {/* 快捷操作区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">快捷操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/service-discovery" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-search text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">寻找服务</h4>
                    <p className="text-text-light text-sm">快速找到合适的托管服务</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/pet-profile" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-plus text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">添加宠物</h4>
                    <p className="text-text-light text-sm">为您的爱宠创建档案</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/owner-calendar" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">查看日历</h4>
                    <p className="text-text-light text-sm">管理您的托管订单</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* 数据概览区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">数据概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">待处理订单</p>
                    <p className="text-2xl font-bold text-secondary">2</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">已完成订单</p>
                    <p className="text-2xl font-bold text-accent">15</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check-circle text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">我的宠物</p>
                    <p className="text-2xl font-bold text-secondary">3</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-paw text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">我的收藏</p>
                    <p className="text-2xl font-bold text-accent">8</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-heart text-accent text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 最近订单列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">最近订单</h3>
              <Link to="/owner-calendar" className="text-secondary hover:text-accent text-sm font-medium">查看全部</Link>
            </div>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">订单号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务商</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('20240101001')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240101001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">日托服务</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/DSTZkoIeqQA/" 
                               alt="金毛" className="w-6 h-6 rounded-full" />
                          <span>小金毛</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-15 09:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/yRzbAU5Fusc/" 
                               alt="李阿姨" className="w-6 h-6 rounded-full" />
                          <span>李阿姨</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full">服务中</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-secondary hover:text-accent" onClick={handleVideoClick}>
                          <i className="fas fa-video"></i>
                        </button>
                        <button className="text-text-light hover:text-secondary" onClick={handleChatClick}>
                          <i className="fas fa-comment"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('20240101002')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240101002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">周托服务</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/eN5JWMqDQAo/" 
                               alt="布偶猫" className="w-6 h-6 rounded-full" />
                          <span>小布偶</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-20 09:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/5iAGK8f3vGQ/" 
                               alt="王小姐" className="w-6 h-6 rounded-full" />
                          <span>王小姐</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">待接单</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-text-light hover:text-secondary" onClick={handleEditClick}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-text-light hover:text-secondary" onClick={handleCancelClick}>
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('20240101003')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240101003</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">临时照看</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/D1TZCNJFPAY/" 
                               alt="泰迪" className="w-6 h-6 rounded-full" />
                          <span>小泰迪</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-10 14:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/slfq_Lvm3P4/" 
                               alt="张先生" className="w-6 h-6 rounded-full" />
                          <span>张先生</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">已完成</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button className="text-secondary hover:text-accent" onClick={handleRatingClick}>
                          <i className="fas fa-star"></i>
                        </button>
                        <button className="text-text-light hover:text-secondary" onClick={handleViewClick}>
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

export default OwnerDashboard;

