

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [globalSearchValue, setGlobalSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 托管服务商工作台';
    return () => { document.title = originalTitle; };
  }, []);

  const handleGlobalSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = globalSearchValue.trim();
      console.log('搜索:', searchTerm);
      alert(`搜索功能开发中，搜索内容: ${searchTerm}`);
    }
  };

  const handleNotificationClick = () => {
    console.log('查看通知');
    alert('通知功能开发中...');
  };

  const handleAiCustomerServiceClick = () => {
    console.log('打开AI客服');
    alert('AI客服功能开发中...');
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    console.log('用户退出登录');
    navigate('/login');
  };

  const handleOrderActionClick = (e: React.MouseEvent, action: string, orderId: string) => {
    e.stopPropagation();
    
    switch (action) {
      case 'daily-report':
        console.log('打开托管日报填写页面，订单ID:', orderId);
        alert('托管日报功能开发中...');
        break;
      case 'chat':
        console.log('打开与宠物主人的聊天，订单ID:', orderId);
        alert('聊天功能开发中...');
        break;
      case 'view':
        console.log('查看订单详情，订单ID:', orderId);
        navigate(`/provider-order-manage?orderId=${orderId}`);
        break;
    }
  };

  const handleTableRowClick = (orderId: string) => {
    navigate(`/provider-order-manage?orderId=${orderId}`);
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
                placeholder="搜索订单或宠物主人..." 
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
                onClick={handleUserMenuToggle}
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
              >
                <img src="https://s.coze.cn/image/lYmlpyV0TAo/" 
                     alt="李阿姨头像" className="w-8 h-8 rounded-full" />
                <span className="text-text-primary font-medium">李阿姨</span>
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
            <Link to="/provider-dashboard" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
              <i className="fas fa-store text-lg"></i>
              <span className="font-medium">服务广场</span>
            </Link>
            <Link to="/order-hall" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-bell text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </Link>
            <Link to="/provider-order-manage" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-list-alt text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <Link to="/growth-system" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-star text-lg"></i>
              <span className="font-medium">成长体系</span>
            </Link>
            <Link to="/user-profile" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
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
                <h2 className="text-2xl font-bold text-accent mb-2">欢迎回来，李阿姨！</h2>
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
                    <p className="text-text-light text-sm mb-1">待处理订单</p>
                    <p className="text-2xl font-bold text-secondary">3</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">进行中订单</p>
                    <p className="text-2xl font-bold text-accent">2</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-play-circle text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">可提现余额</p>
                    <p className="text-2xl font-bold text-secondary">¥2,350</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-wallet text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">综合评分</p>
                    <p className="text-2xl font-bold text-accent">4.8</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-star text-accent text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 快捷操作区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">快捷操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/service-publish" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-plus text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">发布服务</h4>
                    <p className="text-text-light text-sm">创建新的托管服务</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/order-hall" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-bell text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">查看接单大厅</h4>
                    <p className="text-text-light text-sm">处理新的订单推送</p>
                  </div>
                </div>
              </Link>
              
              <Link to="/provider-order-manage" className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors block`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-list-alt text-secondary text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent">管理订单</h4>
                    <p className="text-text-light text-sm">查看和处理所有订单</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* 最近订单列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">最近订单</h3>
              <Link to="/provider-order-manage" className="text-secondary hover:text-accent text-sm font-medium">查看全部</Link>
            </div>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">订单号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物信息</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物主人</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('ORD-20240115001')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240115001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">日托服务</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/bv5KK-o_pLg/" 
                               alt="金毛" className="w-6 h-6 rounded-full" />
                          <span>小金毛</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-15 09:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/M91ABENa5RQ/" 
                               alt="张小明" className="w-6 h-6 rounded-full" />
                          <span>张小明</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full">服务中</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          className="text-secondary hover:text-accent"
                          onClick={(e) => handleOrderActionClick(e, 'daily-report', 'ORD-20240115001')}
                        >
                          <i className="fas fa-file-alt"></i>
                        </button>
                        <button 
                          className="text-text-light hover:text-secondary"
                          onClick={(e) => handleOrderActionClick(e, 'chat', 'ORD-20240115001')}
                        >
                          <i className="fas fa-comment"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('ORD-20240116002')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240116002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">周托服务</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/p036FFjQylk/" 
                               alt="布偶猫" className="w-6 h-6 rounded-full" />
                          <span>小布偶</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-16 10:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/MwLexjiRjps/" 
                               alt="王小姐" className="w-6 h-6 rounded-full" />
                          <span>王小姐</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">已接单</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          className="text-text-light hover:text-secondary"
                          onClick={(e) => handleOrderActionClick(e, 'chat', 'ORD-20240116002')}
                        >
                          <i className="fas fa-comment"></i>
                        </button>
                      </td>
                    </tr>
                    <tr 
                      className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                      onClick={() => handleTableRowClick('ORD-20240114003')}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#20240114003</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">临时照看</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/oCRCNW18hJw/" 
                               alt="泰迪" className="w-6 h-6 rounded-full" />
                          <span>小泰迪</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">2024-01-14 14:00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        <div className="flex items-center space-x-2">
                          <img src="https://s.coze.cn/image/L92tFKEUuaU/" 
                               alt="张先生" className="w-6 h-6 rounded-full" />
                          <span>张先生</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">已完成</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button 
                          className="text-text-light hover:text-secondary"
                          onClick={(e) => handleOrderActionClick(e, 'view', 'ORD-20240114003')}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 成长体系概览 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">成长体系概览</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="flex items-start space-x-6">
                {/* 当前等级和徽章 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 ${styles.badgeGold} rounded-full flex items-center justify-center`}>
                      <i className="fas fa-crown text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-accent">金牌托管师</h4>
                      <p className="text-text-light text-sm">连续30天无违规，服务质量优秀</p>
                    </div>
                  </div>
                  
                  {/* 成长进度 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">下一等级进度</span>
                      <span className="text-sm font-medium text-secondary">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${styles.progressBar} h-2 rounded-full`} style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  {/* 提升建议 */}
                  <div>
                    <h5 className="font-semibold text-accent mb-2">提升建议</h5>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-check-circle text-green-500 mt-1 text-sm"></i>
                        <span className="text-sm text-text-secondary">保持当前服务质量，继续提供优质托管服务</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <i className="fas fa-arrow-right text-secondary mt-1 text-sm"></i>
                        <span className="text-sm text-text-secondary">建议增加服务类型，可考虑添加夜间托管服务</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 关键指标 */}
                <div className="w-48">
                  <h5 className="font-semibold text-accent mb-3">本月关键指标</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">好评率</span>
                      <span className="text-sm font-medium text-accent">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">接单量</span>
                      <span className="text-sm font-medium text-accent">25单</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">响应速度</span>
                      <span className="text-sm font-medium text-accent">平均3分钟</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">服务时长</span>
                      <span className="text-sm font-medium text-accent">120小时</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 宠物AI护理建议区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">宠物AI护理建议</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-robot text-secondary text-2xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-accent mb-2">基于当前托管宠物，为您推荐：</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-text-secondary text-sm">
                        <strong>小金毛 (7岁)：</strong>建议减少剧烈运动，每日适当散步即可，避免关节损伤。饮食上注意控制盐分摄入。
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-text-secondary text-sm">
                        <strong>小布偶 (3岁)：</strong>每日需要梳理毛发，预防毛球症，建议使用专用梳子。提供足够的水和猫抓板。
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-text-secondary text-sm">
                        <strong>小泰迪 (5岁)：</strong>注意口腔卫生，建议每周刷牙2-3次，定期检查牙齿健康。适当修剪毛发保持清洁。
                      </p>
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
        onClick={handleAiCustomerServiceClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default ProviderDashboard;

