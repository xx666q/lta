

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ServiceData {
  id: string;
  name: string;
  type: string;
  price: string;
  maxPets: string;
  address: string;
  petTypes: string[];
  notes: string;
  status: 'online' | 'offline';
}

interface FormData {
  serviceName: string;
  serviceType: string;
  servicePrice: string;
  maxPets: string;
  serviceAddress: string;
  petTypes: string[];
  serviceNotes: string;
}

const ServicePublishPage: React.FC = () => {
  const navigate = useNavigate();
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [currentEditingServiceId, setCurrentEditingServiceId] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [photosPreview, setPhotosPreview] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const photosInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    serviceType: '',
    servicePrice: '',
    maxPets: '3',
    serviceAddress: '',
    petTypes: [],
    serviceNotes: ''
  });

  const [servicesList, setServicesList] = useState<ServiceData[]>([
    {
      id: '1',
      name: '温馨家庭日托',
      type: '日托服务',
      price: '¥80/天',
      maxPets: '3',
      address: '北京市朝阳区三里屯街道工体北路8号',
      petTypes: ['猫', '小型犬'],
      notes: '1. 请提前告知宠物的饮食习惯和特殊需求\n2. 建议携带宠物的常用用品\n3. 我们会定时发送宠物照片和视频',
      status: 'online'
    },
    {
      id: '2',
      name: '专业宠物护理',
      type: '周托服务',
      price: '¥450/周',
      maxPets: '5',
      address: '北京市海淀区中关村大街27号',
      petTypes: ['猫', '狗'],
      notes: '1. 提供专业的宠物护理服务\n2. 包含日常喂食、遛弯、清洁\n3. 有专业的宠物医疗知识',
      status: 'offline'
    },
    {
      id: '3',
      name: '临时宠物照看',
      type: '临时照看',
      price: '¥30/小时',
      maxPets: '2',
      address: '北京市西城区西单北大街120号',
      petTypes: ['小型宠物'],
      notes: '1. 适合临时外出的宠物主人\n2. 提供基本的喂食和照看服务\n3. 可根据需求调整服务内容',
      status: 'online'
    }
  ]);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 服务发布';
    return () => { document.title = originalTitle; };
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePetTypeChange = (petType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      petTypes: checked 
        ? [...prev.petTypes, petType]
        : prev.petTypes.filter(type => type !== petType)
    }));
  };

  const getPriceUnit = (serviceType: string): string => {
    switch(serviceType) {
      case 'daycare': return '¥/天';
      case 'weekcare': return '¥/周';
      case 'hourcare': return '¥/小时';
      case 'tempcare': return '¥/小时';
      default: return '¥/天';
    }
  };

  const getServiceTypeDisplay = (type: string): string => {
    switch(type) {
      case 'daycare': return '日托服务';
      case 'weekcare': return '周托服务';
      case 'hourcare': return '小时陪遛';
      case 'tempcare': return '临时照看';
      default: return type;
    }
  };

  const generateNotes = () => {
    const { serviceType, petTypes } = formData;
    
    if (!serviceType) {
      alert('请先选择服务类型');
      return;
    }

    const notesMap: Record<string, Record<string, string>> = {
      'daycare': {
        '猫': '1. 为猫咪提供安静舒适的环境\n2. 定时喂食和清理猫砂\n3. 每日梳理毛发，预防毛球\n4. 提供适当的玩具和活动空间',
        '小型犬': '1. 每日定时遛狗，保证运动量\n2. 按照主人要求的食谱喂食\n3. 提供干净的饮水和休息环境\n4. 注意观察宠物的健康状况',
        '默认': '1. 提供温馨舒适的托管环境\n2. 定时喂食和清洁\n3. 每日记录宠物状况\n4. 提供适当的活动和休息'
      },
      'weekcare': {
        '默认': '1. 提供专业的长期托管服务\n2. 包含日常护理和健康监测\n3. 定期与主人沟通宠物状况\n4. 提供详细的托管日报'
      },
      'hourcare': {
        '默认': '1. 专业的陪伴和遛狗服务\n2. 保证宠物的安全和健康\n3. 按照约定的路线和时间\n4. 提供服务过程中的照片'
      },
      'tempcare': {
        '默认': '1. 灵活的临时照看服务\n2. 快速响应紧急需求\n3. 提供基本的喂食和护理\n4. 随时保持与主人的沟通'
      }
    };

    let notes = '';
    if (notesMap[serviceType] && petTypes.length > 0) {
      petTypes.forEach(petType => {
        if (notesMap[serviceType][petType as keyof typeof notesMap[typeof serviceType]]) {
          notes += notesMap[serviceType][petType as keyof typeof notesMap[typeof serviceType]] + '\n\n';
        }
      });
      if (!notes) {
        notes = notesMap[serviceType]['默认'];
      }
    } else if (notesMap[serviceType]) {
      notes = notesMap[serviceType]['默认'];
    }

    setFormData(prev => ({ ...prev, serviceNotes: notes }));
  };

  const handleServiceTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
    // 延迟生成注意事项，让表单数据先更新
    setTimeout(() => generateNotes(), 0);
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos: string[] = [];
    Array.from(files).slice(0, 6 - photosPreview.length).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPhotos.push(e.target.result as string);
            if (newPhotos.length === Array.from(files).length) {
              setPhotosPreview(prev => [...prev, ...newPhotos]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    setPhotosPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handlePhotoUpload(e.dataTransfer.files);
  };

  const openServiceModal = (title: string, serviceId: string | null) => {
    setCurrentEditingServiceId(serviceId);
    setModalTitle(title);
    setPhotosPreview([]);
    
    if (!serviceId) {
      setFormData({
        serviceName: '',
        serviceType: '',
        servicePrice: '',
        maxPets: '3',
        serviceAddress: '',
        petTypes: [],
        serviceNotes: ''
      });
    } else {
      loadServiceData(serviceId);
    }
    
    setIsServiceModalOpen(true);
  };

  const loadServiceData = (serviceId: string) => {
    const service = servicesList.find(s => s.id === serviceId);
    if (service) {
      const serviceTypeMap: Record<string, string> = {
        '日托服务': 'daycare',
        '周托服务': 'weekcare',
        '临时照看': 'tempcare'
      };

      setFormData({
        serviceName: service.name,
        serviceType: serviceTypeMap[service.type] || '',
        servicePrice: service.price.replace(/[^\d.]/g, ''),
        maxPets: service.maxPets,
        serviceAddress: service.address,
        petTypes: service.petTypes,
        serviceNotes: service.notes
      });
    }
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setCurrentEditingServiceId(null);
  };

  const saveService = () => {
    const newService: ServiceData = {
      id: currentEditingServiceId || Date.now().toString(),
      name: formData.serviceName,
      type: getServiceTypeDisplay(formData.serviceType),
      price: `${formData.servicePrice}${getPriceUnit(formData.serviceType)}`,
      maxPets: formData.maxPets,
      address: formData.serviceAddress,
      petTypes: formData.petTypes,
      notes: formData.serviceNotes,
      status: 'online'
    };

    setServicesList(prev => {
      if (currentEditingServiceId) {
        return prev.map(service => 
          service.id === currentEditingServiceId ? { ...service, ...newService } : service
        );
      } else {
        return [...prev, newService];
      }
    });

    closeServiceModal();
    alert('服务保存成功！');
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServicesList(prev => 
      prev.map(service =>
        service.id === serviceId 
          ? { ...service, status: service.status === 'online' ? 'offline' : 'online' }
          : service
      )
    );
  };

  const openConfirmModal = (title: string, message: string) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setServiceToDelete(null);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServicesList(prev => prev.filter(service => service.id !== serviceToDelete));
      closeConfirmModal();
      alert('服务删除成功！');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveService();
  };

  const handleAiChatClick = () => {
    console.log('需要调用第三方接口实现AI客服功能');
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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">2</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img 
                  src="https://s.coze.cn/image/tTfG-9zjESY/" 
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
              <i className="fas fa-store text-lg"></i>
              <span className="font-medium">服务广场</span>
            </Link>
            <Link 
              to="/order-hall" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-bell text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </Link>
            <Link 
              to="/provider-order-manage" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-list-alt text-lg"></i>
              <span className="font-medium">订单管理</span>
            </Link>
            <div className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}>
              <i className="fas fa-plus-circle text-lg"></i>
              <span className="font-medium">服务发布</span>
            </div>
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
                <h2 className="text-2xl font-bold text-accent mb-2">服务发布</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">服务发布</span>
                </nav>
              </div>
              <button 
                onClick={() => openServiceModal('新增服务', null)}
                className={`${styles.glassEffect} px-6 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-plus mr-2"></i>
                新增服务
              </button>
            </div>
          </header>

          {/* 已发布服务列表 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">已发布服务</h3>
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">服务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">价格</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">可托管宠物</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {servicesList.map((service) => (
                      <tr key={service.id} className={`${styles.tableRow} hover:bg-white/10 transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary font-medium">{service.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{service.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{service.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{service.petTypes.join('、')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            service.status === 'online' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {service.status === 'online' ? '已上架' : '已下架'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button 
                            onClick={() => openServiceModal('编辑服务', service.id)}
                            className="text-secondary hover:text-accent"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => toggleServiceStatus(service.id)}
                            className="text-text-light hover:text-secondary"
                          >
                            <i className={`fas ${service.status === 'online' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                          </button>
                          <button 
                            onClick={() => {
                              setServiceToDelete(service.id);
                              openConfirmModal('确认删除', '您确定要删除这个服务吗？此操作不可撤销。');
                            }}
                            className="text-text-light hover:text-red-500"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
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

      {/* 新增/编辑服务模态弹窗 */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className={`${styles.modalOverlay} absolute inset-0`} onClick={closeServiceModal}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.glassCard} w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl`}>
              {/* 弹窗头部 */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <h3 className="text-xl font-semibold text-accent">{modalTitle}</h3>
                <button 
                  onClick={closeServiceModal}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <i className="fas fa-times text-text-light"></i>
                </button>
              </div>
              
              {/* 弹窗内容 */}
              <div className="p-6">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* 基本信息 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-accent">基本信息</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service-name" className="block text-sm font-medium text-text-primary mb-2">服务名称 *</label>
                        <input 
                          type="text" 
                          id="service-name"
                          value={formData.serviceName}
                          onChange={(e) => handleInputChange('serviceName', e.target.value)}
                          className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInput}`}
                          placeholder="请输入服务名称" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="service-type" className="block text-sm font-medium text-text-primary mb-2">服务类型 *</label>
                        <select 
                          id="service-type"
                          value={formData.serviceType}
                          onChange={(e) => handleServiceTypeChange(e.target.value)}
                          className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary ${styles.formInput}`}
                          required
                        >
                          <option value="">请选择服务类型</option>
                          <option value="daycare">日托服务</option>
                          <option value="weekcare">周托服务</option>
                          <option value="hourcare">小时陪遛</option>
                          <option value="tempcare">临时照看</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service-price" className="block text-sm font-medium text-text-primary mb-2">价格 *</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            id="service-price"
                            value={formData.servicePrice}
                            onChange={(e) => handleInputChange('servicePrice', e.target.value)}
                            className={`w-full px-4 py-2 pr-12 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInput}`}
                            placeholder="请输入价格" 
                            min="0" 
                            step="0.01" 
                            required 
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light text-sm">
                            {getPriceUnit(formData.serviceType)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="max-pets" className="block text-sm font-medium text-text-primary mb-2">最大托管数量</label>
                        <input 
                          type="number" 
                          id="max-pets"
                          value={formData.maxPets}
                          onChange={(e) => handleInputChange('maxPets', e.target.value)}
                          className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInput}`}
                          placeholder="请输入最大托管数量" 
                          min="1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="service-address" className="block text-sm font-medium text-text-primary mb-2">服务地址 *</label>
                      <input 
                        type="text" 
                        id="service-address"
                        value={formData.serviceAddress}
                        onChange={(e) => handleInputChange('serviceAddress', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInput}`}
                        placeholder="请输入详细地址" 
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* 可托管宠物类型 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-accent">可托管宠物类型</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['猫', '小型犬', '中型犬', '大型犬', '小型宠物', '鸟类'].map((petType) => (
                        <label key={petType} className={`flex items-center space-x-3 p-4 rounded-lg ${styles.glassEffect} hover:bg-white/20 transition-colors cursor-pointer`}>
                          <input 
                            type="checkbox" 
                            value={petType}
                            checked={formData.petTypes.includes(petType)}
                            onChange={(e) => handlePetTypeChange(petType, e.target.checked)}
                            className="w-4 h-4 text-secondary border-white/30 rounded focus:ring-secondary" 
                          />
                          <span className="text-text-primary">{petType}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* 环境照片上传 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-accent">环境照片</h4>
                    <div 
                      onClick={() => photosInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`${styles.uploadArea} ${isDragOver ? styles.uploadAreaDragover : ''} p-8 rounded-lg text-center cursor-pointer`}
                    >
                      <i className="fas fa-cloud-upload-alt text-4xl text-text-light mb-4"></i>
                      <p className="text-text-primary mb-2">点击或拖拽上传照片</p>
                      <p className="text-text-light text-sm">支持 JPG、PNG 格式，最多上传6张</p>
                      <input 
                        ref={photosInputRef}
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handlePhotoUpload(e.target.files)}
                        className="hidden" 
                      />
                    </div>
                    {photosPreview.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {photosPreview.map((photo, index) => (
                          <div key={index} className="relative">
                            <img src={photo} alt="预览图" className="w-full h-32 object-cover rounded-lg" />
                            <button 
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 托管注意事项 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-accent">托管注意事项</h4>
                    <div className="space-y-2">
                      <label htmlFor="service-notes" className="block text-sm font-medium text-text-primary">
                        AI将根据您的服务类型自动生成注意事项，您可以修改和补充
                      </label>
                      <textarea 
                        id="service-notes"
                        value={formData.serviceNotes}
                        onChange={(e) => handleInputChange('serviceNotes', e.target.value)}
                        rows={6}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInput} resize-none`}
                        placeholder="请输入托管注意事项..."
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={generateNotes}
                      className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <i className="fas fa-magic mr-2"></i>
                      AI生成注意事项
                    </button>
                  </div>
                </form>
              </div>
              
              {/* 弹窗底部 */}
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-white/20">
                <button 
                  onClick={closeServiceModal}
                  className="px-6 py-2 border border-white/30 rounded-lg text-text-primary hover:bg-white/20 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={saveService}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                >
                  保存服务
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 确认对话框 */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className={`${styles.modalOverlay} absolute inset-0`} onClick={closeConfirmModal}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.glassCard} w-full max-w-md rounded-xl`}>
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-accent mb-2">{confirmTitle}</h3>
                <p className="text-text-secondary mb-6">{confirmMessage}</p>
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={closeConfirmModal}
                    className="px-6 py-2 border border-white/30 rounded-lg text-text-primary hover:bg-white/20 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    确认删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiChatClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default ServicePublishPage;

