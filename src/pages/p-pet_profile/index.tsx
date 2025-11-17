

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface PetData {
  id: number;
  name: string;
  breed: string;
  birthday: string;
  gender: string;
  photo: string;
  vaccination: string;
  deworming: string;
  allergies: string;
  tags: string[];
}

interface FormData {
  name: string;
  breed: string;
  birthday: string;
  gender: string;
  photo: File | null;
  vaccination: string;
  deworming: string;
  allergies: string;
  tags: string[];
  customTags: string;
}

const PetProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [petsData, setPetsData] = useState<PetData[]>([
    {
      id: 1,
      name: '小金毛',
      breed: '金毛寻回犬',
      birthday: '2017-03-15',
      gender: '公',
      photo: 'https://s.coze.cn/image/oyXvzVaSAV8/',
      vaccination: '狂犬疫苗（2023-12-01）、六联疫苗（2023-11-15）',
      deworming: '体内驱虫（2023-12-10）、体外驱虫（2023-12-10）',
      allergies: '',
      tags: ['温顺', '友善']
    },
    {
      id: 2,
      name: '小布偶',
      breed: '布偶猫',
      birthday: '2021-08-22',
      gender: '母',
      photo: 'https://s.coze.cn/image/TKVWCp3o10E/',
      vaccination: '猫三联疫苗（2023-12-05）、狂犬疫苗（2023-12-05）',
      deworming: '体内驱虫（2023-12-15）、体外驱虫（2023-12-15）',
      allergies: '对某些猫粮过敏',
      tags: ['安静', '独立']
    },
    {
      id: 3,
      name: '小泰迪',
      breed: '泰迪犬',
      birthday: '2019-05-10',
      gender: '公',
      photo: 'https://s.coze.cn/image/DxE4UdRqcok/',
      vaccination: '狂犬疫苗（2023-12-08）、六联疫苗（2023-11-20）',
      deworming: '体内驱虫（2023-12-12）、体外驱虫（2023-12-12）',
      allergies: '',
      tags: ['活泼', '粘人']
    }
  ]);

  const [showPetModal, setShowPetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEditingPetId, setCurrentEditingPetId] = useState<number | null>(null);
  const [petToDeleteId, setPetToDeleteId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState('');
  const [showAIInfo, setShowAIInfo] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [showCloudViewInfo, setShowCloudViewInfo] = useState(false);

  const petPhotoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    breed: '',
    birthday: '',
    gender: '',
    photo: null,
    vaccination: '',
    deworming: '',
    allergies: '',
    tags: [],
    customTags: ''
  });

  const [aiData, setAiData] = useState({
    breed: '',
    size: '',
    furLength: ''
  });

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 我的宠物';
    return () => { document.title = originalTitle; };
  }, []);

  const handleAddPetClick = () => {
    setIsEditing(false);
    setCurrentEditingPetId(null);
    resetForm();
    setShowPetModal(true);
  };

  const handleEditPetClick = (petId: number) => {
    setIsEditing(true);
    setCurrentEditingPetId(petId);
    const pet = petsData.find(p => p.id === petId);
    if (pet) {
      loadPetDataToForm(pet);
    }
    setShowPetModal(true);
  };

  const handleDeletePetClick = (petId: number) => {
    setPetToDeleteId(petId);
    setShowDeleteModal(true);
  };

  const handleClosePetModal = () => {
    setShowPetModal(false);
    resetForm();
    setCurrentEditingPetId(null);
    setShowAIInfo(false);
    setPreviewImageSrc('');
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPetToDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (petToDeleteId) {
      setPetsData(prev => prev.filter(pet => pet.id !== petToDeleteId));
      alert('宠物删除成功！');
    }
    handleCloseDeleteModal();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      breed: '',
      birthday: '',
      gender: '',
      photo: null,
      vaccination: '',
      deworming: '',
      allergies: '',
      tags: [],
      customTags: ''
    });
    setPreviewImageSrc('');
    setShowAIInfo(false);
    if (petPhotoInputRef.current) {
      petPhotoInputRef.current.value = '';
    }
  };

  const loadPetDataToForm = (pet: PetData) => {
    setFormData({
      name: pet.name,
      breed: pet.breed,
      birthday: pet.birthday,
      gender: pet.gender,
      photo: null,
      vaccination: pet.vaccination,
      deworming: pet.deworming,
      allergies: pet.allergies,
      tags: pet.tags,
      customTags: ''
    });
    setPreviewImageSrc(pet.photo);
  };

  const handleFormInputChange = (field: keyof FormData, value: string | string[] | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }));
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImageSrc(e.target.result as string);
        simulateAIIdentification(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewImageSrc('');
    setShowAIInfo(false);
    if (petPhotoInputRef.current) {
      petPhotoInputRef.current.value = '';
    }
    setFormData(prev => ({ ...prev, photo: null }));
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handlePhotoUpload(files[0]);
      if (petPhotoInputRef.current) {
        petPhotoInputRef.current.files = files;
      }
    }
  };

  const simulateAIIdentification = (file: File) => {
    console.log('需要调用第三方AI接口实现宠物品种识别功能');
    
    setTimeout(() => {
      setAiData({
        breed: '金毛寻回犬',
        size: '大型',
        furLength: '长毛'
      });
      setShowAIInfo(true);
    }, 2000);
  };

  const calculateAge = (birthday: string): string => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age + '岁';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentEditingPetId) {
      setPetsData(prev => prev.map(pet => 
        pet.id === currentEditingPetId 
          ? { 
              ...pet, 
              name: formData.name,
              breed: formData.breed,
              birthday: formData.birthday,
              gender: formData.gender,
              vaccination: formData.vaccination,
              deworming: formData.deworming,
              allergies: formData.allergies,
              tags: formData.tags
            }
          : pet
      ));
      alert('宠物信息更新成功！');
    } else {
      const newPet: PetData = {
        id: Math.max(...petsData.map(p => p.id), 0) + 1,
        name: formData.name,
        breed: formData.breed,
        birthday: formData.birthday,
        gender: formData.gender,
        photo: previewImageSrc || 'https://s.coze.cn/image/K7yuc5NM8jg/',
        vaccination: formData.vaccination,
        deworming: formData.deworming,
        allergies: formData.allergies,
        tags: formData.tags
      };
      setPetsData(prev => [...prev, newPet]);
      alert('宠物添加成功！');
    }
    
    handleClosePetModal();
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (showPetModal) handleClosePetModal();
      if (showDeleteModal) handleCloseDeleteModal();
    }
  };

  const handleAiChatClick = () => {
    alert('AI客服功能开发中...');
  };

  const handleCloudViewClick = (petId: number) => {
    setSelectedPetId(petId);
    setShowCloudViewInfo(true);
  };

  const handleCloseCloudView = () => {
    setShowCloudViewInfo(false);
    setSelectedPetId(null);
  };

  const handleNavigateToCloudView = () => {
    navigate('/cloud-view');
  };

  const personalityTags = ['温顺', '活泼', '安静', '友善', '独立', '粘人', '胆小', '聪明'];
  
  // 模拟宠物服务状态数据
  const petServiceStatus = {
    1: { inService: true, hasMedia: true, location: '李阿姨家', startTime: '2024-01-15 09:00', endTime: '2024-01-17 18:00', caretaker: '李阿姨', caretakerRating: 4.9 },
    2: { inService: false, hasMedia: false },
    3: { inService: true, hasMedia: true, location: '王小姐家', startTime: '2024-01-14 10:00', endTime: '2024-01-16 17:00', caretaker: '王小姐', caretakerRating: 4.8 }
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
                <img 
                  src="https://s.coze.cn/image/U21-mp0tGCo/" 
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
              to="/service-discovery" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-search text-lg"></i>
              <span className="font-medium">寻找服务</span>
            </Link>
            <Link 
              to="/pet-profile" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-paw text-lg"></i>
              <span className="font-medium">我的宠物</span>
            </Link>
            <Link 
              to="/owner-calendar" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-calendar-alt text-lg"></i>
              <span className="font-medium">托管日历</span>
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
                <h2 className="text-2xl font-bold text-accent mb-2">我的宠物</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">我的宠物</span>
                </nav>
              </div>
              <button 
                onClick={handleAddPetClick}
                className={`${styles.glassEffect} px-6 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-plus mr-2"></i>
                添加宠物
              </button>
            </div>
          </header>

          {/* 宠物列表 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">头像</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">宠物名称</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">品种</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">年龄</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">性别</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">性格标签</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {petsData.map((pet) => (
                      <tr key={pet.id} className={`${styles.tableRow} hover:bg-white/10 transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={pet.photo} 
                            alt={pet.name} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary font-medium">{pet.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{pet.breed}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{pet.birthday ? calculateAge(pet.birthday) : '未知'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{pet.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex flex-wrap gap-1">
                            {pet.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-secondary/20 text-secondary rounded-full">{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button 
                            onClick={() => handleEditPetClick(pet.id)}
                            className="text-secondary hover:text-accent"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDeletePetClick(pet.id)}
                            className="text-text-light hover:text-red-500"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button 
                            onClick={() => handleCloudViewClick(pet.id)}
                            className="text-secondary hover:text-accent"
                          >
                            <i className="fas fa-video"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 云看宠信息区域 */}
          {showCloudViewInfo && selectedPetId && (
            <section className="mb-8">
              <div className={`${styles.glassCard} rounded-xl overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-accent">
                      <i className="fas fa-video mr-2"></i>
                      云看宠 - {petsData.find(p => p.id === selectedPetId)?.name}
                    </h3>
                    <button 
                      onClick={handleCloseCloudView}
                      className="text-text-light hover:text-accent"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  {petServiceStatus[selectedPetId]?.inService && petServiceStatus[selectedPetId]?.hasMedia ? (
                    <>
                      {/* 实时视频预览 */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent mb-3">实时视频</h4>
                        <div className={`${styles.videoContainer} rounded-lg overflow-hidden`}>
                          <div className={styles.videoPlayer}>
                            <div className="text-center">
                              <i className="fas fa-play-circle text-6xl mb-4"></i>
                              <p className="text-lg">点击播放实时视频</p>
                              <p className="text-sm opacity-75">{petServiceStatus[selectedPetId]?.location}的监控画面</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4">
                            <span className="text-text-light text-sm">
                              <i className="fas fa-circle text-green-500 mr-1"></i>
                              在线
                            </span>
                            <span className="text-text-light text-sm">
                              <i className="fas fa-clock mr-1"></i>
                              最后更新：刚刚
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 托管状态信息 */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-accent mb-3">托管状态</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className={`${styles.glassEffect} p-4 rounded-lg`}>
                            <p className="text-text-light text-sm mb-1">托管开始时间</p>
                            <p className="text-lg font-bold text-accent">{petServiceStatus[selectedPetId]?.startTime}</p>
                          </div>
                          <div className={`${styles.glassEffect} p-4 rounded-lg`}>
                            <p className="text-text-light text-sm mb-1">预计结束时间</p>
                            <p className="text-lg font-bold text-accent">{petServiceStatus[selectedPetId]?.endTime}</p>
                          </div>
                          <div className={`${styles.glassEffect} p-4 rounded-lg`}>
                            <p className="text-text-light text-sm mb-1">托管师</p>
                            <p className="text-lg font-bold text-accent">{petServiceStatus[selectedPetId]?.caretaker}</p>
                            <p className="text-text-secondary text-sm">评分 {petServiceStatus[selectedPetId]?.caretakerRating}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 最新动态预览 */}
                      <div>
                        <h4 className="text-lg font-semibold text-accent mb-3">最新动态</h4>
                        <div className="grid grid-cols-4 gap-3">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className={styles.photoItem}>
                              <img 
                                src={`https://s.coze.cn/image/FfnH-PAO39A/{item === 1 ? 'RKzuPAEYJVw' : item === 2 ? 'V5etyTWKTxs' : item === 3 ? 'oLV_p6RhcyM' : 'V7xXC3h3ss4'}/`} 
                                alt={`${petsData.find(p => p.id === selectedPetId)?.name}的照片`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              {item === 3 && (
                                <div className={styles.videoOverlay}>
                                  <i className="fas fa-play-circle text-white text-2xl"></i>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-text-light/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-video-slash text-4xl text-text-light"></i>
                      </div>
                      <p className="text-text-secondary text-lg">目前没有您的宠物的相关视频或照片噢</p>
                      <p className="text-text-light mt-2">请确认您的宠物是否在服务中，或联系客服了解详情</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* 添加/编辑宠物模态框 */}
      {showPetModal && (
        <div className="fixed inset-0 z-50" onClick={handleModalBackdropClick}>
          <div className={styles.modalBackdrop}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.glassCard} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-accent">
                    {isEditing ? '编辑宠物' : '添加宠物'}
                  </h3>
                  <button onClick={handleClosePetModal} className="text-text-light hover:text-accent">
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="pet-name" className="block text-sm font-medium text-text-primary">宠物名称 *</label>
                      <input 
                        type="text" 
                        id="pet-name" 
                        value={formData.name}
                        onChange={(e) => handleFormInputChange('name', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                        placeholder="请输入宠物名称" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="pet-breed" className="block text-sm font-medium text-text-primary">品种</label>
                      <select 
                        id="pet-breed" 
                        value={formData.breed}
                        onChange={(e) => handleFormInputChange('breed', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary ${styles.formInputFocus}`}
                      >
                        <option value="">请选择品种</option>
                        <option value="金毛寻回犬">金毛寻回犬</option>
                        <option value="布偶猫">布偶猫</option>
                        <option value="泰迪犬">泰迪犬</option>
                        <option value="哈士奇">哈士奇</option>
                        <option value="英短">英短</option>
                        <option value="美短">美短</option>
                        <option value="萨摩耶">萨摩耶</option>
                        <option value="其他">其他</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="pet-birthday" className="block text-sm font-medium text-text-primary">生日</label>
                      <input 
                        type="date" 
                        id="pet-birthday" 
                        value={formData.birthday}
                        onChange={(e) => handleFormInputChange('birthday', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary ${styles.formInputFocus}`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="pet-gender" className="block text-sm font-medium text-text-primary">性别</label>
                      <select 
                        id="pet-gender" 
                        value={formData.gender}
                        onChange={(e) => handleFormInputChange('gender', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary ${styles.formInputFocus}`}
                      >
                        <option value="">请选择性别</option>
                        <option value="公">公</option>
                        <option value="母">母</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* 宠物照片 */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">宠物照片</label>
                    <div 
                      className={`${styles.uploadArea} ${isDragOver ? styles.dragover : ''} rounded-lg p-6 text-center cursor-pointer`}
                      onClick={() => petPhotoInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input 
                        type="file" 
                        ref={petPhotoInputRef}
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                      {!previewImageSrc ? (
                        <div>
                          <i className="fas fa-camera text-3xl text-text-light mb-2"></i>
                          <p className="text-text-light">点击上传或拖拽图片到此处</p>
                          <p className="text-sm text-text-light mt-1">支持 JPG、PNG 格式，最大 5MB</p>
                        </div>
                      ) : (
                        <div>
                          <img 
                            src={previewImageSrc} 
                            alt="宠物照片预览" 
                            className="max-w-full h-48 mx-auto rounded-lg"
                          />
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePhoto();
                            }}
                            className="mt-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            <i className="fas fa-trash mr-1"></i>删除照片
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-text-light">上传正面清晰照片，AI将自动识别品种和体型</p>
                  </div>
                  
                  {/* 健康信息 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-accent">健康信息</h4>
                    
                    <div className="space-y-2">
                      <label htmlFor="vaccination-records" className="block text-sm font-medium text-text-primary">疫苗记录</label>
                      <textarea 
                        id="vaccination-records" 
                        rows={3}
                        value={formData.vaccination}
                        onChange={(e) => handleFormInputChange('vaccination', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus} resize-none`}
                        placeholder="请记录疫苗接种情况，如：狂犬疫苗（2023-12-01）、六联疫苗（2023-11-15）"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="deworming-records" className="block text-sm font-medium text-text-primary">驱虫记录</label>
                      <textarea 
                        id="deworming-records" 
                        rows={3}
                        value={formData.deworming}
                        onChange={(e) => handleFormInputChange('deworming', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus} resize-none`}
                        placeholder="请记录驱虫情况，如：体内驱虫（2023-12-10）、体外驱虫（2023-12-10）"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="allergies" className="block text-sm font-medium text-text-primary">过敏史</label>
                      <textarea 
                        id="allergies" 
                        rows={2}
                        value={formData.allergies}
                        onChange={(e) => handleFormInputChange('allergies', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus} resize-none`}
                        placeholder="如有过敏史请在此说明，如：对鸡肉过敏、对花粉过敏等"
                      />
                    </div>
                  </div>
                  
                  {/* 性格标签 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-accent">性格标签</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {personalityTags.map((tag) => (
                        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            value={tag}
                            checked={formData.tags.includes(tag)}
                            onChange={(e) => handleTagChange(tag, e.target.checked)}
                            className="w-4 h-4 text-secondary bg-transparent border-white/30 rounded focus:ring-secondary"
                          />
                          <span className="text-sm text-text-secondary">{tag}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="custom-tags" className="block text-sm font-medium text-text-primary">自定义标签</label>
                      <input 
                        type="text" 
                        id="custom-tags" 
                        value={formData.customTags}
                        onChange={(e) => handleFormInputChange('customTags', e.target.value)}
                        className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light ${styles.formInputFocus}`}
                        placeholder="请输入自定义标签，用逗号分隔"
                      />
                    </div>
                  </div>
                  
                  {/* AI识别信息（只读） */}
                  {showAIInfo && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-accent">
                        <i className="fas fa-robot mr-2 text-secondary"></i>
                        AI识别信息
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-text-primary">识别品种</label>
                          <input 
                            type="text" 
                            value={aiData.breed}
                            readOnly
                            className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-secondary bg-white/10`}
                            placeholder="AI正在识别中..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-text-primary">体型</label>
                          <input 
                            type="text" 
                            value={aiData.size}
                            readOnly
                            className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-secondary bg-white/10`}
                            placeholder="AI正在识别中..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-text-primary">毛长</label>
                          <input 
                            type="text" 
                            value={aiData.furLength}
                            readOnly
                            className={`w-full px-4 py-2 border border-white/30 rounded-lg ${styles.glassEffect} text-text-secondary bg-white/10`}
                            placeholder="AI正在识别中..."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 操作按钮 */}
                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <button 
                      type="button" 
                      onClick={handleClosePetModal}
                      className="px-6 py-2 border border-white/30 rounded-lg text-text-secondary hover:bg-white/10 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                    >
                      保存
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 删除确认模态框 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50" onClick={handleModalBackdropClick}>
          <div className={styles.modalBackdrop}></div>
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div className={`${styles.glassCard} w-full max-w-md rounded-xl`}>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-accent mb-2">确认删除</h3>
                  <p className="text-text-secondary mb-6">
                    确定要删除宠物 "<span className="font-medium">
                      {petToDeleteId ? petsData.find(p => p.id === petToDeleteId)?.name : ''}
                    </span>" 吗？删除后将无法恢复。
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={handleCloseDeleteModal}
                      className="px-6 py-2 border border-white/30 rounded-lg text-text-secondary hover:bg-white/10 transition-colors"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleConfirmDelete}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      删除
                    </button>
                  </div>
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

export default PetProfilePage;

