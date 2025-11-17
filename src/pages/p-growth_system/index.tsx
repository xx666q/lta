

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface BadgeData {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  date: string;
  status: string;
}

const GrowthSystemPage: React.FC = () => {
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 成长体系';
    return () => { document.title = originalTitle; };
  }, []);

  const badgeDataMap: Record<string, BadgeData> = {
    gold: {
      title: '金牌托管师',
      description: '连续30天无违规记录，服务质量优异，获得用户高度认可。',
      icon: 'fas fa-crown',
      gradient: 'from-yellow-400 to-yellow-600',
      date: '2024-01-15',
      status: '已获得'
    },
    love: {
      title: '爱心天使',
      description: '累计获得50个五星好评，展现出对宠物的爱心和专业的服务态度。',
      icon: 'fas fa-heart',
      gradient: 'from-pink-400 to-pink-600',
      date: '2024-01-10',
      status: '已获得'
    },
    efficiency: {
      title: '效率达人',
      description: '平均响应时间控制在5分钟以内，为用户提供快速高效的服务。',
      icon: 'fas fa-rocket',
      gradient: 'from-green-400 to-green-600',
      date: '2024-01-05',
      status: '已获得'
    },
    beginner: {
      title: '新手托管师',
      description: '完成首次托管服务，正式开启您的托管师职业生涯。',
      icon: 'fas fa-seedling',
      gradient: 'from-blue-400 to-blue-600',
      date: '2023-12-20',
      status: '已获得'
    }
  };

  const handleBadgeClick = (badgeType: string) => {
    const badge = badgeDataMap[badgeType];
    if (badge) {
      setSelectedBadge(badge);
      setShowBadgeModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowBadgeModal(false);
    setSelectedBadge(null);
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleAiServiceClick = () => {
    alert('AI客服功能开发中...');
  };

  const handleNotificationClick = () => {
    alert('您有3条新消息');
  };

  const handleUserMenuClick = () => {
    alert('用户菜单功能开发中...');
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
                onClick={handleUserMenuClick}
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
              >
                <img 
                  src="https://s.coze.cn/image/HU7CXTtO16w/" 
                  alt="李阿姨" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-text-primary font-medium">李阿姨</span>
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
            <Link 
              to="/service-publish" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-store text-lg"></i>
              <span className="font-medium">服务广场</span>
            </Link>
            <Link 
              to="/order-hall" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-bell text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </Link>
            <Link 
              to="/provider-order-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-list-alt text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <Link 
              to="/growth-system" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-trophy text-lg"></i>
              <span className="font-medium">成长体系</span>
            </Link>
            <Link 
              to="/user-profile" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
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
                <h2 className="text-2xl font-bold text-accent mb-2">成长体系</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">成长体系</span>
                </nav>
              </div>
              <button 
                onClick={handleAiServiceClick}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 综合评分区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">综合评分</h3>
            <div className={`${styles.glassCard} p-8 rounded-xl text-center`}>
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  4.8
                </div>
                <div className={`absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center ${styles.badgeGlow}`}>
                  <i className="fas fa-crown text-white text-lg"></i>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-accent mb-2">金牌托管师</h4>
              <p className="text-text-light mb-6">您的专业服务获得了用户的高度认可</p>
              
              {/* 评分构成 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-thumbs-up text-secondary text-xl"></i>
                  </div>
                  <p className="text-text-light text-sm mb-1">好评率</p>
                  <p className="text-2xl font-bold text-secondary">98%</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-handshake text-secondary text-xl"></i>
                  </div>
                  <p className="text-text-light text-sm mb-1">接单量</p>
                  <p className="text-2xl font-bold text-secondary">126单</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-bolt text-secondary text-xl"></i>
                  </div>
                  <p className="text-text-light text-sm mb-1">响应速度</p>
                  <p className="text-2xl font-bold text-secondary">95%</p>
                </div>
              </div>
            </div>
          </section>

          {/* 成长进度区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">成长进度</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 当前等级进度 */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-accent">当前等级：金牌托管师</h4>
                  <span className="text-secondary text-sm font-medium">Lv.3</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-text-light mb-2">
                    <span>当前进度</span>
                    <span>850 / 1000 分</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className={`${styles.progressBar} h-3 rounded-full`} style={{width: '85%'}}></div>
                  </div>
                </div>
                <p className="text-text-light text-sm">距离下一等级还需要 150 分</p>
              </div>

              {/* 徽章进度 */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-accent">本月目标</h4>
                  <span className="text-secondary text-sm font-medium">7/10 单</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-text-light mb-2">
                    <span>月度接单目标</span>
                    <span>70%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3">
                    <div className={`${styles.progressBar} h-3 rounded-full`} style={{width: '70%'}}></div>
                  </div>
                </div>
                <p className="text-text-light text-sm">再完成 3 单可获得"月度之星"徽章</p>
              </div>
            </div>
          </section>

          {/* 已获得徽章区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">我的徽章</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* 金牌托管师徽章 */}
              <div 
                onClick={() => handleBadgeClick('gold')}
                className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 ${styles.badgeGlow}`}>
                  <i className="fas fa-crown text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-accent text-sm mb-1">金牌托管师</h4>
                <p className="text-text-light text-xs">连续30天无违规</p>
              </div>

              {/* 爱心天使徽章 */}
              <div 
                onClick={() => handleBadgeClick('love')}
                className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 ${styles.badgeGlow}`}>
                  <i className="fas fa-heart text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-accent text-sm mb-1">爱心天使</h4>
                <p className="text-text-light text-xs">累计获得50个五星好评</p>
              </div>

              {/* 效率达人徽章 */}
              <div 
                onClick={() => handleBadgeClick('efficiency')}
                className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 ${styles.badgeGlow}`}>
                  <i className="fas fa-rocket text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-accent text-sm mb-1">效率达人</h4>
                <p className="text-text-light text-xs">平均响应时间&lt;5分钟</p>
              </div>

              {/* 新手徽章 */}
              <div 
                onClick={() => handleBadgeClick('beginner')}
                className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 ${styles.badgeGlow}`}>
                  <i className="fas fa-seedling text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-accent text-sm mb-1">新手托管师</h4>
                <p className="text-text-light text-xs">完成首次托管服务</p>
              </div>

              {/* 月度之星徽章（未获得） */}
              <div className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center ${styles.badgeLocked}`}>
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-star text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-text-light text-sm mb-1">月度之星</h4>
                <p className="text-text-light text-xs">本月完成10单服务</p>
                <div className="mt-2 text-xs text-text-light">
                  <span>进度：7/10</span>
                </div>
              </div>

              {/* 年度精英徽章（未获得） */}
              <div className={`${styles.glassCard} ${styles.achievementCard} p-4 rounded-xl text-center ${styles.badgeLocked}`}>
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-trophy text-white text-2xl"></i>
                </div>
                <h4 className="font-semibold text-text-light text-sm mb-1">年度精英</h4>
                <p className="text-text-light text-xs">年度完成100单服务</p>
                <div className="mt-2 text-xs text-text-light">
                  <span>进度：26/100</span>
                </div>
              </div>
            </div>
          </section>

          {/* 提升建议区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">个性化提升建议</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-lightbulb text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">提升接单响应速度</h4>
                    <p className="text-text-light text-sm">您当前的平均响应时间是8分钟，建议将响应时间控制在5分钟以内，可显著提升用户满意度。</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-camera text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">增加服务照片展示</h4>
                    <p className="text-text-light text-sm">建议在服务介绍中增加更多托管环境和宠物活动的照片，这能让宠物主人更放心地选择您的服务。</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">扩展服务时间</h4>
                    <p className="text-text-light text-sm">根据您所在区域的需求分析，周末和节假日的托管需求较大，建议考虑延长服务时间。</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-comments text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-1">及时回复用户评价</h4>
                    <p className="text-text-light text-sm">积极回复用户的评价，不仅能提升用户体验，还能展示您的专业态度，有助于获得更多订单。</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 徽章详情模态弹窗 */}
      {showBadgeModal && selectedBadge && (
        <div 
          onClick={handleModalBackdropClick}
          className={`fixed inset-0 ${styles.modalBackdrop} z-50 flex items-center justify-center p-4`}
        >
          <div className={`${styles.glassCard} max-w-md w-full rounded-xl p-6`}>
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${selectedBadge.gradient} rounded-full flex items-center justify-center mx-auto mb-4 ${styles.badgeGlow}`}>
                <i className={`${selectedBadge.icon} text-white text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">{selectedBadge.title}</h3>
              <p className="text-text-light mb-4">{selectedBadge.description}</p>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-text-light text-sm">获得时间：</span>
                  <span className="text-text-primary text-sm">{selectedBadge.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light text-sm">当前状态：</span>
                  <span className="text-secondary text-sm font-medium">{selectedBadge.status}</span>
                </div>
              </div>
              <button 
                onClick={handleCloseModal}
                className="w-full mt-6 bg-secondary text-white py-2 rounded-lg hover:bg-accent transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiServiceClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default GrowthSystemPage;

