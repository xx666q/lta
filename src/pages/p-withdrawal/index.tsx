

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface WithdrawalRecord {
  id: string;
  withdrawalId: string;
  amount: string;
  applyTime: string;
  arrivalTime: string;
  status: 'completed' | 'pending' | 'rejected';
  statusText: string;
}

const WithdrawalPage: React.FC = () => {
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('');

  const withdrawalRecords: WithdrawalRecord[] = [
    {
      id: 'withdrawal-1',
      withdrawalId: '#WD20240115001',
      amount: '¥2,000.00',
      applyTime: '2024-01-15 14:30',
      arrivalTime: '2024-01-16 10:15',
      status: 'completed',
      statusText: '已完成'
    },
    {
      id: 'withdrawal-2',
      withdrawalId: '#WD20240110002',
      amount: '¥1,500.00',
      applyTime: '2024-01-10 09:45',
      arrivalTime: '2024-01-11 11:20',
      status: 'completed',
      statusText: '已完成'
    },
    {
      id: 'withdrawal-3',
      withdrawalId: '#WD20240105003',
      amount: '¥3,000.00',
      applyTime: '2024-01-05 16:20',
      arrivalTime: '-',
      status: 'pending',
      statusText: '申请中'
    },
    {
      id: 'withdrawal-4',
      withdrawalId: '#WD20231228004',
      amount: '¥1,200.00',
      applyTime: '2023-12-28 13:15',
      arrivalTime: '2023-12-29 09:30',
      status: 'completed',
      statusText: '已完成'
    }
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 收入提现';
    return () => { document.title = originalTitle; };
  }, []);

  const handleApplyWithdrawalClick = () => {
    setIsWithdrawalModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsWithdrawalModalVisible(false);
    setWithdrawalAmount('');
    setSelectedBankAccount('');
  };

  const handleModalOverlayClick = () => {
    handleCloseModal();
  };

  const handleWithdrawalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!withdrawalAmount || !selectedBankAccount) {
      alert('请填写完整的提现信息');
      return;
    }
    
    if (parseFloat(withdrawalAmount) > 2580) {
      alert('提现金额不能超过可提现余额');
      return;
    }
    
    alert(`提现申请已提交，金额：¥${withdrawalAmount}`);
    handleCloseModal();
  };

  const handleExportBillClick = () => {
    console.log('需要调用第三方接口实现账单导出功能');
    alert('账单导出功能开发中...');
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatusFilter(e.target.value);
  };

  const handleViewWithdrawalRecord = (withdrawalId: string) => {
    alert(`查看提现记录详情：${withdrawalId}`);
  };

  const handleAICustomerServiceClick = () => {
    alert('AI客服功能开发中...');
  };

  const handleNotificationClick = () => {
    alert('通知功能开发中...');
  };

  const handleUserMenuClick = () => {
    alert('用户菜单功能开发中...');
  };

  const filteredRecords = selectedStatusFilter 
    ? withdrawalRecords.filter(record => record.status === selectedStatusFilter)
    : withdrawalRecords;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '已完成':
        return 'px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full';
      case '申请中':
        return 'px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full';
      case '已拒绝':
        return 'px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full';
      default:
        return '';
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
                  src="https://s.coze.cn/image/mr8j8orJITc/" 
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
              <i className="fas fa-inbox text-lg"></i>
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
              to="/withdrawal" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-money-bill-wave text-lg"></i>
              <span className="font-medium">收入提现</span>
            </Link>
            <Link 
              to="/growth-system" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-star text-lg"></i>
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
                <h2 className="text-2xl font-bold text-accent mb-2">收入提现</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">收入提现</span>
                </nav>
              </div>
              <button 
                onClick={handleAICustomerServiceClick}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 收入概览区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">收入概览</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">可提现余额</p>
                    <p className="text-3xl font-bold text-secondary">¥2,580.00</p>
                  </div>
                  <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-wallet text-secondary text-2xl"></i>
                  </div>
                </div>
                <button 
                  onClick={handleApplyWithdrawalClick}
                  className="w-full mt-4 bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent transition-colors font-medium"
                >
                  申请提现
                </button>
              </div>
              
              <div className={`${styles.glassCard} ${styles.statsCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">累计收入</p>
                    <p className="text-3xl font-bold text-accent">¥15,680.00</p>
                  </div>
                  <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-accent text-2xl"></i>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-light">本月收入</span>
                    <span className="text-accent font-medium">¥3,200.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 平台服务费小字显示 */}
            <div className="mt-4 text-center text-sm text-text-light">
              <p>平台服务费：<span className="text-accent font-medium">10%</span> | 本月服务费：<span className="text-text-secondary">¥355.56</span></p>
            </div>
          </section>

          {/* 提现记录列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">提现记录</h3>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleExportBillClick}
                  className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                >
                  <i className="fas fa-download mr-2"></i>
                  导出账单
                </button>
                <select 
                  value={selectedStatusFilter}
                  onChange={handleStatusFilterChange}
                  className={`${styles.glassEffect} px-3 py-2 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50`}
                >
                  <option value="">全部状态</option>
                  <option value="pending">申请中</option>
                  <option value="completed">已完成</option>
                  <option value="rejected">已拒绝</option>
                </select>
              </div>
            </div>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">提现单号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">提现金额</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">申请时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">到账时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className={`${styles.tableRow} hover:bg-white/10 transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{record.withdrawalId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary font-medium">{record.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{record.applyTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{record.arrivalTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadgeClass(record.statusText)}>{record.statusText}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {record.status === 'completed' || record.status === 'rejected' ? (
                            <button 
                              onClick={() => handleViewWithdrawalRecord(record.id)}
                              className="text-secondary hover:text-accent"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          ) : (
                            <button className="text-text-light hover:text-secondary">
                              <i className="fas fa-clock"></i>
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
        </main>
      </div>

      {/* 申请提现模态弹窗 */}
      {isWithdrawalModalVisible && (
        <div className="fixed inset-0 z-50">
          <div className={styles.modalOverlay} onClick={handleModalOverlayClick}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.modalContent} w-full max-w-md rounded-xl shadow-2xl`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-accent">申请提现</h3>
                  <button 
                    onClick={handleCloseModal}
                    className="text-text-light hover:text-accent"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleWithdrawalFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="withdrawal-amount" className="block text-sm font-medium text-text-primary mb-2">提现金额</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">¥</span>
                      <input 
                        type="number" 
                        id="withdrawal-amount" 
                        name="amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-white/30 rounded-lg bg-white/50 text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50"
                        placeholder="请输入提现金额" 
                        min="1" 
                        max="2580" 
                        step="0.01" 
                        required 
                      />
                    </div>
                    <p className="text-sm text-text-light mt-1">可提现余额：¥2,580.00</p>
                  </div>
                  
                  <div>
                    <label htmlFor="bank-account" className="block text-sm font-medium text-text-primary mb-2">收款银行卡</label>
                    <select 
                      id="bank-account" 
                      name="bankAccount"
                      value={selectedBankAccount}
                      onChange={(e) => setSelectedBankAccount(e.target.value)}
                      className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary/50" 
                      required
                    >
                      <option value="">请选择银行卡</option>
                      <option value="bank1">中国工商银行 ****1234</option>
                      <option value="bank2">中国建设银行 ****5678</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button 
                      type="button" 
                      onClick={handleCloseModal}
                      className="flex-1 py-3 px-4 border border-white/30 rounded-lg text-text-secondary hover:bg-white/20 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-3 px-4 bg-secondary text-white rounded-lg hover:bg-accent transition-colors font-medium"
                    >
                      确认提现
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAICustomerServiceClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default WithdrawalPage;

