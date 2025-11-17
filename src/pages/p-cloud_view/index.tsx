

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  alt: string;
  time: string;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  age: number;
  location: string;
  status: string;
  avatar: string;
}

const CloudViewPage: React.FC = () => {
  const [selectedPetId, setSelectedPetId] = useState<string>('1');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [displayedMediaItems, setDisplayedMediaItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const pets: Pet[] = [
    {
      id: '1',
      name: '小金毛',
      type: '金毛犬',
      age: 7,
      location: '李阿姨家',
      status: '服务中',
      avatar: 'https://s.coze.cn/image/XvDiiXutqzs/'
    },
    {
      id: '2',
      name: '小布偶',
      type: '布偶猫',
      age: 3,
      location: '王小姐家',
      status: '待接单',
      avatar: 'https://s.coze.cn/image/1GswltvvcV8/'
    }
  ];

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'photo',
      url: 'https://s.coze.cn/image/RKzuPAEYJVw/',
      thumbnail: 'https://s.coze.cn/image/JGCwLwT58pg/',
      alt: '小金毛在玩耍',
      time: '10分钟前'
    },
    {
      id: '2',
      type: 'photo',
      url: 'https://s.coze.cn/image/V5etyTWKTxs/',
      thumbnail: 'https://s.coze.cn/image/17sgK8U1EMQ/',
      alt: '小金毛在吃饭',
      time: '1小时前'
    },
    {
      id: '3',
      type: 'video',
      url: 'https://s.coze.cn/image/26lwstBIJWU/',
      thumbnail: 'https://s.coze.cn/image/Khw4h9qAGW4/',
      alt: '小金毛在散步',
      time: '2小时前'
    },
    {
      id: '4',
      type: 'photo',
      url: 'https://s.coze.cn/image/oLV_p6RhcyM/',
      thumbnail: 'https://s.coze.cn/image/EnJRuFo-nOk/',
      alt: '小金毛在睡觉',
      time: '3小时前'
    },
    {
      id: '5',
      type: 'photo',
      url: 'https://s.coze.cn/image/V7xXC3h3ss4/',
      thumbnail: 'https://s.coze.cn/image/iq-_I7lZRJM/',
      alt: '小金毛和其他宠物玩耍',
      time: '5小时前'
    },
    {
      id: '6',
      type: 'video',
      url: 'https://s.coze.cn/image/HPeVpikIgEw/',
      thumbnail: 'https://s.coze.cn/image/RTTd2ApDzBg/',
      alt: '小金毛训练',
      time: '昨天'
    }
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 云看宠';
    return () => { document.title = originalTitle; };
  }, []);

  useEffect(() => {
    // 初始化显示前6个媒体项
    setDisplayedMediaItems(mediaItems.slice(0, itemsPerPage));
    setPage(1);
  }, []);

  const handlePetSelect = (petId: string) => {
    setSelectedPetId(petId);
    const selectedPet = pets.find(pet => pet.id === petId);
    console.log(`切换到查看宠物：${selectedPet?.name}`);
    // 这里可以添加实际的数据加载逻辑
  };

  const handleVideoToggle = () => {
    console.log('需要调用第三方接口实现实时视频播放功能');
    // 注释：此功能需要集成监控摄像头API，在原型阶段仅做UI展示
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleVideoFullscreen = () => {
    console.log('需要调用第三方接口实现视频全屏功能');
    alert('全屏功能开发中...');
  };

  const handleRefresh = () => {
    console.log('刷新云看宠数据');
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      alert('数据已刷新');
    }, 1000);
  };

  const handleFilterChange = (filterType: string) => {
    setActiveFilter(filterType);
  };

  const handleMediaItemClick = (item: MediaItem) => {
    if (item.type === 'photo') {
      setModalImageUrl(item.url);
      setShowPhotoModal(true);
    } else if (item.type === 'video') {
      console.log('需要调用第三方接口实现视频播放功能');
      alert('视频播放功能开发中...');
    }
  };

  const handleCloseModal = () => {
    setShowPhotoModal(false);
    setModalImageUrl('');
  };

  const handleLoadMore = () => {
    console.log('加载更多媒体内容');
    setIsLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = mediaItems.slice(startIndex, endIndex);
      
      if (newItems.length > 0) {
        setDisplayedMediaItems(prev => [...prev, ...newItems]);
        setPage(nextPage);
      }
      
      setIsLoadingMore(false);
      
      if (newItems.length === 0) {
        alert('没有更多内容了');
      }
    }, 1000);
  };

  const handleAiChat = () => {
    console.log('打开AI客服');
    alert('AI客服功能开发中...');
  };

  const filteredMediaItems = displayedMediaItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const selectedPet = pets.find(pet => pet.id === selectedPetId);

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
                  src="https://s.coze.cn/image/09Qa-PfaMuM/" 
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
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
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
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
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
                <h2 className="text-2xl font-bold text-accent mb-2">云看宠</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">云看宠</span>
                </nav>
              </div>
              <button 
                onClick={handleRefresh}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className={`fas fa-sync-alt mr-2 ${isRefreshing ? 'fa-spin' : ''}`}></i>
                刷新
              </button>
            </div>
          </header>

          {/* 宠物选择器 */}
          <section className="mb-6">
            <h3 className="text-lg font-semibold text-accent mb-4">选择宠物</h3>
            <div className="flex space-x-4">
              {pets.map((pet) => (
                <div 
                  key={pet.id}
                  onClick={() => handlePetSelect(pet.id)}
                  className={`${styles.petSelector} ${selectedPetId === pet.id ? 'active' : ''} flex items-center space-x-3 p-4 rounded-xl cursor-pointer`}
                >
                  <img 
                    src={pet.avatar} 
                    alt={pet.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-accent">{pet.name}</h4>
                    <p className="text-text-light text-sm">{pet.type} · {pet.age}岁</p>
                    <p className={`text-xs ${pet.status === '服务中' ? 'text-secondary' : 'text-text-light'}`}>
                      {pet.location} · {pet.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 实时视频流 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">实时视频</h3>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className={styles.videoContainer}>
                <div 
                  onClick={handleVideoToggle}
                  className={styles.videoPlayer}
                >
                  <div className="text-center">
                    <i className={`fas ${isVideoPlaying ? 'fa-pause-circle' : 'fa-play-circle'} text-6xl mb-4`}></i>
                    <p className="text-lg">{isVideoPlaying ? '点击暂停实时视频' : '点击播放实时视频'}</p>
                    <p className="text-sm opacity-75">{selectedPet?.location}的监控画面</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
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
                <div className="flex space-x-2">
                  <button 
                    onClick={handleVideoToggle}
                    className={`${styles.glassEffect} px-3 py-1 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                  >
                    <i className="fas fa-play mr-1"></i>播放
                  </button>
                  <button 
                    onClick={handleVideoFullscreen}
                    className={`${styles.glassEffect} px-3 py-1 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                  >
                    <i className="fas fa-expand mr-1"></i>全屏
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 照片/短视频列表 */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">最新动态</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleFilterChange('all')}
                  className={`${styles.glassEffect} px-3 py-1 rounded-lg ${activeFilter === 'all' ? 'text-secondary bg-secondary/20' : 'text-text-primary hover:bg-white/30 transition-colors'}`}
                >
                  全部
                </button>
                <button 
                  onClick={() => handleFilterChange('photo')}
                  className={`${styles.glassEffect} px-3 py-1 rounded-lg ${activeFilter === 'photo' ? 'text-secondary bg-secondary/20' : 'text-text-primary hover:bg-white/30 transition-colors'}`}
                >
                  照片
                </button>
                <button 
                  onClick={() => handleFilterChange('video')}
                  className={`${styles.glassEffect} px-3 py-1 rounded-lg ${activeFilter === 'video' ? 'text-secondary bg-secondary/20' : 'text-text-primary hover:bg-white/30 transition-colors'}`}
                >
                  视频
                </button>
              </div>
            </div>
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className={styles.photoGrid}>
                {filteredMediaItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleMediaItemClick(item)}
                    className={styles.photoItem}
                  >
                    <img 
                      src={item.thumbnail} 
                      alt={item.alt}
                      loading="lazy"
                    />
                    {item.type === 'video' && (
                      <div className={styles.videoOverlay}>
                        <i className="fas fa-play-circle text-white text-4xl"></i>
                      </div>
                    )}
                    <div className={styles.mediaInfo}>
                      <i className={`fas ${item.type === 'photo' ? 'fa-camera' : 'fa-video'} mr-1`}></i>
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 加载更多 */}
              <div className="text-center mt-6">
                {displayedMediaItems.length < mediaItems.length ? (
                  <button 
                    onClick={handleLoadMore}
                    className={`${styles.glassEffect} px-6 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
                  >
                    <i className={`fas fa-chevron-down mr-2 ${isLoadingMore ? 'fa-spin' : ''}`}></i>
                    加载更多
                  </button>
                ) : (
                  <p className="text-text-light text-sm">已显示全部内容</p>
                )}
              </div>
            </div>
          </section>

          {/* 托管状态信息 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">托管状态</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">托管开始时间</p>
                    <p className="text-xl font-bold text-accent">2024-01-15</p>
                    <p className="text-text-secondary">09:00</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-clock text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">预计结束时间</p>
                    <p className="text-xl font-bold text-accent">2024-01-17</p>
                    <p className="text-text-secondary">18:00</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-check text-accent text-xl"></i>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-light text-sm mb-1">托管师</p>
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://s.coze.cn/image/0Z7uQlwFp-4/" 
                        alt="李阿姨" 
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-semibold text-accent">李阿姨</span>
                    </div>
                    <p className="text-text-secondary text-sm">评分 4.9</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user text-secondary text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 图片查看模态框 */}
      {showPhotoModal && (
        <div 
          className={styles.modalOverlay}
          onClick={handleCloseModal}
        >
          <div className={styles.modalContent}>
            <img 
              src={modalImageUrl} 
              alt="大图查看"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default CloudViewPage;

