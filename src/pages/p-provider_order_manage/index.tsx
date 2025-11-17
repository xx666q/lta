

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Order, OrderDetail } from './types';

const ProviderOrderManagePage: React.FC = () => {
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showOrderDetailPanel, setShowOrderDetailPanel] = useState<boolean>(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 订单管理';
    return () => { document.title = originalTitle; };
  }, []);

  // 模拟订单数据
  const orders: Order[] = [
    {
      id: 'ORD20240115001',
      orderId: '#ORD20240115001',
      ownerName: '张小明',
      ownerAvatar: 'https://s.coze.cn/image/0VZoEHrY-S0/',
      petName: '小金毛',
      petAvatar: 'https://s.coze.cn/image/UF_0z8WaRGo/',
      petAge: '7岁',
      serviceType: '日托服务',
      serviceTime: '2024-01-15 09:00 - 18:00',
      status: 'ongoing',
      statusText: '服务中'
    },
    {
      id: 'ORD20240120002',
      orderId: '#ORD20240120002',
      ownerName: '王小姐',
      ownerAvatar: 'https://s.coze.cn/image/u6bSSMC10xw/',
      petName: '小布偶',
      petAvatar: 'https://s.coze.cn/image/XAP0sq_AJvE/',
      petAge: '3岁',
      serviceType: '周托服务',
      serviceTime: '2024-01-20 09:00 - 2024-01-27 18:00',
      status: 'pending',
      statusText: '待接单'
    },
    {
      id: 'ORD20240110003',
      orderId: '#ORD20240110003',
      ownerName: '张先生',
      ownerAvatar: 'https://s.coze.cn/image/eF1S5T_71cc/',
      petName: '小泰迪',
      petAvatar: 'https://s.coze.cn/image/ksp6e22MnsA/',
      petAge: '5岁',
      serviceType: '临时照看',
      serviceTime: '2024-01-10 14:00 - 18:00',
      status: 'completed',
      statusText: '已完成'
    },
    {
      id: 'ORD20240108004',
      orderId: '#ORD20240108004',
      ownerName: '刘女士',
      ownerAvatar: 'https://s.coze.cn/image/Hvby740AdAI/',
      petName: '小柯基',
      petAvatar: 'https://s.coze.cn/image/pfZrMG0yQk0/',
      petAge: '2岁',
      serviceType: '小时陪遛',
      serviceTime: '2024-01-08 10:00 - 12:00',
      status: 'cancelled',
      statusText: '已取消'
    }
  ];

  // 筛选订单
  const filteredOrders = statusFilter 
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  // 全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  // 单选订单
  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(prev => [...prev, orderId]);
    } else {
      setSelectedOrderIds(prev => prev.filter(id => id !== orderId));
    }
  };

  // 显示确认对话框
  const showConfirmDialog = (message: string, callback: () => void) => {
    setConfirmMessage(message);
    setConfirmCallback(() => callback);
    setShowConfirmModal(true);
  };

  // 隐藏确认对话框
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmCallback(null);
  };

  // 执行确认操作
  const handleConfirmOk = () => {
    if (confirmCallback) {
      confirmCallback();
    }
    hideConfirmModal();
  };

  // 批量确认订单
  const handleBatchConfirm = () => {
    if (selectedOrderIds.length > 0) {
      showConfirmDialog('确定要批量确认这些订单吗？', () => {
        console.log('批量确认订单:', selectedOrderIds);
        alert('批量确认成功！');
      });
    }
  };

  // 批量设置档期
  const handleBatchAutoSchedule = () => {
    showConfirmDialog('确定要为选中订单设置自动档期吗？', () => {
      console.log('设置自动档期');
      alert('自动档期设置成功！');
    });
  };

  // 冲突检测
  const handleConflictDetection = () => {
    console.log('执行冲突检测');
    alert('冲突检测完成，未发现时间冲突订单。');
  };

  // 刷新订单
  const handleRefreshOrders = () => {
    console.log('刷新订单列表');
    alert('订单列表已刷新');
  };

  // 显示订单详情
  const showOrderDetail = (orderId: string) => {
    const orderDetails: Record<string, OrderDetail> = {
      'ORD20240115001': {
        orderId: 'ORD20240115001',
        ownerName: '张小明',
        ownerPhone: '138****8888',
        petName: '小金毛',
        petBreed: '金毛寻回犬',
        petAge: '7岁',
        serviceType: '日托服务',
        startTime: '2024-01-15 09:00',
        endTime: '2024-01-15 18:00',
        status: '服务中',
        specialRequests: '需要按时喂食，早晚各一次遛狗',
        contactInfo: '138****8888'
      },
      'ORD20240120002': {
        orderId: 'ORD20240120002',
        ownerName: '王小姐',
        ownerPhone: '139****9999',
        petName: '小布偶',
        petBreed: '布偶猫',
        petAge: '3岁',
        serviceType: '周托服务',
        startTime: '2024-01-20 09:00',
        endTime: '2024-01-27 18:00',
        status: '待接单',
        specialRequests: '每日需要梳毛，喜欢安静环境',
        contactInfo: '139****9999'
      },
      'ORD20240110003': {
        orderId: 'ORD20240110003',
        ownerName: '张先生',
        ownerPhone: '136****6666',
        petName: '小泰迪',
        petBreed: '泰迪犬',
        petAge: '5岁',
        serviceType: '临时照看',
        startTime: '2024-01-10 14:00',
        endTime: '2024-01-10 18:00',
        status: '已完成',
        specialRequests: '需要定时喂食，不要让它爬高',
        contactInfo: '136****6666'
      },
      'ORD20240108004': {
        orderId: 'ORD20240108004',
        ownerName: '刘女士',
        ownerPhone: '137****7777',
        petName: '小柯基',
        petBreed: '柯基犬',
        petAge: '2岁',
        serviceType: '小时陪遛',
        startTime: '2024-01-08 10:00',
        endTime: '2024-01-08 12:00',
        status: '已取消',
        specialRequests: '需要牵绳，不要和其他狗打闹',
        contactInfo: '137****7777'
      }
    };

    const order = orderDetails[orderId];
    if (order) {
      setSelectedOrderDetail(order);
      setShowOrderDetailPanel(true);
    }
  };

  // 关闭订单详情
  const hideOrderDetailPanel = () => {
    setShowOrderDetailPanel(false);
    setSelectedOrderDetail(null);
  };

  // 接单
  const handleAcceptOrder = (orderId: string) => {
    showConfirmDialog('确定要接此订单吗？', () => {
      console.log('接单:', orderId);
      alert('接单成功！');
    });
  };

  // 拒单
  const handleRejectOrder = (orderId: string) => {
    showConfirmDialog('确定要拒绝此订单吗？', () => {
      console.log('拒单:', orderId);
      alert('订单已拒绝！');
    });
  };

  // 确认完成订单
  const handleConfirmCompletion = (orderId: string) => {
    showConfirmDialog('确定要确认完成此订单吗？', () => {
      console.log('确认完成订单:', orderId);
      alert('订单已确认完成！');
    });
  };

  // 填写日报
  const handleFillDailyReport = (orderId: string) => {
    console.log('打开日报填写页面，订单ID:', orderId);
    alert('日报填写功能开发中...');
  };

  // 查看日报
  const handleViewDailyReport = (orderId: string) => {
    console.log('查看日报，订单ID:', orderId);
    alert('查看日报功能开发中...');
  };

  // 查看评价
  const handleViewEvaluation = (orderId: string) => {
    console.log('查看评价，订单ID:', orderId);
    alert('查看评价功能开发中...');
  };

  // 查看取消原因
  const handleViewCancellationReason = (orderId: string) => {
    console.log('查看取消原因，订单ID:', orderId);
    alert('订单取消原因：用户临时有事取消');
  };

  // AI客服
  const handleAiCustomerService = () => {
    alert('AI客服功能开发中...');
  };

  // 获取状态徽章样式类
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case '待接单': return styles.statusBadgePending;
      case '服务中': return styles.statusBadgeOngoing;
      case '已完成': return styles.statusBadgeCompleted;
      case '已取消': return styles.statusBadgeCancelled;
      default: return styles.statusBadgePending;
    }
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img 
                  src="https://s.coze.cn/image/g1PVZBtZ2m8/" 
                  alt="李阿姨头像" 
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
              to="/service-market" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-shopping-bag text-lg"></i>
              <span className="font-medium">服务广场</span>
            </Link>
            <Link 
              to="/order-hall" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-bell text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </Link>
            <a 
              href="#" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-list-alt text-lg"></i>
              <span className="font-medium">订单管理</span>
            </a>
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
                <h2 className="text-2xl font-bold text-accent mb-2">订单管理</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">订单管理</span>
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

          {/* 批量操作区 */}
          <section className="mb-6">
            <div className={`${styles.glassCard} p-4 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-secondary focus:ring-secondary"
                    />
                    <span className="text-text-primary text-sm">全选</span>
                  </label>
                  <button 
                    onClick={handleBatchConfirm}
                    disabled={selectedOrderIds.length === 0}
                    className={`${styles.batchOperationBtn} px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition-colors disabled:opacity-50`}
                  >
                    <i className="fas fa-check mr-1"></i>
                    批量确认
                  </button>
                  <button 
                    onClick={handleBatchAutoSchedule}
                    className={`${styles.batchOperationBtn} px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition-colors`}
                  >
                    <i className="fas fa-calendar mr-1"></i>
                    设置档期
                  </button>
                  <button 
                    onClick={handleConflictDetection}
                    className={`${styles.batchOperationBtn} px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition-colors`}
                  >
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    冲突检测
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`${styles.glassEffect} px-3 py-2 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                  >
                    <option value="">全部状态</option>
                    <option value="pending">待接单</option>
                    <option value="ongoing">服务中</option>
                    <option value="completed">已完成</option>
                    <option value="cancelled">已取消</option>
                  </select>
                  <button 
                    onClick={handleRefreshOrders}
                    className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                  >
                    <i className="fas fa-sync-alt mr-1"></i>
                    刷新
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 订单列表 */}
          <section className="mb-6">
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider w-12">
                        <input 
                          type="checkbox" 
                          checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-gray-300 text-secondary focus:ring-secondary"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">订单号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物主人</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物信息</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务时段</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">订单状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredOrders.map((order) => (
                      <tr 
                        key={order.id}
                        className={`${styles.tableRow} hover:bg-white/10 transition-colors cursor-pointer`}
                        onClick={(e) => {
                          // 如果点击的是按钮或复选框，不触发行点击
                          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input[type="checkbox"]')) {
                            return;
                          }
                          showOrderDetail(order.id);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            checked={selectedOrderIds.includes(order.id)}
                            onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                            className="rounded border-gray-300 text-secondary focus:ring-secondary"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary font-medium">{order.orderId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          <div className="flex items-center space-x-2">
                            <img 
                              src={order.ownerAvatar} 
                              alt={`${order.ownerName}头像`} 
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{order.ownerName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          <div className="flex items-center space-x-2">
                            <img 
                              src={order.petAvatar} 
                              alt={order.petName} 
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{order.petName} · {order.petAge}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{order.serviceType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{order.serviceTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium ${getStatusBadgeClass(order.statusText)} rounded-full`}>
                            {order.statusText}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              showOrderDetail(order.id);
                            }}
                            className="text-secondary hover:text-accent"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          
                          {order.status === 'ongoing' && (
                            <>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFillDailyReport(order.id);
                                }}
                                className="text-accent hover:text-secondary"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleConfirmCompletion(order.id);
                                }}
                                className="text-green-600 hover:text-green-800"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                            </>
                          )}
                          
                          {order.status === 'pending' && (
                            <>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAcceptOrder(order.id);
                                }}
                                className="text-secondary hover:text-accent"
                              >
                                <i className="fas fa-check-circle"></i>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRejectOrder(order.id);
                                }}
                                className="text-red-500 hover:text-red-700"
                              >
                                <i className="fas fa-times-circle"></i>
                              </button>
                            </>
                          )}
                          
                          {order.status === 'completed' && (
                            <>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDailyReport(order.id);
                                }}
                                className="text-accent hover:text-secondary"
                              >
                                <i className="fas fa-file-alt"></i>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewEvaluation(order.id);
                                }}
                                className="text-yellow-500 hover:text-yellow-700"
                              >
                                <i className="fas fa-star"></i>
                              </button>
                            </>
                          )}
                          
                          {order.status === 'cancelled' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewCancellationReason(order.id);
                              }}
                              className="text-text-light hover:text-secondary"
                            >
                              <i className="fas fa-info-circle"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 订单详情面板 */}
          {showOrderDetailPanel && selectedOrderDetail && (
            <section className={`${styles.orderDetailPanel} rounded-xl p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-accent">订单详情</h3>
                <button 
                  onClick={hideOrderDetailPanel}
                  className="text-text-light hover:text-secondary"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-accent">订单信息</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">订单号：</span>
                        <span className="text-text-primary font-medium">{selectedOrderDetail.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">服务类型：</span>
                        <span className="text-text-primary">{selectedOrderDetail.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">服务时段：</span>
                        <span className="text-text-primary">{selectedOrderDetail.startTime} - {selectedOrderDetail.endTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">订单状态：</span>
                        <span className={`px-2 py-1 text-xs font-medium ${getStatusBadgeClass(selectedOrderDetail.status)} rounded-full`}>
                          {selectedOrderDetail.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-accent">宠物主人信息</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">姓名：</span>
                        <span className="text-text-primary">{selectedOrderDetail.ownerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">联系电话：</span>
                        <span className="text-text-primary">{selectedOrderDetail.contactInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-accent">宠物信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">宠物名称：</span>
                      <span className="text-text-primary">{selectedOrderDetail.petName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">品种：</span>
                      <span className="text-text-primary">{selectedOrderDetail.petBreed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">年龄：</span>
                      <span className="text-text-primary">{selectedOrderDetail.petAge}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-accent">特殊需求</h4>
                  <div className={`${styles.glassEffect} p-4 rounded-lg`}>
                    <p className="text-text-primary">{selectedOrderDetail.specialRequests}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* 确认对话框 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${styles.glassCard} rounded-xl p-6 max-w-md w-full mx-4`}>
            <h3 className="text-lg font-semibold text-accent mb-4">确认操作</h3>
            <p className="text-text-secondary mb-6">{confirmMessage}</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={hideConfirmModal}
                className={`px-4 py-2 rounded-lg ${styles.glassEffect} text-text-secondary hover:bg-white/30 transition-colors`}
              >
                取消
              </button>
              <button 
                onClick={handleConfirmOk}
                className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-accent transition-colors"
              >
                确认
              </button>
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

export default ProviderOrderManagePage;

