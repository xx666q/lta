

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const DataDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [region, setRegion] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalSearchValue, setGlobalSearchValue] = useState('');

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 数据看板';
    return () => { document.title = originalTitle; };
  }, []);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
    console.log('时间范围变更为:', e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    console.log('区域变更为:', e.target.value);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    console.log('刷新数据');
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleAiCustomerService = () => {
    alert('AI客服功能开发中...');
  };

  const handleNotificationClick = () => {
    alert('通知功能开发中...');
  };

  const handleUserMenuClick = () => {
    alert('用户菜单功能开发中...');
  };

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('搜索:', globalSearchValue);
    }
  };

  const handleChartClick = () => {
    console.log('点击图表查看详细数据');
  };

  const handleStatsCardClick = () => {
    console.log('点击统计卡片查看详细信息');
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
                placeholder="搜索用户、服务..." 
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button 
                onClick={handleUserMenuClick}
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
              >
                <img src="https://s.coze.cn/image/-UTK1-CBlR4/" 
                     alt="管理员头像" className="w-8 h-8 rounded-full" />
                <span className="text-text-primary font-medium">管理员</span>
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
              to="/admin-dashboard" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <Link 
              to="/user-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-users text-lg"></i>
              <span className="font-medium">用户管理</span>
            </Link>
            <Link 
              to="/service-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-cog text-lg"></i>
              <span className="font-medium">服务管理</span>
            </Link>
            <Link 
              to="/admin-order-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <Link 
              to="/content-moderation" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-eye text-lg"></i>
              <span className="font-medium">内容巡查</span>
            </Link>
            <Link 
              to="/data-dashboard" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-chart-bar text-lg"></i>
              <span className="font-medium">数据看板</span>
            </Link>
            <Link 
              to="/system-settings" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-cogs text-lg"></i>
              <span className="font-medium">系统设置</span>
            </Link>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6 min-h-screen">
          {/* 页面头部 */}
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">数据看板</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">数据看板</span>
                </nav>
              </div>
              <button 
                onClick={handleAiCustomerService}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 数据筛选器 */}
          <section className="mb-6">
            <div className={`${styles.glassCard} p-4 rounded-xl`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-text-primary">时间范围:</label>
                  <select 
                    value={timeRange}
                    onChange={handleTimeRangeChange}
                    className={`${styles.glassEffect} px-3 py-1 rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="7d">近7天</option>
                    <option value="30d">近30天</option>
                    <option value="90d">近90天</option>
                    <option value="1y">近1年</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-text-primary">区域:</label>
                  <select 
                    value={region}
                    onChange={handleRegionChange}
                    className={`${styles.glassEffect} px-3 py-1 rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="all">全部区域</option>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="guangzhou">广州</option>
                    <option value="shenzhen">深圳</option>
                  </select>
                </div>
                <button 
                  onClick={handleRefreshData}
                  className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors text-sm`}
                >
                  <i className={`fas fa-sync-alt mr-2 ${isRefreshing ? 'fa-spin' : ''}`}></i>
                  刷新数据
                </button>
              </div>
            </div>
          </section>

          {/* 核心指标卡片区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">核心指标</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div 
                onClick={handleStatsCardClick}
                className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">注册用户数</p>
                    <p className="text-2xl font-bold text-secondary">12,589</p>
                    <p className="text-green-600 text-sm mt-1">
                      <i className="fas fa-arrow-up mr-1"></i>
                      +12.5%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleStatsCardClick}
                className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">活跃服务商</p>
                    <p className="text-2xl font-bold text-accent">1,245</p>
                    <p className="text-green-600 text-sm mt-1">
                      <i className="fas fa-arrow-up mr-1"></i>
                      +8.3%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-store text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleStatsCardClick}
                className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">今日订单</p>
                    <p className="text-2xl font-bold text-secondary">89</p>
                    <p className="text-red-600 text-sm mt-1">
                      <i className="fas fa-arrow-down mr-1"></i>
                      -3.2%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-shopping-cart text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleStatsCardClick}
                className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">订单转化率</p>
                    <p className="text-2xl font-bold text-accent">67.8%</p>
                    <p className="text-green-600 text-sm mt-1">
                      <i className="fas fa-arrow-up mr-1"></i>
                      +5.1%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-percentage text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={handleStatsCardClick}
                className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">退款率</p>
                    <p className="text-2xl font-bold text-secondary">2.1%</p>
                    <p className="text-green-600 text-sm mt-1">
                      <i className="fas fa-arrow-down mr-1"></i>
                      -0.5%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-undo text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 趋势图区域 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">趋势分析</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">用户增长趋势</h4>
                <div 
                  onClick={handleChartClick}
                  className={`${styles.chartContainer} cursor-pointer`}
                >
                  <div className="text-center">
                    <i className="fas fa-chart-line text-4xl text-secondary mb-4"></i>
                    <p>用户增长趋势图表</p>
                    <p className="text-sm text-text-light mt-2">显示近30天用户注册趋势</p>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">订单量趋势</h4>
                <div 
                  onClick={handleChartClick}
                  className={`${styles.chartContainer} cursor-pointer`}
                >
                  <div className="text-center">
                    <i className="fas fa-chart-bar text-4xl text-accent mb-4"></i>
                    <p>订单量趋势图表</p>
                    <p className="text-sm text-text-light mt-2">显示近30天订单量变化</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 热门区域分布图 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">热门区域分布</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 地图区域 */}
                <div className="lg:col-span-2">
                  <div 
                    onClick={handleChartClick}
                    className={`${styles.chartContainer} h-64 cursor-pointer`}
                  >
                    <div className="text-center">
                      <i className="fas fa-map text-4xl text-secondary mb-4"></i>
                      <p>区域分布图</p>
                      <p className="text-sm text-text-light mt-2">显示各区域服务热度</p>
                    </div>
                  </div>
                </div>
                
                {/* 区域排名 */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-accent">区域热度排名</h5>
                  <div className="space-y-3">
                    <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-secondary text-white text-sm rounded-full flex items-center justify-center font-bold">1</span>
                        <span className="text-text-primary font-medium">朝阳区</span>
                      </div>
                      <span className="text-secondary font-bold">342单</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-accent text-white text-sm rounded-full flex items-center justify-center font-bold">2</span>
                        <span className="text-text-primary font-medium">海淀区</span>
                      </div>
                      <span className="text-accent font-bold">289单</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-secondary text-white text-sm rounded-full flex items-center justify-center font-bold">3</span>
                        <span className="text-text-primary font-medium">西城区</span>
                      </div>
                      <span className="text-secondary font-bold">198单</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-text-light text-white text-sm rounded-full flex items-center justify-center font-bold">4</span>
                        <span className="text-text-primary">东城区</span>
                      </div>
                      <span className="text-text-secondary">156单</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 bg-text-light text-white text-sm rounded-full flex items-center justify-center font-bold">5</span>
                        <span className="text-text-primary">丰台区</span>
                      </div>
                      <span className="text-text-secondary">123单</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI预测概览 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">AI预测分析</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 未来7日订单预测 */}
                <div>
                  <h4 className="font-semibold text-accent mb-4">未来7日订单峰值预测</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">今日</span>
                      <span className="text-secondary font-bold">89单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">明日</span>
                      <span className="text-accent font-bold">95单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">后天</span>
                      <span className="text-secondary font-bold">102单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">大后天</span>
                      <span className="text-accent font-bold">118单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">第5天</span>
                      <span className="text-secondary font-bold">135单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">第6天</span>
                      <span className="text-accent font-bold">142单</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary font-medium">第7天</span>
                      <span className="text-secondary font-bold">128单</span>
                    </div>
                  </div>
                </div>
                
                {/* 预测图表 */}
                <div>
                  <h4 className="font-semibold text-accent mb-4">预测趋势图</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">今日</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '62%'}}></div>
                      </div>
                      <span className="text-secondary font-bold text-sm">89</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">明日</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '66%'}}></div>
                      </div>
                      <span className="text-accent font-bold text-sm">95</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">后天</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '71%'}}></div>
                      </div>
                      <span className="text-secondary font-bold text-sm">102</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">大后天</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '82%'}}></div>
                      </div>
                      <span className="text-accent font-bold text-sm">118</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">第5天</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '94%'}}></div>
                      </div>
                      <span className="text-secondary font-bold text-sm">135</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">第6天</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '100%'}}></div>
                      </div>
                      <span className="text-accent font-bold text-sm">142</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-text-primary text-sm w-16">第7天</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3">
                        <div className={`${styles.predictionBar} h-3 rounded-full`} style={{width: '90%'}}></div>
                      </div>
                      <span className="text-secondary font-bold text-sm">128</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiCustomerService}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default DataDashboard;

