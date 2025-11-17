import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ForgotPasswordFormData {
  phone: string;
  code: string;
  newPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

const PasswordRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 表单数据
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordFormData>({
    phone: '',
    code: '',
    newPassword: ''
  });
  
  // 验证码倒计时状态
  const [forgotCodeCountdown, setForgotCodeCountdown] = useState(0);
  
  // 错误状态
  const [errors, setErrors] = useState<FormErrors>({});
  
  // 成功消息状态
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 找回密码';
    return () => {
      document.title = originalTitle;
    };
  }, []);
  
  // 验证码倒计时效果
  useEffect(() => {
    let timer: number | null = null;
    if (forgotCodeCountdown > 0) {
      timer = window.setTimeout(() => {
        setForgotCodeCountdown(forgotCodeCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [forgotCodeCountdown]);
  
  // 表单验证函数
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };
  
  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && password.length <= 20;
  };
  
  // 错误处理函数
  const showError = (field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };
  
  const hideError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };
  
  const clearAllErrors = () => {
    setErrors({});
  };
  
  // 表单输入处理
  const handleInputChange = (field: keyof ForgotPasswordFormData, value: string) => {
    setForgotPasswordFormData(prev => ({ ...prev, [field]: value }));
    hideError(field);
  };
  
  // 发送验证码
  const handleSendForgotCode = () => {
    clearAllErrors();
    
    if (!forgotPasswordFormData.phone) {
      showError('phone', '请先输入手机号');
      return;
    }
    
    if (!validatePhone(forgotPasswordFormData.phone)) {
      showError('phone', '请输入正确的手机号');
      return;
    }
    
    console.log('发送找回密码验证码到手机号：', forgotPasswordFormData.phone);
    setForgotCodeCountdown(60);
  };
  
  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAllErrors();
    
    const { phone, code, newPassword } = forgotPasswordFormData;
    let hasError = false;
    
    if (!phone) {
      showError('phone', '请输入手机号');
      hasError = true;
    } else if (!validatePhone(phone)) {
      showError('phone', '请输入正确的手机号');
      hasError = true;
    }
    
    if (!code) {
      showError('code', '请输入验证码');
      hasError = true;
    } else if (code.length !== 6) {
      showError('code', '验证码应为6位数字');
      hasError = true;
    }
    
    if (!newPassword) {
      showError('newPassword', '请输入新密码');
      hasError = true;
    } else if (!validatePassword(newPassword)) {
      showError('newPassword', '密码长度应为6-20位');
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    // 模拟密码重置成功
    console.log('密码重置成功');
    setShowSuccessMessage(true);
    
    // 3秒后跳转到登录页面
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };
  
  // 返回登录页面
  const handleBackToLogin = () => {
    navigate('/login');
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
        
        {/* 找回密码卡片 */}
        <div className={`${styles.glassCard} rounded-2xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-accent">找回密码</h2>
            <button 
              onClick={handleBackToLogin}
              className="text-text-light hover:text-text-secondary"
              data-testid="back-button"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
          
          {showSuccessMessage ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">密码重置成功</h3>
              <p className="text-text-secondary mb-6">即将跳转到登录页面...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="forgot-phone" className="block text-sm font-medium text-text-primary mb-2">手机号</label>
                <input 
                  type="tel" 
                  id="forgot-phone" 
                  value={forgotPasswordFormData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                  placeholder="请输入手机号" 
                  maxLength={11}
                  data-testid="phone-input"
                />
                {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
              </div>
              
              <div>
                <label htmlFor="forgot-code" className="block text-sm font-medium text-text-primary mb-2">验证码</label>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    id="forgot-code" 
                    value={forgotPasswordFormData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                    placeholder="请输入验证码" 
                    maxLength={6}
                    data-testid="code-input"
                  />
                  <button 
                    type="button" 
                    onClick={handleSendForgotCode}
                    disabled={forgotCodeCountdown > 0}
                    className={`px-4 py-3 rounded-lg ${styles.btnSecondary} font-medium whitespace-nowrap`}
                    data-testid="send-code-button"
                  >
                    {forgotCodeCountdown > 0 ? `${forgotCodeCountdown}秒后重发` : '发送验证码'}
                  </button>
                </div>
                {errors.code && <div className={styles.errorMessage}>{errors.code}</div>}
              </div>
              
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-text-primary mb-2">新密码</label>
                <input 
                  type="password" 
                  id="new-password" 
                  value={forgotPasswordFormData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                  placeholder="请输入新密码（6-20位）"
                  data-testid="new-password-input"
                />
                {errors.newPassword && <div className={styles.errorMessage}>{errors.newPassword}</div>}
              </div>
              
              <button 
                type="submit" 
                className={`w-full py-3 rounded-lg ${styles.btnPrimary} font-medium`}
                data-testid="submit-button"
              >
                确认重置
              </button>
            </form>
          )}
        </div>
        
        {/* 底部链接 */}
        <div className="text-center mt-6">
          <button 
            onClick={handleBackToLogin}
            className="text-secondary hover:text-accent text-sm"
            data-testid="back-to-login-link"
          >
            返回登录
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
