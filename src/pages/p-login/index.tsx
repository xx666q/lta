

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface LoginFormData {
  phone: string; // 现在可以是手机号或账号
  password: string;
  rememberMe: boolean;
}

interface RegisterFormData {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface ForgotPasswordFormData {
  phone: string;
  code: string;
  newPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 页面状态
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  
  // 表单数据
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    phone: '',
    password: '',
    rememberMe: false
  });
  
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordFormData>({
    phone: '',
    code: '',
    newPassword: ''
  });
  
  // 密码可见性状态
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // 验证码倒计时状态
  const [registerCodeCountdown, setRegisterCodeCountdown] = useState(0);
  const [forgotCodeCountdown, setForgotCodeCountdown] = useState(0);
  
  // 错误状态
  const [loginErrors, setLoginErrors] = useState<FormErrors>({});
  const [registerErrors, setRegisterErrors] = useState<FormErrors>({});
  
  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 登录注册';
    return () => {
      document.title = originalTitle;
    };
  }, []);
  
  // 验证码倒计时效果
  useEffect(() => {
    let timer: number | null = null;
    if (registerCodeCountdown > 0) {
      timer = window.setTimeout(() => {
        setRegisterCodeCountdown(registerCodeCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [registerCodeCountdown]);
  
  
  // 表单验证函数
  // 由于现在支持账号登录，这个函数可能不再需要
  // 保留但不再在登录验证中使用
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };
  
  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && password.length <= 20;
  };
  
  // 错误处理函数
  const showError = (formType: 'login' | 'register', field: string, message: string) => {
    if (formType === 'login') {
      setLoginErrors(prev => ({ ...prev, [field]: message }));
    } else {
      setRegisterErrors(prev => ({ ...prev, [field]: message }));
    }
  };
  
  const hideError = (formType: 'login' | 'register', field: string) => {
    if (formType === 'login') {
      setLoginErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      setRegisterErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const clearAllErrors = (formType: 'login' | 'register') => {
    if (formType === 'login') {
      setLoginErrors({});
    } else {
      setRegisterErrors({});
    }
  };
  
  // Tab切换处理
  const handleTabSwitch = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    clearAllErrors('login');
    clearAllErrors('register');
  };
  
  // 登录表单处理
  const handleLoginInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setLoginFormData(prev => ({ ...prev, [field]: value }));
    hideError('login', field);
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAllErrors('login');
    
    let hasError = false;
    
    if (!loginFormData.phone) {
      showError('login', 'phone', '请输入手机号或账号');
      hasError = true;
    } else if (loginFormData.phone.length < 3) {
      showError('login', 'phone', '账号长度不能少于3位');
      hasError = true;
    }
    
    if (!loginFormData.password) {
      showError('login', 'password', '请输入密码');
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    // 模拟登录成功，根据用户类型直接跳转
    console.log('登录成功，根据用户类型直接跳转');
    // 这里应该根据实际登录返回的用户信息决定跳转目标
    // 以下为模拟，实际应根据后端返回的用户角色进行跳转
    const userRole = 'owner'; // 假设从后端获取的用户角色
    switch(userRole) {
      case 'owner':
        navigate('/owner-dashboard');
        break;
      case 'provider':
        navigate('/qualification-audit');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/owner-dashboard'); // 默认跳转到宠物主人页面
    }
  };
  
  // 注册表单处理
  const handleRegisterInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setRegisterFormData(prev => ({ ...prev, [field]: value }));
    hideError('register', field);
  };
  
  const handleSendRegisterCode = () => {
    if (!registerFormData.phone) {
      showError('register', 'phone', '请先输入手机号');
      return;
    }
    if (!validatePhone(registerFormData.phone)) {
      showError('register', 'phone', '请输入正确的手机号');
      return;
    }
    
    console.log('发送验证码到手机号：', registerFormData.phone);
    setRegisterCodeCountdown(60);
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAllErrors('register');
    
    let hasError = false;
    
    if (!registerFormData.phone) {
      showError('register', 'phone', '请输入手机号');
      hasError = true;
    } else if (!validatePhone(registerFormData.phone)) {
      showError('register', 'phone', '请输入正确的手机号');
      hasError = true;
    }
    
    if (!registerFormData.code) {
      showError('register', 'code', '请输入验证码');
      hasError = true;
    } else if (registerFormData.code.length !== 6) {
      showError('register', 'code', '验证码应为6位数字');
      hasError = true;
    }
    
    if (!registerFormData.password) {
      showError('register', 'password', '请设置密码');
      hasError = true;
    } else if (!validatePassword(registerFormData.password)) {
      showError('register', 'password', '密码长度应为6-20位');
      hasError = true;
    }
    
    if (!registerFormData.confirmPassword) {
      showError('register', 'confirmPassword', '请确认密码');
      hasError = true;
    } else if (registerFormData.password !== registerFormData.confirmPassword) {
      showError('register', 'confirmPassword', '两次输入的密码不一致');
      hasError = true;
    }
    
    if (!registerFormData.agreeTerms) {
      showError('register', 'agreeTerms', '请阅读并同意用户协议和隐私政策');
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    // 模拟注册成功，根据用户类型直接跳转
    console.log('注册成功，根据用户类型直接跳转');
    // 新注册用户默认为宠物主人角色
    navigate('/identity-select');
  };
  
  
  // 第三方登录处理
  const handleWechatLogin = () => {
    console.log('需要调用第三方接口实现微信登录');
    // 微信登录成功后应根据用户角色直接跳转
    alert('微信登录功能开发中...');
  };
  
  const handleQQLogin = () => {
    console.log('需要调用第三方接口实现QQ登录');
    // QQ登录成功后应根据用户角色直接跳转
    alert('QQ登录功能开发中...');
  };
  
  const handleAppleLogin = () => {
    console.log('需要调用第三方接口实现Apple ID登录');
    // Apple ID登录成功后应根据用户角色直接跳转
    alert('Apple ID登录功能开发中...');
  };
  
  // 联系客服
  const handleContactCustomerService = () => {
    console.log('需要调用第三方接口实现客服功能');
    alert('客服功能开发中...');
  };
  
  
  return (
    <div className={styles.pageWrapper}>
      {/* 主容器 */}
      <div className="w-full max-w-md">
        {/* Logo区域 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-paw text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-accent">宠托帮</h1>
          <p className="text-text-light mt-2">让宠物托管更安心</p>
        </div>
        
        {/* 登录注册卡片 */}
        <div className={`${styles.glassCard} rounded-2xl p-6`}>
          {/* Tab切换 */}
          <div className="flex mb-6">
            <button 
              onClick={() => handleTabSwitch('login')}
              className={`flex-1 py-3 text-center font-medium rounded-lg transition-all ${
                activeTab === 'login' ? styles.tabActive : styles.tabInactive
              }`}
            >
              登录
            </button>
            <button 
              onClick={() => handleTabSwitch('register')}
              className={`flex-1 py-3 text-center font-medium rounded-lg transition-all ${
                activeTab === 'register' ? styles.tabActive : styles.tabInactive
              }`}
            >
              注册
            </button>
          </div>
          
          {/* 登录表单 */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-phone" className="block text-sm font-medium text-text-primary mb-2">手机号/账号</label>
                <input 
                  type="text" 
                  id="login-phone" 
                  value={loginFormData.phone}
                  onChange={(e) => handleLoginInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                  placeholder="请输入手机号或账号" 
                  maxLength={50}
                />
                {loginErrors.phone && <div className={styles.errorMessage}>{loginErrors.phone}</div>}
              </div>
              
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-text-primary mb-2">密码</label>
                <div className="relative">
                  <input 
                    type={showLoginPassword ? 'text' : 'password'}
                    id="login-password" 
                    value={loginFormData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                    placeholder="请输入密码"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-text-secondary"
                  >
                    <i className={`fas ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {loginErrors.password && <div className={styles.errorMessage}>{loginErrors.password}</div>}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={loginFormData.rememberMe}
                    onChange={(e) => handleLoginInputChange('rememberMe', e.target.checked)}
                    className="sr-only"
                  />
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/20 border border-white/30 rounded"></div>
                    <div className="absolute inset-0 w-5 h-5 flex items-center justify-center">
                      <i className={`fas fa-check text-secondary text-xs ${loginFormData.rememberMe ? '' : 'hidden'}`}></i>
                    </div>
                  </div>
                  <span className="ml-2 text-sm text-text-secondary">记住我</span>
                </label>
                <button 
                  type="button"
                  onClick={() => navigate('/password-recovery')}
                  className="text-sm text-secondary hover:text-accent"
                >
                  忘记密码？
                </button>
              </div>
              
              <button type="submit" className={`w-full py-3 rounded-lg ${styles.btnPrimary} font-medium`}>
                登录
              </button>
            </form>
          )}
          
          {/* 注册表单 */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label htmlFor="register-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                <input 
                  type="tel" 
                  id="register-phone" 
                  value={registerFormData.phone}
                  onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                  placeholder="请输入手机号" 
                  maxLength={11}
                />
                {registerErrors.phone && <div className={styles.errorMessage}>{registerErrors.phone}</div>}
              </div>
              
              <div>
                <label htmlFor="register-code" className="block text-sm font-medium text-text-primary mb-2">验证码</label>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    id="register-code" 
                    value={registerFormData.code}
                    onChange={(e) => handleRegisterInputChange('code', e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                    placeholder="请输入验证码" 
                    maxLength={6}
                  />
                  <button 
                    type="button" 
                    onClick={handleSendRegisterCode}
                    disabled={registerCodeCountdown > 0}
                    className={`px-4 py-3 rounded-lg ${styles.btnSecondary} font-medium whitespace-nowrap`}
                  >
                    {registerCodeCountdown > 0 ? `${registerCodeCountdown}秒后重发` : '发送验证码'}
                  </button>
                </div>
                {registerErrors.code && <div className={styles.errorMessage}>{registerErrors.code}</div>}
              </div>
              
              <div>
                <label htmlFor="register-password" className="block text-sm font-medium text-text-primary mb-2">设置密码</label>
                <div className="relative">
                  <input 
                    type={showRegisterPassword ? 'text' : 'password'}
                    id="register-password" 
                    value={registerFormData.password}
                    onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                    placeholder="请设置密码（6-20位）"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-text-secondary"
                  >
                    <i className={`fas ${showRegisterPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {registerErrors.password && <div className={styles.errorMessage}>{registerErrors.password}</div>}
              </div>
              
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-text-primary mb-2">确认密码</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password" 
                    value={registerFormData.confirmPassword}
                    onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                    placeholder="请再次输入密码"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light hover:text-text-secondary"
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {registerErrors.confirmPassword && <div className={styles.errorMessage}>{registerErrors.confirmPassword}</div>}
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="agree-terms" 
                  checked={registerFormData.agreeTerms}
                  onChange={(e) => handleRegisterInputChange('agreeTerms', e.target.checked)}
                  className="mt-1 sr-only"
                />
                <div className="relative" onClick={() => handleRegisterInputChange('agreeTerms', !registerFormData.agreeTerms)}>
                  <div className="w-5 h-5 bg-white/20 border border-white/30 rounded cursor-pointer"></div>
                  <div className="absolute inset-0 w-5 h-5 flex items-center justify-center">
                    <i className={`fas fa-check text-secondary text-xs ${registerFormData.agreeTerms ? '' : 'hidden'}`}></i>
                  </div>
                </div>
                <span className="ml-2 text-sm text-text-secondary">
                  我已阅读并同意
                  <button className="text-secondary hover:text-accent mx-1">《用户协议》</button>
                  和
                  <button className="text-secondary hover:text-accent mx-1">《隐私政策》</button>
                </span>
              </div>
              {registerErrors.agreeTerms && <div className={styles.errorMessage}>{registerErrors.agreeTerms}</div>}
              
              <button type="submit" className={`w-full py-3 rounded-lg ${styles.btnPrimary} font-medium`}>
                注册
              </button>
            </form>
          )}
          
          {/* 分割线 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="px-4 text-text-light text-sm">或</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>
          
          {/* 第三方登录 */}
          <div className="space-y-3">
            <button 
              onClick={handleWechatLogin}
              className={`w-full py-3 rounded-lg ${styles.socialBtn} flex items-center justify-center space-x-3`}
            >
              <i className="fab fa-weixin text-green-500 text-xl"></i>
              <span className="text-text-primary font-medium">微信登录</span>
            </button>
            <button 
              onClick={handleQQLogin}
              className={`w-full py-3 rounded-lg ${styles.socialBtn} flex items-center justify-center space-x-3`}
            >
              <i className="fab fa-qq text-blue-500 text-xl"></i>
              <span className="text-text-primary font-medium">QQ登录</span>
            </button>
            <button 
              onClick={handleAppleLogin}
              className={`w-full py-3 rounded-lg ${styles.socialBtn} flex items-center justify-center space-x-3`}
            >
              <i className="fab fa-apple text-gray-800 text-xl"></i>
              <span className="text-text-primary font-medium">Apple ID登录</span>
            </button>
          </div>
        </div>
        
        {/* 底部链接 */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-text-light text-sm">
            遇到问题？
            <button 
              onClick={handleContactCustomerService}
              className="text-secondary hover:text-accent"
            >
              联系客服
            </button>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;

