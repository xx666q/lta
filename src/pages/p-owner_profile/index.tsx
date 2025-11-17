import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface UserProfile {
  nickname: string;
  phone: string;
  address: string;
  identity: string;
  registerTime: string;
  avatar: string;
}

interface NotificationSettings {
  orderNotification: boolean;
  serviceNotification: boolean;
  aiTipsNotification: boolean;
  marketingNotification: boolean;
}

const OwnerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [isAvatarDropdownVisible, setIsAvatarDropdownVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: '张小明',
    phone: '138****8888',
    address: '北京市朝阳区三里屯街道',
    identity: '宠物主人',
    registerTime: '2024-01-15',
    avatar: 'https://s.coze.cn/image/8dN6H9eK1-E/'
  });
  const [editProfileForm, setEditProfileForm] = useState({
    nickname: userProfile.nickname,
    phone: '13812348888',
    address: userProfile.address
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderNotification: true,
    serviceNotification: true,
    aiTipsNotification: true,
    marketingNotification: false
  });

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 宠物主人个人中心';
    return () => { document.title = originalTitle; };
  }, []);

  const handleEditProfile = () => {
    setEditProfileForm({
      nickname: userProfile.nickname,
      phone: '13812348888',
      address: userProfile.address
    });
    setIsEditProfileModalVisible(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      nickname: editProfileForm.nickname,
      address: editProfileForm.address
    });
    setIsEditProfileModalVisible(false);
    alert('资料修改成功！');
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = changePasswordForm;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('请填写完整的密码信息');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('新密码和确认密码不一致');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('新密码长度不能少于6位');
      return;
    }
    
    setIsChangePasswordModalVisible(false);
    setChangePasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('密码修改成功！');
  };

  const handleThirdPartyBind = (platform: string) => {
    console.log(`需要调用第三方接口实现${platform}绑定功能`);
    alert(`${platform}绑定功能开发中...`);
  };

  const handleChangeAvatar = () => {
    console.log('需要调用第三方接口实现头像上传功能');
    alert('头像上传功能开发中...');
  };

  const handleAiService = () => {
    alert('AI客服功能开发中...');
  };

  const handleModalOverlayClick = (e: React.MouseEvent, closeModal: () => void) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditProfileModalVisible(false);
      setIsChangePasswordModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    // 点击页面其他地方关闭下拉菜单
    const handleClickOutside = (event: MouseEvent) => {
      const avatarButton = document.querySelector('[data-testid="avatar-button"]');
      const dropdown = document.querySelector('[data-testid="logout-button"]')?.parentElement;
      
      if (avatarButton && dropdown && 
          !avatarButton.contains(event.target as Node) && 
          !dropdown.contains(event.target as Node)) {
        setIsAvatarDropdownVisible(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
              <button 
                className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}
                onClick={() => setIsAvatarDropdownVisible(!isAvatarDropdownVisible)}
              >
                <img src="https://s.coze.cn/image/P3E_xY-PTGk/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
                <span className="text-text-primary font-medium">张小明</span>
                <i className={`fas fa-chevron-down text-text-light text-sm transition-transform ${isAvatarDropdownVisible ? 'transform rotate-180' : ''}`}></i>
              </button>
              
              {/* 下拉菜单 */}
              {isAvatarDropdownVisible && (
                <div className={`absolute right-0 mt-2 w-48 ${styles.glassCard} rounded-lg shadow-lg z-10`}>
                  <button 
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center space-x-2"
                    onClick={() => {
                      setIsAvatarDropdownVisible(false);
                      navigate('/login');
                    }}
                    data-testid="logout-button"
                  >
                    <i className="fas fa-sign-out-alt text-text-secondary"></i>
                    <span className="text-text-primary">退出登录</span>
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
            <Link to="/owner-calendar" className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}>
              <i className="fas fa-calendar-alt text-lg"></i>
              <span className="font-medium">托管日历</span>
            </Link>
            <Link to="/owner-profile" className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
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
                <h2 className="text-2xl font-bold text-accent mb-2">宠物主人个人中心</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">个人中心</span>
                </nav>
              </div>
              <button 
                onClick={handleAiService}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 个人信息展示区 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="flex items-start space-x-6">
                {/* 头像区域 */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={userProfile.avatar}
                      alt="用户头像" 
                      className="w-24 h-24 rounded-full border-4 border-white/30" 
                    />
                    <button 
                      onClick={handleChangeAvatar}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-accent transition-colors"
                    >
                      <i className="fas fa-camera text-sm"></i>
                    </button>
                  </div>
                </div>
                
                {/* 基本信息 */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-accent mb-1">{userProfile.nickname}</h3>
                      <p className="text-text-secondary">{userProfile.phone}</p>
                    </div>
                    <button 
                      onClick={handleEditProfile}
                      className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                    >
                      <i className="fas fa-edit mr-2"></i>
                      编辑资料
                    </button>
                  </div>
                  
                  {/* 详细信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-map-marker-alt text-secondary w-5"></i>
                      <span className="text-text-secondary">{userProfile.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-user-tag text-secondary w-5"></i>
                      <span className="text-text-secondary">{userProfile.identity}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-calendar text-secondary w-5"></i>
                      <span className="text-text-secondary">{'注册时间：' + userProfile.registerTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 账号安全区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">账号安全</h3>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div 
                onClick={handleChangePassword}
                className={`${styles.settingItem} flex items-center justify-between p-4 border-b border-white/10 cursor-pointer transition-colors`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-lock text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-accent">修改密码</h4>
                    <p className="text-sm text-text-light">定期修改密码，保护账号安全</p>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-text-light"></i>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-link text-secondary"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-accent">第三方账号绑定</h4>
                    <p className="text-sm text-text-light">绑定第三方账号，快速登录</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-13">
                  <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                    <div className="flex items-center space-x-2">
                      <i className="fab fa-weixin text-green-500 text-lg"></i>
                      <span className="text-text-secondary">微信</span>
                    </div>
                    <button 
                      onClick={() => handleThirdPartyBind('微信')}
                      className="text-secondary hover:text-accent text-sm font-medium"
                    >
                      绑定
                    </button>
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                    <div className="flex items-center space-x-2">
                      <i className="fab fa-qq text-blue-500 text-lg"></i>
                      <span className="text-text-secondary">QQ</span>
                    </div>
                    <button 
                      onClick={() => handleThirdPartyBind('QQ')}
                      className="text-secondary hover:text-accent text-sm font-medium"
                    >
                      绑定
                    </button>
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 ${styles.glassEffect} rounded-lg`}>
                    <div className="flex items-center space-x-2">
                      <i className="fab fa-apple text-gray-800 text-lg"></i>
                      <span className="text-text-secondary">Apple ID</span>
                    </div>
                    <button 
                      onClick={() => handleThirdPartyBind('Apple ID')}
                      className="text-secondary hover:text-accent text-sm font-medium"
                    >
                      绑定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 通知设置区 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">通知设置</h3>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              {Object.entries(notificationSettings).map(([key, value], index) => {
                const labels = {
                  orderNotification: { title: '订单通知', desc: '接收订单状态变更通知' },
                  serviceNotification: { title: '服务沟通', desc: '接收服务商消息通知' },
                  aiTipsNotification: { title: 'AI护理建议', desc: '接收宠物护理建议推送' },
                  marketingNotification: { title: '营销活动', desc: '接收优惠活动和新功能通知' }
                };
                
                const iconMap = {
                  orderNotification: 'fas fa-bell',
                  serviceNotification: 'fas fa-comment',
                  aiTipsNotification: 'fas fa-robot',
                  marketingNotification: 'fas fa-gift'
                };

                const currentLabel = labels[key as keyof typeof labels];
                const currentIcon = iconMap[key as keyof typeof iconMap];

                return (
                  <div 
                    key={key}
                    className={`${styles.settingItem} flex items-center justify-between p-4 ${index < Object.keys(notificationSettings).length - 1 ? 'border-b border-white/10' : ''} cursor-pointer transition-colors`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <i className={currentIcon + ' text-secondary'}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-accent">{currentLabel.title}</h4>
                        <p className="text-sm text-text-light">{currentLabel.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={value}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* 编辑资料模态框 */}
      {isEditProfileModalVisible && (
        <div 
          className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center p-4`}
          onClick={(e) => handleModalOverlayClick(e, () => setIsEditProfileModalVisible(false))}
        >
          <div className={`${styles.glassCard} w-full max-w-md rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-accent">编辑资料</h3>
              <button 
                onClick={() => setIsEditProfileModalVisible(false)}
                className="text-text-light hover:text-secondary transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="edit-nickname" className="block text-sm font-medium text-text-primary mb-2">昵称</label>
                <input 
                  type="text" 
                  id="edit-nickname" 
                  name="nickname" 
                  value={editProfileForm.nickname}
                  onChange={(e) => setEditProfileForm(prev => ({ ...prev, nickname: e.target.value }))}
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                />
              </div>
              
              <div>
                <label htmlFor="edit-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                <input 
                  type="tel" 
                  id="edit-phone" 
                  name="phone" 
                  value={editProfileForm.phone}
                  readOnly
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-light bg-white/10 cursor-not-allowed`}
                />
                <p className="text-xs text-text-light mt-1">手机号不可修改</p>
              </div>
              
              <div>
                <label htmlFor="edit-address" className="block text-sm font-medium text-text-primary mb-2">地址</label>
                <input 
                  type="text" 
                  id="edit-address" 
                  name="address" 
                  value={editProfileForm.address}
                  onChange={(e) => setEditProfileForm(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditProfileModalVisible(false)}
                  className="flex-1 px-4 py-2 border border-white/30 rounded-lg text-text-secondary hover:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 修改密码模态框 */}
      {isChangePasswordModalVisible && (
        <div 
          className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center p-4`}
          onClick={(e) => handleModalOverlayClick(e, () => setIsChangePasswordModalVisible(false))}
        >
          <div className={`${styles.glassCard} w-full max-w-md rounded-xl p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-accent">修改密码</h3>
              <button 
                onClick={() => setIsChangePasswordModalVisible(false)}
                className="text-text-light hover:text-secondary transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-text-primary mb-2">当前密码</label>
                <input 
                  type="password" 
                  id="current-password" 
                  name="currentPassword" 
                  placeholder="请输入当前密码"
                  value={changePasswordForm.currentPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                />
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-text-primary mb-2">新密码</label>
                <input 
                  type="password" 
                  id="new-password" 
                  name="newPassword" 
                  placeholder="请输入新密码"
                  value={changePasswordForm.newPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                />
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-text-primary mb-2">确认新密码</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  name="confirmPassword" 
                  placeholder="请再次输入新密码"
                  value={changePasswordForm.confirmPassword}
                  onChange={(e) => setChangePasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsChangePasswordModalVisible(false)}
                  className="flex-1 px-4 py-2 border border-white/30 rounded-lg text-text-secondary hover:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                >
                  修改
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiService}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default OwnerProfilePage;
