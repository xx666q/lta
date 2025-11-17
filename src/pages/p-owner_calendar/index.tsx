

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface Order {
  id: string;
  serviceType: string;
  petName: string;
  petImage: string;
  startTime: string;
  endTime: string;
  providerName: string;
  providerImage: string;
  status: 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled';
  statusText: string;
  date: string;
}

const OwnerCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 模拟订单数据
  const [ordersData] = useState<Order[]>([
    {
      id: '20240101001',
      serviceType: '日托服务',
      petName: '小金毛',
      petImage: 'https://s.coze.cn/image/hd6gNfgRACQ/',
      startTime: '2024-01-15 09:00',
      endTime: '2024-01-15 18:00',
      providerName: '李阿姨',
      providerImage: 'https://s.coze.cn/image/FmrlWcQAFdA/',
      status: 'active',
      statusText: '服务中',
      date: '2024-01-15'
    },
    {
      id: '20240101002',
      serviceType: '周托服务',
      petName: '小布偶',
      petImage: 'https://s.coze.cn/image/VMZyFbPpVtA/',
      startTime: '2024-01-20 09:00',
      endTime: '2024-01-27 18:00',
      providerName: '王小姐',
      providerImage: 'https://s.coze.cn/image/tLFUDOHxUdU/',
      status: 'pending',
      statusText: '待接单',
      date: '2024-01-20'
    },
    {
      id: '20240101003',
      serviceType: '临时照看',
      petName: '小泰迪',
      petImage: 'https://s.coze.cn/image/It9QsaPc8V8/',
      startTime: '2024-01-10 14:00',
      endTime: '2024-01-10 20:00',
      providerName: '张先生',
      providerImage: 'https://s.coze.cn/image/7YfzI5tWaWY/',
      status: 'completed',
      statusText: '已完成',
      date: '2024-01-10'
    },
    {
      id: '20240101004',
      serviceType: '日托服务',
      petName: '小金毛',
      petImage: 'https://s.coze.cn/image/tnLoVgP-YWY/',
      startTime: '2024-01-16 09:00',
      endTime: '2024-01-16 18:00',
      providerName: '李阿姨',
      providerImage: 'https://s.coze.cn/image/XvI4Qa_0ops/',
      status: 'accepted',
      statusText: '已接单',
      date: '2024-01-16'
    },
    {
      id: '20240101005',
      serviceType: '小时陪遛',
      petName: '小泰迪',
      petImage: 'https://s.coze.cn/image/-Nib1soj7Yo/',
      startTime: '2024-01-08 10:00',
      endTime: '2024-01-08 11:00',
      providerName: '张先生',
      providerImage: 'https://s.coze.cn/image/gtrh0h4gEY0/',
      status: 'cancelled',
      statusText: '已取消',
      date: '2024-01-08'
    }
  ]);

  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [currentRatingOrderId, setCurrentRatingOrderId] = useState<string | null>(null);
  const [currentConfirmAction, setCurrentConfirmAction] = useState<(() => void) | null>(null);
  const [confirmModalTitle, setConfirmModalTitle] = useState<string>('确认操作');
  const [confirmModalMessage, setConfirmModalMessage] = useState<string>('您确定要执行此操作吗？');
  const [starRating, setStarRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>('');

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 托管日历';
    return () => { document.title = originalTitle; };
  }, []);

  // 筛选订单
  const filteredOrders = ordersData.filter(order => {
    const dateMatch = !selectedDate || order.date === selectedDate;
    const statusMatch = currentFilter === 'all' || order.status === currentFilter;
    return dateMatch && statusMatch;
  });

  // 处理日历日期点击
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  // 处理状态筛选
  const handleStatusFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  // 生成订单操作按钮
  const generateOrderActions = (order: Order) => {
    const actions = [];

    switch (order.status) {
      case 'pending':
        actions.push(
          <button 
            key="cancel"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleCancelOrder(e, order.id)}
          >
            <i className="fas fa-times"></i>
          </button>
        );
        actions.push(
          <button 
            key="reschedule"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleRescheduleOrder(e, order.id)}
          >
            <i className="fas fa-edit"></i>
          </button>
        );
        break;
      case 'accepted':
      case 'active':
        actions.push(
          <button 
            key="cloud-view"
            className="text-secondary hover:text-accent" 
            onClick={(e) => handleCloudView(e)}
          >
            <i className="fas fa-video"></i>
          </button>
        );
        actions.push(
          <button 
            key="contact"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleContactProvider(e, order.id)}
          >
            <i className="fas fa-comment"></i>
          </button>
        );
        if (order.status === 'accepted') {
          actions.push(
            <button 
              key="cancel"
              className="text-text-light hover:text-secondary" 
              onClick={(e) => handleCancelOrder(e, order.id)}
            >
              <i className="fas fa-times"></i>
            </button>
          );
        }
        break;
      case 'completed':
        actions.push(
          <button 
            key="rating"
            className="text-secondary hover:text-accent" 
            onClick={(e) => handleOpenRatingModal(e, order.id)}
          >
            <i className="fas fa-star"></i>
          </button>
        );
        actions.push(
          <button 
            key="tip"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleAddTip(e, order.id)}
          >
            <i className="fas fa-coins"></i>
          </button>
        );
        actions.push(
          <button 
            key="view"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleViewOrder(e, order.id)}
          >
            <i className="fas fa-eye"></i>
          </button>
        );
        break;
      case 'cancelled':
        actions.push(
          <button 
            key="refund"
            className="text-text-light hover:text-secondary" 
            onClick={(e) => handleApplyRefund(e, order.id)}
          >
            <i className="fas fa-undo"></i>
          </button>
        );
        break;
    }

    return actions;
  };

  // 订单操作处理函数
  const handleCancelOrder = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    showConfirmModalDialog(
      '取消订单',
      '确定要取消这个订单吗？取消后可能会产生相应的费用。',
      () => {
        console.log('取消订单:', orderId);
        alert('订单已取消');
      }
    );
  };

  const handleRescheduleOrder = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    showConfirmModalDialog(
      '改期订单',
      '确定要改期这个订单吗？',
      () => {
        console.log('改期订单:', orderId);
        alert('改期功能开发中...');
      }
    );
  };

  const handleCloudView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/cloud-view');
  };

  const handleContactProvider = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    console.log('联系服务商，订单ID:', orderId);
    alert('联系功能开发中...');
  };

  const handleOpenRatingModal = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    setCurrentRatingOrderId(orderId);
    setStarRating(0);
    setRatingComment('');
    setShowRatingModal(true);
  };

  const handleAddTip = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    showConfirmModalDialog(
      '追加小费',
      '确定要为这个订单追加小费吗？',
      () => {
        console.log('追加小费:', orderId);
        alert('小费追加成功');
      }
    );
  };

  const handleViewOrder = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    navigate(`/service-detail?orderId=${orderId}`);
  };

  const handleApplyRefund = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    showConfirmModalDialog(
      '申请退款',
      '确定要申请退款吗？',
      () => {
        console.log('申请退款:', orderId);
        alert('退款申请已提交，客服将在24小时内联系您');
      }
    );
  };

  // 星级评分处理
  const handleStarClick = (rating: number) => {
    setStarRating(rating);
  };

  // 提交评价
  const handleSubmitRating = () => {
    if (starRating === 0) {
      alert('请选择评分');
      return;
    }
    
    console.log('提交评价:', { orderId: currentRatingOrderId, rating: starRating, comment: ratingComment });
    setShowRatingModal(false);
    setCurrentRatingOrderId(null);
    setRatingComment('');
    alert('评价提交成功！');
  };

  // 显示确认模态弹窗
  const showConfirmModalDialog = (title: string, message: string, action: () => void) => {
    setConfirmModalTitle(title);
    setConfirmModalMessage(message);
    setCurrentConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  // 执行确认操作
  const handleConfirmAction = () => {
    if (currentConfirmAction) {
      currentConfirmAction();
    }
    setShowConfirmModal(false);
    setCurrentConfirmAction(null);
  };

  // 关闭模态弹窗
  const closeRatingModal = () => {
    setShowRatingModal(false);
    setCurrentRatingOrderId(null);
    setRatingComment('');
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setCurrentConfirmAction(null);
  };

  // AI客服处理
  const handleAiCustomerService = () => {
    alert('AI客服功能开发中...');
  };

  // 月份切换处理
  const handlePrevMonth = () => {
    console.log('切换到上个月');
  };

  const handleNextMonth = () => {
    console.log('切换到下个月');
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
            <button className={`relative p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
              <i className="fas fa-bell text-text-secondary text-lg"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img src="https://s.coze.cn/image/TuHYxNyjYbM/" 
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
            <Link to="/service-discovery" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-search text-lg"></i>
              <span className="font-medium">寻找服务</span>
            </Link>
            <Link to="/pet-profile" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-paw text-lg"></i>
              <span className="font-medium">我的宠物</span>
            </Link>
            <Link to="/owner-calendar" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
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
                <h2 className="text-2xl font-bold text-accent mb-2">托管日历</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">托管日历</span>
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

          {/* 日历视图和订单列表区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧日历视图 */}
            <div className="lg:col-span-1">
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-accent">2024年1月</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handlePrevMonth}
                      className={`p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
                    >
                      <i className="fas fa-chevron-left text-text-secondary"></i>
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className={`p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
                    >
                      <i className="fas fa-chevron-right text-text-secondary"></i>
                    </button>
                  </div>
                </div>
                
                {/* 日历头部 */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  <div className="text-center text-sm font-medium text-text-light py-2">日</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">一</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">二</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">三</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">四</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">五</div>
                  <div className="text-center text-sm font-medium text-text-light py-2">六</div>
                </div>
                
                {/* 日历主体 */}
                <div className="grid grid-cols-7 gap-1">
                  {/* 第一周 */}
                  <div className={`${styles.calendarDay} text-center py-3 text-text-light`}>31</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>1</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>2</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>3</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>4</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>5</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>6</div>
                  
                  {/* 第二周 */}
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>7</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>8</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>9</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>10</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>11</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>12</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>13</div>
                  
                  {/* 第三周 */}
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>14</div>
                  <div 
                    className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer ${styles.hasOrders} ${selectedDate === '2024-01-15' ? styles.selected : ''}`}
                    onClick={() => handleDateClick('2024-01-15')}
                  >
                    15
                  </div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>16</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>17</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>18</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>19</div>
                  <div 
                    className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer ${styles.hasOrders} ${selectedDate === '2024-01-20' ? styles.selected : ''}`}
                    onClick={() => handleDateClick('2024-01-20')}
                  >
                    20
                  </div>
                  
                  {/* 第四周 */}
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>21</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>22</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>23</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>24</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>25</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>26</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>27</div>
                  
                  {/* 第五周 */}
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>28</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>29</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>30</div>
                  <div className={`${styles.calendarDay} text-center py-3 rounded-lg cursor-pointer`}>31</div>
                  <div className={`${styles.calendarDay} text-center py-3 text-text-light`}>1</div>
                  <div className={`${styles.calendarDay} text-center py-3 text-text-light`}>2</div>
                  <div className={`${styles.calendarDay} text-center py-3 text-text-light`}>3</div>
                </div>
                
                {/* 图例 */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-text-accent mb-3">图例</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-secondary rounded"></div>
                      <span className="text-text-secondary">有订单</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-white border-2 border-secondary rounded"></div>
                      <span className="text-text-secondary">选中日期</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧订单列表 */}
            <div className="lg:col-span-2">
              {/* 状态筛选 */}
              <div className={`${styles.glassCard} p-4 rounded-xl mb-6`}>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleStatusFilter('all')}
                    className={`${currentFilter === 'all' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    全部订单
                  </button>
                  <button 
                    onClick={() => handleStatusFilter('pending')}
                    className={`${currentFilter === 'pending' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    待接单
                  </button>
                  <button 
                    onClick={() => handleStatusFilter('accepted')}
                    className={`${currentFilter === 'accepted' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    已接单
                  </button>
                  <button 
                    onClick={() => handleStatusFilter('active')}
                    className={`${currentFilter === 'active' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    服务中
                  </button>
                  <button 
                    onClick={() => handleStatusFilter('completed')}
                    className={`${currentFilter === 'completed' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    已完成
                  </button>
                  <button 
                    onClick={() => handleStatusFilter('cancelled')}
                    className={`${currentFilter === 'cancelled' ? styles.filterActive : styles.filterInactive} px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    已取消
                  </button>
                </div>
              </div>

              {/* 订单列表 */}
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
                      {filteredOrders.map(order => (
                        <tr key={order.id} className={`${styles.tableRow} hover:bg-white/10 transition-colors`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{order.serviceType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                            <div className="flex items-center space-x-2">
                              <img src={order.petImage} 
                                   alt={order.petName} className="w-6 h-6 rounded-full" />
                              <span>{order.petName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                            {order.startTime} - {order.endTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                            <div className="flex items-center space-x-2">
                              <img src={order.providerImage} 
                                   alt={order.providerName} className="w-6 h-6 rounded-full" />
                              <span>{order.providerName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`${styles.statusBadge} ${styles[`status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}>
                              {order.statusText}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            {generateOrderActions(order)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 评价模态弹窗 */}
      {showRatingModal && (
        <div className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center`}>
          <div className={`${styles.modalContent} w-full max-w-md mx-4 rounded-xl shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent">评价服务</h3>
                <button onClick={closeRatingModal} className="text-text-light hover:text-text-primary">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-2">
                  订单号: <span>#{currentRatingOrderId}</span>
                </p>
                <p className="text-sm text-text-secondary">
                  服务商: <span>
                    {ordersData.find(o => o.id === currentRatingOrderId)?.providerName || '张先生'}
                  </span>
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-accent mb-2">星级评分</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <i 
                      key={rating}
                      className={`fas fa-star text-2xl cursor-pointer hover:text-yellow-500 ${
                        rating <= starRating ? 'text-yellow-500' : 'text-yellow-400'
                      }`}
                      onClick={() => handleStarClick(rating)}
                    ></i>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="rating-comment" className="block text-sm font-medium text-text-accent mb-2">评价内容</label>
                <textarea 
                  id="rating-comment"
                  rows={3}
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="请描述您的服务体验..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleSubmitRating}
                  className="flex-1 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                >
                  提交评价
                </button>
                <button 
                  onClick={closeRatingModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 确认操作模态弹窗 */}
      {showConfirmModal && (
        <div className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center`}>
          <div className={`${styles.modalContent} w-full max-w-md mx-4 rounded-xl shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent">{confirmModalTitle}</h3>
                <button onClick={closeConfirmModal} className="text-text-light hover:text-text-primary">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <p className="text-text-secondary mb-6">
                {confirmModalMessage}
              </p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleConfirmAction}
                  className="flex-1 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                >
                  确认
                </button>
                <button 
                  onClick={closeConfirmModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
        onClick={handleAiCustomerService}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default OwnerCalendarPage;

