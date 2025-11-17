

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface ServiceDetails {
  providerName: string;
  providerAvatar: string;
  providerRating: string;
  serviceType: string;
  serviceAddress: string;
  pricePerHour: number;
}

interface PetOption {
  id: string;
  name: string;
  image: string;
  age: number;
  breed: string;
  gender: string;
}

const BookingConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [selectedPetId, setSelectedPetId] = useState<string>('pet1');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('wechat');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    providerName: '李阿姨',
    providerAvatar: 'https://s.coze.cn/image/KyWKfPIFxic/',
    providerRating: '4.8',
    serviceType: '日托服务',
    serviceAddress: '北京市朝阳区三里屯SOHO',
    pricePerHour: 50
  });
  const [serviceTime, setServiceTime] = useState({
    startTime: '2024-01-15 09:00',
    endTime: '2024-01-15 18:00',
    durationHours: 9
  });

  const petOptions: PetOption[] = [
    {
      id: 'pet1',
      name: '小金毛',
      image: 'https://s.coze.cn/image/UYFYFkigHvA/',
      age: 7,
      breed: '金毛寻回犬',
      gender: '公'
    },
    {
      id: 'pet2',
      name: '小布偶',
      image: 'https://s.coze.cn/image/MbpAf0vXM7c/',
      age: 3,
      breed: '布偶猫',
      gender: '母'
    },
    {
      id: 'pet3',
      name: '小泰迪',
      image: 'https://s.coze.cn/image/PqMmLOilE5E/',
      age: 5,
      breed: '泰迪犬',
      gender: '公'
    }
  ];

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 确认订单';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 解析URL参数并更新页面内容
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (serviceId) {
      loadServiceDetails(serviceId);
    }
    if (startDate && endDate) {
      // 格式化日期时间，添加默认时间
      const startTime = startDate + ' 09:00';
      const endTime = endDate + ' 18:00';
      updateServiceTime(startTime, endTime);
    }
  }, [searchParams]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const loadServiceDetails = (serviceId: string) => {
    const mockServices: Record<string, ServiceDetails> = {
      service1: {
        providerName: '李阿姨',
        providerAvatar: 'https://s.coze.cn/image/QKDzIteDpkg/',
        providerRating: '4.8',
        serviceType: '日托服务',
        serviceAddress: '北京市朝阳区三里屯SOHO',
        pricePerHour: 50
      },
      service2: {
        providerName: '王小姐',
        providerAvatar: 'https://s.coze.cn/image/bKjiVgBLNsY/',
        providerRating: '4.9',
        serviceType: '周托服务',
        serviceAddress: '北京市海淀区中关村',
        pricePerHour: 45
      }
    };

    const service = mockServices[serviceId] || mockServices.service1;
    setServiceDetails(service);
  };

  const updateServiceTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));

    setServiceTime({
      startTime,
      endTime,
      durationHours
    });
  };

  const calculateCosts = () => {
    const serviceCost = serviceDetails.pricePerHour * serviceTime.durationHours;
    const platformFee = serviceCost * 0.1;
    const deposit = (serviceCost + platformFee) * 0.5;

    return {
      serviceCost,
      platformFee,
      deposit
    };
  };

  const costs = calculateCosts();

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handlePetSelectionChange = (petId: string) => {
    setSelectedPetId(petId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleSpecialRequestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setSpecialRequests(value);
    }
  };

  const handleSubmitOrder = () => {
    setIsSubmittingOrder(true);

    // 模拟支付处理
    setTimeout(() => {
      const orderId = 'ORDER_' + Date.now();
      navigate(`/owner-calendar?newOrder=${orderId}`);
    }, 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 模态弹窗遮罩层 */}
      <div 
        className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center p-4`}
        onClick={handleOverlayClick}
      >
        {/* 模态弹窗内容 */}
        <div className={`${styles.modalContent} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl`}>
          {/* 弹窗头部 */}
          <header className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-accent">确认订单</h2>
            <button 
              onClick={handleCloseModal}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-times text-text-secondary text-lg"></i>
            </button>
          </header>
          
          {/* 弹窗主体 */}
          <main className="p-6 space-y-6">
            {/* 服务信息 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">服务信息</h3>
              <div className={`${styles.glassCard} p-4 rounded-xl`}>
                <div className="flex items-start space-x-4">
                  <img 
                    src={serviceDetails.providerAvatar}
                    alt="服务商头像" 
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-accent">{serviceDetails.providerName}</h4>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <span className="text-sm text-text-secondary">{serviceDetails.providerRating}</span>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-1">{serviceDetails.serviceType}</p>
                    <p className="text-sm text-text-light">{serviceDetails.serviceAddress}</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 宠物选择 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">选择宠物</h3>
              <div className="space-y-3">
                {petOptions.map((pet) => (
                  <label 
                    key={pet.id}
                    className={`flex items-center space-x-3 p-3 border-2 border-white/30 rounded-lg cursor-pointer ${styles.paymentOption} ${
                      selectedPetId === pet.id ? styles.paymentOptionSelected : ''
                    }`}
                    onClick={() => handlePetSelectionChange(pet.id)}
                  >
                    <input 
                      type="radio" 
                      name="pet" 
                      value={pet.id} 
                      className="sr-only"
                      checked={selectedPetId === pet.id}
                      onChange={() => handlePetSelectionChange(pet.id)}
                    />
                    <img 
                      src={pet.image}
                      alt={pet.name} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-accent">{pet.name}</p>
                      <p className="text-sm text-text-light">{pet.age}岁 · {pet.breed} · {pet.gender}</p>
                    </div>
                    <i 
                      className={`fas fa-check text-secondary text-lg transition-opacity ${
                        selectedPetId === pet.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></i>
                  </label>
                ))}
              </div>
            </section>
            
            {/* 服务时段 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">服务时段</h3>
              <div className={`${styles.glassCard} p-4 rounded-xl`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-light mb-1">开始时间</p>
                    <p className="font-medium text-accent">{serviceTime.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-light mb-1">结束时间</p>
                    <p className="font-medium text-accent">{serviceTime.endTime}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-sm text-text-light">
                    服务时长：<span className="font-medium text-accent">{serviceTime.durationHours}小时</span>
                  </p>
                </div>
              </div>
            </section>
            
            {/* 特殊需求 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">特殊需求</h3>
              <textarea 
                value={specialRequests}
                onChange={handleSpecialRequestsChange}
                placeholder="请描述您的特殊需求，如宠物的饮食习惯、健康状况、行为特点等..."
                className={`w-full p-4 border-2 border-white/30 rounded-xl ${styles.formInput} resize-none`}
                rows={4}
                maxLength={500}
              />
              <p className={`text-xs text-right ${specialRequests.length > 450 ? 'text-secondary' : 'text-text-light'}`}>
                {specialRequests.length}/500字
              </p>
            </section>
            
            {/* 费用明细 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">费用明细</h3>
              <div className={`${styles.glassCard} p-4 rounded-xl`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">
                      服务费用（{serviceTime.durationHours}小时 × ¥{serviceDetails.pricePerHour}/小时）
                    </span>
                    <span className="font-medium text-accent">¥{costs.serviceCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">平台服务费</span>
                    <span className="font-medium text-accent">¥{costs.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-accent">应付定金（总费用的50%）</span>
                      <span className="text-xl font-bold text-secondary">¥{costs.deposit.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-text-light mt-1">尾款将在服务完成后支付</p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* 支付方式 */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-accent">支付方式</h3>
              <div className="space-y-3">
                <label 
                  className={`flex items-center space-x-3 p-4 border-2 border-white/30 rounded-lg cursor-pointer ${styles.paymentOption} ${
                    selectedPaymentMethod === 'wechat' ? styles.paymentOptionSelected : ''
                  }`}
                  onClick={() => handlePaymentMethodChange('wechat')}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value="wechat" 
                    className="sr-only"
                    checked={selectedPaymentMethod === 'wechat'}
                    onChange={() => handlePaymentMethodChange('wechat')}
                  />
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <i className="fab fa-weixin text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-accent">微信支付</p>
                    <p className="text-sm text-text-light">安全便捷的移动支付</p>
                  </div>
                  <i 
                    className={`fas fa-check text-secondary text-lg ${
                      selectedPaymentMethod === 'wechat' ? 'opacity-100' : 'opacity-0'
                    } transition-opacity`}
                  ></i>
                </label>
                
                <label 
                  className={`flex items-center space-x-3 p-4 border-2 border-white/30 rounded-lg cursor-pointer ${styles.paymentOption} ${
                    selectedPaymentMethod === 'alipay' ? styles.paymentOptionSelected : ''
                  }`}
                  onClick={() => handlePaymentMethodChange('alipay')}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value="alipay" 
                    className="sr-only"
                    checked={selectedPaymentMethod === 'alipay'}
                    onChange={() => handlePaymentMethodChange('alipay')}
                  />
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fab fa-alipay text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-accent">支付宝</p>
                    <p className="text-sm text-text-light">支付宝安全支付</p>
                  </div>
                  <i 
                    className={`fas fa-check text-secondary text-lg ${
                      selectedPaymentMethod === 'alipay' ? 'opacity-100' : 'opacity-0'
                    } transition-opacity`}
                  ></i>
                </label>
              </div>
            </section>
          </main>
          
          {/* 弹窗底部 */}
          <footer className="p-6 border-t border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-text-light">应付定金</p>
                <p className="text-xl font-bold text-secondary">¥{costs.deposit.toFixed(2)}</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-6 py-3 border-2 border-white/30 rounded-lg text-text-secondary hover:bg-white/10 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSubmitOrder}
                  disabled={isSubmittingOrder}
                  className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-accent transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmittingOrder ? '支付处理中...' : '提交订单并支付'}
                </button>
              </div>
            </div>
            <p className="text-xs text-text-light text-center">
              提交订单即表示您同意{' '}
              <a href="#" className="text-secondary hover:underline">服务协议</a>{' '}
              和{' '}
              <a href="#" className="text-secondary hover:underline">隐私政策</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmPage;

