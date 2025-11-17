

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

type IdentityType = 'owner' | 'provider' | 'admin' | null;

interface IdentityOption {
  id: IdentityType;
  icon: string;
  title: string;
  description: string;
  benefit: string;
}

const IdentitySelectPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityType>(null);

  const identityOptions: IdentityOption[] = [
    {
      id: 'owner',
      icon: 'fas fa-home',
      title: '宠物主人',
      description: '为您的爱宠寻找可靠的托管服务，享受专业、安全的宠物照顾',
      benefit: '快速匹配托管服务'
    },
    {
      id: 'provider',
      icon: 'fas fa-heart',
      title: '托管服务商',
      description: '分享您的爱心和场地，为宠物提供专业照顾，获得额外收入',
      benefit: '获得托管订单'
    },
    {
      id: 'admin',
      icon: 'fas fa-user-shield',
      title: '管理员',
      description: '管理平台运营，审核用户资质，维护平台秩序和安全',
      benefit: '平台管理权限'
    }
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 选择身份';
    return () => { document.title = originalTitle; };
  }, []);

  const handleIdentitySelect = (identity: IdentityType) => {
    setSelectedIdentity(identity);
  };

  const handleConfirmSelection = () => {
    if (!selectedIdentity) return;

    switch(selectedIdentity) {
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
        alert('请选择一个有效的身份');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && selectedIdentity) {
      handleConfirmSelection();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const currentIndex = identityOptions.findIndex(option => option.id === selectedIdentity);
      const nextIndex = e.shiftKey ? 
        (currentIndex - 1 + identityOptions.length) % identityOptions.length : 
        (currentIndex + 1) % identityOptions.length;
      
      setSelectedIdentity(identityOptions[nextIndex].id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdentity]);

  return (
    <div className={styles.pageWrapper}>
      <div className="w-full max-w-4xl">
        {/* Logo区域 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <i className="fas fa-paw text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-accent">宠托帮</h1>
          </div>
          <p className="text-text-secondary text-lg">选择您的身份，开启宠物托管之旅</p>
        </div>

        {/* 身份选择卡片组 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {identityOptions.map((option) => (
            <div
              key={option.id}
              className={`${styles.glassCard} ${selectedIdentity === option.id ? styles.selected : ''} p-6 rounded-xl cursor-pointer`}
              onClick={() => handleIdentitySelect(option.id)}
            >
              <div className={styles.identityIcon}>
                <i className={option.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-accent text-center mb-3">{option.title}</h3>
              <p className="text-text-secondary text-center text-sm leading-relaxed">
                {option.description}
              </p>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-1 text-secondary text-xs">
                  <i className="fas fa-check-circle"></i>
                  <span>{option.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 确认按钮 */}
        <div className="text-center">
          <button
            className={`${styles.btnPrimary} px-12 py-4 rounded-xl text-lg font-semibold disabled:opacity-50`}
            disabled={!selectedIdentity}
            onClick={handleConfirmSelection}
          >
            <i className="fas fa-arrow-right mr-2"></i>
            确认选择
          </button>
          <p className="text-text-light text-sm mt-3">请选择一个身份继续</p>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-8">
          <p className="text-text-light text-sm">
            <i className="fas fa-info-circle mr-1"></i>
            选择后可在个人中心修改身份类型
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentitySelectPage;

