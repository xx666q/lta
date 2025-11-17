

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ServiceCardData {
  id: string;
  name: string;
  price: number;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
  serviceType: string;
  features: string[];
  petTypes: string;
  description: string;
  servedCount: number;
  responseTime: string;
}

const ServiceDiscoveryPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 状态管理
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('3');
  const [priceFilter, setPriceFilter] = useState('0-100');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('4.5');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [currentViewMode, setCurrentViewMode] = useState<'list' | 'map'>('list');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [serviceCount, setServiceCount] = useState(24);

  // 模拟服务数据
  const serviceCardsData: ServiceCardData[] = [
    {
      id: 'service1',
      name: '李阿姨的温馨宠物之家',
      price: 120,
      distance: '1.2 公里',
      rating: 5.0,
      reviewCount: 156,
      image: 'https://s.coze.cn/image/7HumVDPaI58/',
      serviceType: '日托服务',
      features: ['可接送', '金牌托管师'],
      petTypes: '狗狗、猫咪',
      description: '10年宠物护理经验，温馨家庭环境，24小时监控，专业喂养护理，让您的爱宠感受到家的温暖。',
      servedCount: 156,
      responseTime: '5分钟'
    },
    {
      id: 'service2',
      name: '王小姐的猫咪乐园',
      price: 150,
      distance: '2.1 公里',
      rating: 4.9,
      reviewCount: 89,
      image: 'https://s.coze.cn/image/HBZoZkdn7ao/',
      serviceType: '周托服务',
      features: ['24h监控'],
      petTypes: '猫咪',
      description: '专业猫咪护理师，猫咪专用活动空间，每日梳毛护理，定期消毒，让您的猫咪享受舒适的托管时光。',
      servedCount: 89,
      responseTime: '3分钟'
    },
    {
      id: 'service3',
      name: '张先生的狗狗训练营',
      price: 180,
      distance: '2.8 公里',
      rating: 4.6,
      reviewCount: 203,
      image: 'https://s.coze.cn/image/O_4mMZ6ute0/',
      serviceType: '小时陪遛',
      features: ['可接送', '宠物保险'],
      petTypes: '狗狗',
      description: '专业训犬师，大型户外活动空间，科学训练方法，让您的狗狗在托管期间得到充分的运动和训练。',
      servedCount: 203,
      responseTime: '8分钟'
    }
  ];

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 寻找服务';
    return () => { document.title = originalTitle; };
  }, []);

  // 处理筛选条件变化
  const handleFilterChange = () => {
    console.log('应用筛选条件');
    updateServiceCount();
  };

  // 处理多选筛选
  const handleMultiFilterToggle = (filterType: string) => {
    setSelectedFilters(prev => {
      const newSelected = prev.includes(filterType)
        ? prev.filter(f => f !== filterType)
        : [...prev, filterType];
      updateServiceCount();
      return newSelected;
    });
  };

  // 切换视图模式
  const handleViewModeSwitch = (viewType: 'list' | 'map') => {
    setCurrentViewMode(viewType);
  };

  // 更新服务数量
  const updateServiceCount = () => {
    const count = Math.floor(Math.random() * 30) + 15;
    setServiceCount(count);
  };

  // 处理服务卡片点击
  const handleServiceCardClick = (serviceId: string) => {
    navigate(`/service-detail?serviceId=${serviceId}`);
  };

  // 处理分页
  const handlePageChange = (page: number) => {
    console.log(`跳转到第 ${page} 页`);
    setCurrentPageNumber(page);
  };

  // 处理每页显示数量变化
  const handlePageSizeChange = (size: number) => {
    console.log(`每页显示 ${size} 条`);
    setItemsPerPage(size);
  };

  // 处理搜索
  const handleSearchInput = (value: string) => {
    setGlobalSearchTerm(value);
    if (value.trim().length > 0) {
      console.log(`搜索：${value}`);
    }
  };

  // 处理AI客服按钮点击
  const handleAiServiceClick = () => {
    console.log('打开AI客服');
  };

  // 渲染星级评分
  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-xs"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-xs"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-xs"></i>);
    }
    
    return stars;
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
                value={globalSearchTerm}
                onChange={(e) => handleSearchInput(e.target.value)}
                className={`w-full px-4 py-2 pl-10 pr-4 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50`}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light"></i>
            </div>
          </div>
          
          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 消息通知 */}
            <button className={`relative p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
              <i className="fas fa-bell text-text-secondary text-lg"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img src="https://s.coze.cn/image/Y51Ru3N1DaQ/" 
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
            <Link to="/owner-dashboard" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <Link to="/service-discovery" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
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
                <h2 className="text-2xl font-bold text-accent mb-2">寻找托管服务</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">寻找服务</span>
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

          {/* 筛选条件区 */}
          <section className="mb-6">
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-accent mb-4">筛选条件</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 距离筛选 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">距离范围</label>
                  <select 
                    value={distanceFilter}
                    onChange={(e) => {
                      setDistanceFilter(e.target.value);
                      handleFilterChange();
                    }}
                    className={`w-full px-3 py-2 rounded-lg ${styles.glassEffect} text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="3">≤3公里</option>
                    <option value="5">≤5公里</option>
                    <option value="10">≤10公里</option>
                    <option value="20">≤20公里</option>
                  </select>
                </div>
                
                {/* 价格区间 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">价格区间</label>
                  <select 
                    value={priceFilter}
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                      handleFilterChange();
                    }}
                    className={`w-full px-3 py-2 rounded-lg ${styles.glassEffect} text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="0-100">0-100元/天</option>
                    <option value="100-200">100-200元/天</option>
                    <option value="200-300">200-300元/天</option>
                    <option value="300+">300元/天以上</option>
                  </select>
                </div>
                
                {/* 宠物类型 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">宠物类型</label>
                  <select 
                    value={petTypeFilter}
                    onChange={(e) => {
                      setPetTypeFilter(e.target.value);
                      handleFilterChange();
                    }}
                    className={`w-full px-3 py-2 rounded-lg ${styles.glassEffect} text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="all">全部类型</option>
                    <option value="dog">狗狗</option>
                    <option value="cat">猫咪</option>
                    <option value="small">小型宠物</option>
                  </select>
                </div>
                
                {/* 评分筛选 */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">最低评分</label>
                  <select 
                    value={ratingFilter}
                    onChange={(e) => {
                      setRatingFilter(e.target.value);
                      handleFilterChange();
                    }}
                    className={`w-full px-3 py-2 rounded-lg ${styles.glassEffect} text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="4.5">≥4.5星</option>
                    <option value="4.0">≥4.0星</option>
                    <option value="3.5">≥3.5星</option>
                    <option value="3.0">≥3.0星</option>
                  </select>
                </div>
              </div>
              
              {/* 多选筛选 */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleMultiFilterToggle('pickup')}
                    className={`px-3 py-1 rounded-full border border-white/30 text-sm text-text-secondary hover:${styles.filterActive} transition-colors ${selectedFilters.includes('pickup') ? styles.filterActive : ''}`}
                  >
                    <i className="fas fa-car mr-1"></i>可接送
                  </button>
                  <button 
                    onClick={() => handleMultiFilterToggle('camera')}
                    className={`px-3 py-1 rounded-full border border-white/30 text-sm text-text-secondary hover:${styles.filterActive} transition-colors ${selectedFilters.includes('camera') ? styles.filterActive : ''}`}
                  >
                    <i className="fas fa-video mr-1"></i>24h监控
                  </button>
                  <button 
                    onClick={() => handleMultiFilterToggle('experience')}
                    className={`px-3 py-1 rounded-full border border-white/30 text-sm text-text-secondary hover:${styles.filterActive} transition-colors ${selectedFilters.includes('experience') ? styles.filterActive : ''}`}
                  >
                    <i className="fas fa-medal mr-1"></i>金牌托管师
                  </button>
                  <button 
                    onClick={() => handleMultiFilterToggle('insurance')}
                    className={`px-3 py-1 rounded-full border border-white/30 text-sm text-text-secondary hover:${styles.filterActive} transition-colors ${selectedFilters.includes('insurance') ? styles.filterActive : ''}`}
                  >
                    <i className="fas fa-shield-alt mr-1"></i>宠物保险
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 视图切换 */}
          <section className="mb-6">
            <div className={`${styles.glassCard} p-4 rounded-xl`}>
              <div className="flex items-center space-x-4">
                <span className="text-text-primary font-medium">视图模式：</span>
                <button 
                  onClick={() => handleViewModeSwitch('list')}
                  className={`${currentViewMode === 'list' ? styles.viewModeActive : ''} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                >
                  <i className="fas fa-list mr-2"></i>列表模式
                </button>
                <button 
                  onClick={() => handleViewModeSwitch('map')}
                  className={`${currentViewMode === 'map' ? styles.viewModeActive : ''} px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:${styles.viewModeActive} transition-colors`}
                >
                  <i className="fas fa-map mr-2"></i>地图模式
                </button>
              </div>
            </div>
          </section>

          {/* 服务列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">托管服务</h3>
              <div className="text-sm text-text-light">
                共找到 <span className="text-secondary font-medium">{serviceCount}</span> 个服务
              </div>
            </div>
            
            {/* 列表模式 */}
            {currentViewMode === 'list' && (
              <div className="space-y-4">
                {serviceCardsData.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceCardClick(service.id)}
                    className={`${styles.glassCard} ${styles.serviceCard} p-6 rounded-xl cursor-pointer`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img src={service.image} 
                             alt={`${service.name}头像`} className="w-16 h-16 rounded-full" />
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {renderStarRating(service.rating)}
                          </div>
                          <span className="text-xs text-text-light ml-1">{service.rating}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-accent">{service.name}</h4>
                          <span className="text-secondary font-bold text-lg">¥{service.price}<span className="text-sm font-normal">/天</span></span>
                        </div>
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">{service.serviceType}</span>
                          {service.features.map((feature, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 text-xs rounded-full ${
                                feature === '可接送' ? 'bg-accent/20 text-accent' :
                                feature === '金牌托管师' ? 'bg-green-100 text-green-800' :
                                feature === '24h监控' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-text-light text-sm mb-2">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          <span>距离您 {service.distance}</span>
                        </div>
                        <div className="flex items-center text-text-light text-sm mb-3">
                          <i className="fas fa-paw mr-1"></i>
                          <span>可托管：{service.petTypes}</span>
                        </div>
                        <p className="text-text-secondary text-sm mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-text-light">
                            <span><i className="fas fa-users mr-1"></i>已服务 {service.servedCount} 只宠物</span>
                            <span><i className="fas fa-clock mr-1"></i>响应时间 {service.responseTime}</span>
                          </div>
                          <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors">
                            查看详情
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 地图模式 */}
            {currentViewMode === 'map' && (
              <div className={styles.mapContainer}>
                <div className="text-center">
                  <i className="fas fa-map-marked-alt mb-4"></i>
                  <p className="text-lg font-medium">地图模式</p>
                  <p className="text-sm text-text-light mt-2">显示周边托管服务热力图</p>
                </div>
              </div>
            )}
          </section>

          {/* 分页控件 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} p-4 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-text-light">
                  <span>每页显示</span>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className={`px-2 py-1 rounded ${styles.glassEffect} text-text-primary focus:outline-none`}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <span>条，共 24 条记录</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(currentPageNumber - 1)}
                    disabled={currentPageNumber === 1}
                    className={`px-3 py-1 rounded ${styles.glassEffect} text-text-secondary hover:text-secondary transition-colors disabled:opacity-50`}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded bg-secondary text-white">1</button>
                  <button 
                    onClick={() => handlePageChange(2)}
                    className={`px-3 py-1 rounded ${styles.glassEffect} text-text-secondary hover:text-secondary transition-colors`}
                  >
                    2
                  </button>
                  <button 
                    onClick={() => handlePageChange(currentPageNumber + 1)}
                    className={`px-3 py-1 rounded ${styles.glassEffect} text-text-secondary hover:text-secondary transition-colors`}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

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

export default ServiceDiscoveryPage;

