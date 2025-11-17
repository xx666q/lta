

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { Order, FilterType, FilterValue, RejectReason } from './types';

const OrderHallPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 筛选状态
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, FilterValue>>({
    'service-type': 'all',
    'pet-type': 'all',
    'price': 'all'
  });

  // 模态框状态
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentRejectOrderId, setCurrentRejectOrderId] = useState<string | null>(null);
  const [selectedRejectReason, setSelectedRejectReason] = useState<RejectReason | null>(null);

  // 订单数据
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD20240115001',
      serviceType: 'daycare',
      petType: 'dog',
      price: 80,
      publishTime: '2024-01-15 10:30',
      owner: {
        name: '张小明',
        avatar: 'https://s.coze.cn/image/t2RYDrC7Uws/',
        rating: 5.0,
        reviewCount: 15
      },
      pet: {
        name: '小金毛',
        avatar: 'https://s.coze.cn/image/Mui7-Rlc3Zw/',
        age: 7,
        gender: 'male',
        breed: '金毛'
      },
      serviceTime: {
        startDate: '2024-01-18',
        startTime: '09:00',
        endTime: '18:00',
        duration: '共1天'
      },
      specialRequest: '宠物主人希望：狗狗需要按时喂食，每天需要遛弯两次，性格温顺不咬人，请您多费心照顾。'
    },
    {
      id: 'ORD20240115002',
      serviceType: 'weekcare',
      petType: 'cat',
      price: 350,
      publishTime: '2024-01-15 09:15',
      owner: {
        name: '王小姐',
        avatar: 'https://s.coze.cn/image/v5PYY2_Vals/',
        rating: 4.9,
        reviewCount: 8
      },
      pet: {
        name: '小布偶',
        avatar: 'https://s.coze.cn/image/PzXj6UVgvEE/',
        age: 3,
        gender: 'female',
        breed: '布偶猫'
      },
      serviceTime: {
        startDate: '2024-01-20',
        endDate: '2024-01-26',
        duration: '共7天'
      },
      specialRequest: '宠物主人希望：猫咪比较胆小，需要安静的环境，每天需要梳理毛发，有固定的饮食习惯。'
    },
    {
      id: 'ORD20240115003',
      serviceType: 'hourcare',
      petType: 'small',
      price: 30,
      publishTime: '2024-01-15 08:45',
      owner: {
        name: '张先生',
        avatar: 'https://s.coze.cn/image/pDhQHmxke6A/',
        rating: 4.8,
        reviewCount: 12
      },
      pet: {
        name: '小泰迪',
        avatar: 'https://s.coze.cn/image/U0j58Q7goEg/',
        age: 5,
        gender: 'male',
        breed: '泰迪'
      },
      serviceTime: {
        startDate: '2024-01-16',
        startTime: '14:00',
        endTime: '16:00',
        duration: '共2小时'
      },
      specialRequest: '宠物主人希望：狗狗比较活泼，喜欢和其他小狗玩耍，需要牵绳遛弯，注意安全。'
    }
  ]);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 接单大厅';
    return () => { document.title = originalTitle; };
  }, []);

  // 筛选订单
  const filteredOrders = orders.filter(order => {
    // 服务类型筛选
    if (activeFilters['service-type'] !== 'all' && order.serviceType !== activeFilters['service-type']) {
      return false;
    }

    // 宠物类型筛选
    if (activeFilters['pet-type'] !== 'all' && order.petType !== activeFilters['pet-type']) {
      return false;
    }

    // 价格筛选
    if (activeFilters.price !== 'all') {
      switch (activeFilters.price) {
        case 'low':
          if (order.price >= 50) return false;
          break;
        case 'medium':
          if (order.price < 50 || order.price > 100) return false;
          break;
        case 'high':
          if (order.price <= 100) return false;
          break;
      }
    }

    return true;
  });

  // 处理筛选条件变化
  const handleFilterChange = (filterType: FilterType, value: FilterValue) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // 处理接单
  const handleAcceptOrder = (orderId: string) => {
    alert(`接单成功！订单号：${orderId}`);
    navigate(`/provider-order-manage?orderId=${orderId}`);
  };

  // 处理拒单
  const handleRejectOrder = (orderId: string) => {
    setCurrentRejectOrderId(orderId);
    setShowRejectModal(true);
  };

  // 关闭拒单模态框
  const closeRejectModal = () => {
    setShowRejectModal(false);
    setCurrentRejectOrderId(null);
    setSelectedRejectReason(null);
  };

  // 确认拒单
  const confirmRejectOrder = () => {
    if (selectedRejectReason && currentRejectOrderId) {
      console.log(`拒单成功！订单号：${currentRejectOrderId}，理由：${selectedRejectReason}`);
      
      // 从订单列表中移除拒单的订单
      setOrders(prev => prev.filter(order => order.id !== currentRejectOrderId));
      
      closeRejectModal();
      alert('拒单成功！');
    } else {
      alert('请选择拒单理由');
    }
  };

  // 处理通知
  const handleNotificationClick = () => {
    alert('您有5条新消息：\n1. 新订单提醒\n2. 订单状态更新\n3. 系统通知\n4. 评价提醒\n5. 提现到账通知');
  };

  // 处理AI客服
  const handleAiServiceClick = () => {
    alert('AI客服功能开发中...');
  };

  // 渲染星级评分
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i key={index} className="fas fa-star text-xs"></i>
    ));
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img 
                  src="https://s.coze.cn/image/NqQLxExYVCU/" 
                  alt="用户头像" 
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
              to="/service-square" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-store text-lg"></i>
              <span className="font-medium">服务广场</span>
            </Link>
            <Link 
              to="/order-hall" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-clipboard-list text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </Link>
            <Link 
              to="/provider-order-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-clipboard-check text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <Link 
              to="/growth-system" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
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
                <h2 className="text-2xl font-bold text-accent mb-2">接单大厅</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">接单大厅</span>
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
            <div className={`${styles.glassCard} p-4 rounded-xl`}>
              <h3 className="text-lg font-semibold text-accent mb-4">筛选条件</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 服务类型筛选 */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">服务类型</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all' as const, label: '全部' },
                      { value: 'daycare' as const, label: '日托' },
                      { value: 'weekcare' as const, label: '周托' },
                      { value: 'hourcare' as const, label: '小时陪遛' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('service-type', option.value)}
                        className={`px-3 py-1 text-sm border rounded-full hover:bg-secondary/10 transition-colors ${
                          activeFilters['service-type'] === option.value
                            ? `${styles.filterActive} border-secondary`
                            : 'border-text-light'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 宠物类型筛选 */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">宠物类型</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all' as const, label: '全部' },
                      { value: 'dog' as const, label: '狗狗' },
                      { value: 'cat' as const, label: '猫咪' },
                      { value: 'small' as const, label: '小型宠物' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('pet-type', option.value)}
                        className={`px-3 py-1 text-sm border rounded-full hover:bg-secondary/10 transition-colors ${
                          activeFilters['pet-type'] === option.value
                            ? `${styles.filterActive} border-secondary`
                            : 'border-text-light'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 价格范围筛选 */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">价格范围</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all' as const, label: '全部' },
                      { value: 'low' as const, label: '50元以下' },
                      { value: 'medium' as const, label: '50-100元' },
                      { value: 'high' as const, label: '100元以上' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('price', option.value)}
                        className={`px-3 py-1 text-sm border rounded-full hover:bg-secondary/10 transition-colors ${
                          activeFilters.price === option.value
                            ? `${styles.filterActive} border-secondary`
                            : 'border-text-light'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 订单列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">待处理订单</h3>
              <div className="flex items-center space-x-2 text-sm text-text-light">
                <i className="fas fa-clock mr-1"></i>
                <span>实时更新</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className={`${styles.orderCard} ${styles.glassCard} p-6 rounded-xl`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clipboard-list text-secondary text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-accent">订单 #{order.id}</h4>
                        <p className="text-sm text-text-light">发布时间：{order.publishTime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-secondary">
                        ¥{order.price}/{order.serviceType === 'daycare' ? '天' : order.serviceType === 'weekcare' ? '周' : '小时'}
                      </p>
                      <p className="text-sm text-text-light">
                        {order.serviceType === 'daycare' ? '日托服务' : order.serviceType === 'weekcare' ? '周托服务' : '小时陪遛'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* 宠物主人信息 */}
                    <div className="flex items-center space-x-3">
                      <img 
                        src={order.owner.avatar} 
                        alt={order.owner.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{order.owner.name}</p>
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            {renderStars(order.owner.rating)}
                          </div>
                          <span className="text-xs text-text-light">{order.owner.rating} ({order.owner.reviewCount}条评价)</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 宠物信息 */}
                    <div className="flex items-center space-x-3">
                      <img 
                        src={order.pet.avatar} 
                        alt={order.pet.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{order.pet.name}</p>
                        <p className="text-sm text-text-light">
                          {order.pet.age}岁 · {order.pet.gender === 'male' ? '公' : '母'} · {order.pet.breed}
                        </p>
                      </div>
                    </div>
                    
                    {/* 服务时间 */}
                    <div className="text-center">
                      <p className="font-medium text-text-primary">
                        {order.serviceTime.endDate ? `${order.serviceTime.startDate} 至 ${order.serviceTime.endDate}` : order.serviceTime.startDate}
                      </p>
                      {order.serviceTime.startTime && order.serviceTime.endTime && (
                        <p className="text-sm text-text-light">{order.serviceTime.startTime} - {order.serviceTime.endTime}</p>
                      )}
                      <p className="text-xs text-text-light">{order.serviceTime.duration}</p>
                    </div>
                  </div>
                  
                  {/* 特殊需求 */}
                  <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <i className="fas fa-comment-dots text-blue-500 mt-1"></i>
                      <div>
                        <p className="text-sm font-medium text-blue-700 mb-1">特殊需求</p>
                        <p className="text-sm text-blue-600">
                          <i className="fas fa-robot text-xs mr-1"></i>
                          {order.specialRequest}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex items-center justify-end space-x-3">
                    <button 
                      onClick={() => handleRejectOrder(order.id)}
                      className="px-4 py-2 border border-text-light text-text-secondary rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                    >
                      <i className="fas fa-times mr-2"></i>拒单
                    </button>
                    <button 
                      onClick={() => handleAcceptOrder(order.id)}
                      className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                    >
                      <i className="fas fa-check mr-2"></i>立即接单
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 空状态 */}
            {filteredOrders.length === 0 && (
              <div className={`${styles.glassCard} p-12 rounded-xl text-center`}>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clipboard-list text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">暂无符合条件的订单</h3>
                <p className="text-text-light">请尝试调整筛选条件或稍后再来查看</p>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* 拒单理由选择模态框 */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className={`${styles.modalOverlay} absolute inset-0`}
            onClick={closeRejectModal}
          ></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.glassCard} w-full max-w-md p-6 rounded-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent">选择拒单理由</h3>
                <button 
                  onClick={closeRejectModal}
                  className="text-text-light hover:text-text-primary"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { value: 'time-conflict' as const, label: '时间冲突，无法提供服务' },
                  { value: 'pet-type' as const, label: '不提供该类型宠物的托管服务' },
                  { value: 'distance' as const, label: '距离太远，不方便服务' },
                  { value: 'other' as const, label: '其他原因' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="reject-reason" 
                      value={option.value}
                      checked={selectedRejectReason === option.value}
                      onChange={(e) => setSelectedRejectReason(e.target.value as RejectReason)}
                      className="text-secondary focus:ring-secondary"
                    />
                    <span className="text-text-secondary">{option.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={confirmRejectOrder}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  确认拒单
                </button>
                <button 
                  onClick={closeRejectModal}
                  className="px-4 py-2 border border-text-light text-text-secondary rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
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

export default OrderHallPage;

