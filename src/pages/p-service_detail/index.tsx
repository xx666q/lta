

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface ServiceData {
  title: string;
  provider: string;
  rating: number;
  serviceType: string;
  price: number;
  petsAllowed: string;
  address: string;
  pickupAvailable: boolean;
  description: string;
  images: string[];
}

const ServiceDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 轮播图状态
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // 收藏状态
  const [isFavorited, setIsFavorited] = useState(false);
  
  // 日历选择状态
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  
  // 服务数据状态
  const [serviceData, setServiceData] = useState<ServiceData>({
    title: '李阿姨的温馨日托服务',
    provider: '李阿姨',
    rating: 4.9,
    serviceType: '日托服务',
    price: 80,
    petsAllowed: '猫、狗（中小型）',
    address: '距离您1.2km',
    pickupAvailable: true,
    description: '提供专业的宠物日托服务，包括定时喂食、遛弯、玩耍陪伴、基本护理等。我有5年的宠物护理经验，特别擅长照顾中小型犬和猫咪。',
    images: [
      'https://s.coze.cn/image/dBf-g7G8mkc/',
      'https://s.coze.cn/image/tKgWjCemCqU/',
      'https://s.coze.cn/image/jkmfA1sguP0/'
    ]
  });

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 服务详情';
    return () => { document.title = originalTitle; };
  }, []);

  // 根据URL参数加载服务详情
  useEffect(() => {
    const serviceId = searchParams.get('id');
    
    const mockServices: Record<string, ServiceData> = {
      'service1': {
        title: '李阿姨的温馨日托服务',
        provider: '李阿姨',
        rating: 4.9,
        serviceType: '日托服务',
        price: 80,
        petsAllowed: '猫、狗（中小型）',
        address: '距离您1.2km',
        pickupAvailable: true,
        description: '提供专业的宠物日托服务，包括定时喂食、遛弯、玩耍陪伴、基本护理等。我有5年的宠物护理经验，特别擅长照顾中小型犬和猫咪。',
        images: [
          'https://s.coze.cn/image/FtYqqpkGMYs/',
          'https://s.coze.cn/image/qecGguxz9do/',
          'https://s.coze.cn/image/HxviQTFYO9M/'
        ]
      },
      'service2': {
        title: '王小姐的专业周托服务',
        provider: '王小姐',
        rating: 4.8,
        serviceType: '周托服务',
        price: 450,
        petsAllowed: '猫、狗',
        address: '距离您2.1km',
        pickupAvailable: false,
        description: '专业的宠物周托服务，拥有专业的宠物护理知识和丰富的经验。环境干净整洁，为宠物提供舒适的生活空间。',
        images: [
          'https://s.coze.cn/image/HLicy7510iw/',
          'https://s.coze.cn/image/zHnWxs7ZV2w/',
          'https://s.coze.cn/image/JHgSqP0XtAU/'
        ]
      }
    };

    if (serviceId && mockServices[serviceId]) {
      setServiceData(mockServices[serviceId]);
    }
  }, [searchParams]);

  // 轮播图控制函数
  const handleCarouselNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % serviceData.images.length);
  };

  const handleCarouselPrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + serviceData.images.length) % serviceData.images.length);
  };

  // 收藏功能
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  // 日历日期点击处理
  const handleCalendarDayClick = (date: string) => {
    if (!selectedStartDate) {
      // 选择开始日期
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (!selectedEndDate && date > selectedStartDate) {
      // 选择结束日期
      setSelectedEndDate(date);
    } else {
      // 重新选择
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 计算总费用
  const calculateTotalPrice = (): number => {
    if (!selectedStartDate) return 0;
    
    if (!selectedEndDate) {
      // 只选择了一天
      return serviceData.price;
    }
    
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * serviceData.price;
  };

  // 立即预约
  const handleBookingConfirm = () => {
    if (!selectedStartDate) {
      alert('请选择预约日期');
      return;
    }
    
    const serviceId = searchParams.get('id') || 'service1';
    const bookingParams = new URLSearchParams({
      serviceId: serviceId,
      startDate: selectedStartDate,
      endDate: selectedEndDate || selectedStartDate,
      totalPrice: calculateTotalPrice().toString()
    });
    
    navigate(`/booking-confirm?${bookingParams.toString()}`);
  };

  // 生成日历日期
  const generateCalendarDays = () => {
    const days = [];
    // 上个月的最后一天
    days.push(
      <div key="prev-month-day" className={`${styles.calendarDay} ${styles.disabled} py-2 rounded-lg text-text-light`}>
        31
      </div>
    );
    
    // 当月日期
    for (let i = 1; i <= 31; i++) {
      const dateStr = `2024-01-${i.toString().padStart(2, '0')}`;
      const isSelectedStart = selectedStartDate === dateStr;
      const isSelectedEnd = selectedEndDate === dateStr;
      const isSelected = isSelectedStart || isSelectedEnd;
      
      days.push(
        <div
          key={dateStr}
          className={`${styles.calendarDay} py-2 rounded-lg text-text-primary ${isSelected ? styles.selected : ''}`}
          onClick={() => handleCalendarDayClick(dateStr)}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  const totalPrice = calculateTotalPrice();
  const isBookingEnabled = selectedStartDate !== null;

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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img
                  src="https://s.coze.cn/image/xYACsS19oyE/"
                  alt="用户头像"
                  className="w-8 h-8 rounded-full"
                />
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
            <Link
              to="/owner-dashboard"
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <Link
              to="/pet-profile"
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-paw text-lg"></i>
              <span className="font-medium">我的宠物</span>
            </Link>
            <Link
              to="/service-discovery"
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-search text-lg"></i>
              <span className="font-medium">寻找服务</span>
            </Link>
            <Link
              to="/owner-calendar"
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-calendar-alt text-lg"></i>
              <span className="font-medium">托管日历</span>
            </Link>
            <Link
              to="/cloud-view"
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-video text-lg"></i>
              <span className="font-medium">云看宠</span>
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
                <h2 className="text-2xl font-bold text-accent mb-2">{serviceData.title}</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span>寻找服务</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">服务详情</span>
                </nav>
              </div>
              <button
                onClick={handleFavoriteToggle}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors ${isFavorited ? 'text-red-500' : ''}`}
              >
                <i className={`${isFavorited ? 'fas' : 'far'} fa-heart mr-2`}></i>
                {isFavorited ? '已收藏' : '收藏'}
              </button>
            </div>
          </header>

          {/* 环境照片轮播 - 占满页面宽度 */}
          <section className={`${styles.glassCard} rounded-xl overflow-hidden mb-6`}>
            <div className="relative">
              <div className="relative h-96">
                {serviceData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.carouselSlide} ${index === currentSlideIndex ? 'active' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`托管环境照片${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {/* 轮播控制按钮 */}
              <button
                onClick={handleCarouselPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={handleCarouselNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              {/* 轮播指示器 */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {serviceData.images.map((_, index) => (
                  <button
                    key={index}
                    className="w-2 h-2 bg-white rounded-full"
                    style={{ opacity: index === currentSlideIndex ? 1 : 0.5 }}
                    onClick={() => setCurrentSlideIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧服务信息 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 服务介绍 */}
              <section className={`${styles.glassCard} p-6 rounded-xl`}>
                <h3 className="text-lg font-semibold text-accent mb-4">服务介绍</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">服务内容</h4>
                    <p className="text-text-secondary">{serviceData.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">托管注意事项</h4>
                    <ul className="text-text-secondary space-y-1">
                      <li>• 请提前告知宠物的饮食习惯和特殊需求</li>
                      <li>• 建议携带宠物的常用用品（如狗粮、猫砂等）</li>
                      <li>• 如宠物有特殊医疗需求，请提供详细说明</li>
                      <li>• 托管期间会定期发送宠物照片和视频</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 服务商介绍 */}
              <section className={`${styles.glassCard} p-6 rounded-xl`}>
                <h3 className="text-lg font-semibold text-accent mb-4">服务商介绍</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://s.coze.cn/image/CHcYgDu-W-s/"
                      alt="李阿姨头像"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-accent text-lg">{serviceData.provider}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                          <span className="text-text-secondary text-sm">{serviceData.rating}分</span>
                        </div>
                        <span className="text-text-light text-sm">已完成120单</span>
                        <span className="text-text-light text-sm">响应时间: 5分钟</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-2">个人简介</h4>
                    <p className="text-text-secondary">
                      退休教师，热爱小动物，有丰富的宠物护理经验。家中环境宽敞，有专门的宠物活动区域。已通过平台实名认证和资质审核，持有宠物护理相关证书。
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-phone-alt text-green-500"></i>
                      <span className="text-text-secondary">联系电话：138****5678</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-map-marker-alt text-red-500"></i>
                      <span className="text-text-secondary">托管地址：北京市朝阳区三里屯SOHO</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-shield-alt text-green-500"></i>
                      <span className="text-text-secondary text-sm">已通过实名认证</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-certificate text-blue-500"></i>
                      <span className="text-text-secondary text-sm">金牌托管师</span>
                    </div>
                  </div>
                  
                  {/* 用户评价 */}
                  <div className="mt-6">
                    <h4 className="font-medium text-text-primary mb-3">用户评价</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <img src="https://s.coze.cn/image/ffpEFGuG-po/" alt="用户头像" className="w-8 h-8 rounded-full" />
                            <span className="font-medium text-text-primary">张先生</span>
                          </div>
                          <div className="flex text-yellow-400 text-sm">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                        <p className="text-text-secondary text-sm">李阿姨非常细心，把我家金毛照顾得很好，还经常发照片和视频，让我很放心。环境也很干净整洁，下次还会选择这里！</p>
                        <p className="text-text-light text-xs mt-2">2023-12-15</p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <img src="https://s.coze.cn/image/diewx_4NQE4/" alt="用户头像" className="w-8 h-8 rounded-full" />
                            <span className="font-medium text-text-primary">王女士</span>
                          </div>
                          <div className="flex text-yellow-400 text-sm">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                          </div>
                        </div>
                        <p className="text-text-secondary text-sm">我家猫咪很挑剔，但李阿姨很有耐心，照顾得很周到。环境安静舒适，猫咪回家后状态很好，推荐给大家！</p>
                        <p className="text-text-light text-xs mt-2">2023-11-28</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 右侧预约区域 */}
            <div className="space-y-6">
              {/* 服务基本信息 */}
              <section className={`${styles.glassCard} p-6 rounded-xl`}>
                <h3 className="text-lg font-semibold text-accent mb-4">服务信息</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">服务类型</span>
                    <span className="text-text-primary font-medium">{serviceData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">价格</span>
                    <span className="text-secondary font-bold text-xl">
                      ¥{serviceData.price}
                      <span className="text-sm font-normal">/天</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">可托管宠物</span>
                    <span className="text-text-primary">{serviceData.petsAllowed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">地址</span>
                    <span className="text-text-primary text-sm">{serviceData.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">接送服务</span>
                    <span className={serviceData.pickupAvailable ? 'text-green-600' : 'text-red-600'}>
                      {serviceData.pickupAvailable ? '✓ 提供接送' : '✗ 不提供接送'}
                    </span>
                  </div>
                </div>
              </section>

              {/* 可预约时段 */}
              <section className={`${styles.glassCard} p-6 rounded-xl`}>
                <h3 className="text-lg font-semibold text-accent mb-4">选择预约时段</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button className="p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <h4 className="font-medium text-text-primary">2024年1月</h4>
                    <button className="p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  {/* 日历网格 */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* 星期标题 */}
                    <div className="text-xs font-medium text-text-light py-2">日</div>
                    <div className="text-xs font-medium text-text-light py-2">一</div>
                    <div className="text-xs font-medium text-text-light py-2">二</div>
                    <div className="text-xs font-medium text-text-light py-2">三</div>
                    <div className="text-xs font-medium text-text-light py-2">四</div>
                    <div className="text-xs font-medium text-text-light py-2">五</div>
                    <div className="text-xs font-medium text-text-light py-2">六</div>
                    {/* 日期 */}
                    {generateCalendarDays()}
                  </div>
                  {/* 选中时段显示 */}
                  {selectedStartDate && (
                    <div>
                      {selectedEndDate ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">开始日期:</span>
                            <span className="text-text-primary">{formatDate(selectedStartDate)}</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-text-secondary">结束日期:</span>
                            <span className="text-text-primary">{formatDate(selectedEndDate)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">预约日期:</span>
                          <span className="text-text-primary">{formatDate(selectedStartDate)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm mt-1 font-medium">
                        <span className="text-text-secondary">总费用:</span>
                        <span className="text-secondary">¥{totalPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* 立即预约按钮 */}
              <section>
                <button
                  onClick={handleBookingConfirm}
                  disabled={!isBookingEnabled}
                  className="w-full bg-secondary text-white py-4 rounded-xl font-semibold text-lg hover:bg-accent transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isBookingEnabled ? `立即预约 (¥${totalPrice})` : '选择预约时段后可预约'}
                </button>
                <p className="text-text-light text-sm mt-2 text-center">
                  预约需支付定金¥20，剩余费用服务结束后支付
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* AI客服悬浮按钮 */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40">
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default ServiceDetailPage;

