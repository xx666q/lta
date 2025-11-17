

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface OrderData {
  orderNumber: string;
  serviceType: string;
  petName: string;
  petAvatar: string;
  providerName: string;
  providerAvatar: string;
  serviceTime: string;
}

interface PhotoData {
  id: number;
  src: string;
  file: File;
}

const ServiceRatingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 状态管理
  // 评分相关状态已移除
  const [commentText, setCommentText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [uploadedPhotos, setUploadedPhotos] = useState<PhotoData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData>({
    orderNumber: '#20240101003',
    serviceType: '临时照看',
    petName: '小泰迪',
    petAvatar: 'https://s.coze.cn/image/rS1xPaYq030/',
    providerName: '张先生',
    providerAvatar: 'https://s.coze.cn/image/DhbxIw4XLh0/',
    serviceTime: '2024-01-10 14:00 - 18:00'
  });

  // Refs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  // 模拟订单数据
  const mockOrders: Record<string, OrderData> = {
    'order1': {
      orderNumber: '#20240101001',
      serviceType: '日托服务',
      petName: '小金毛',
      petAvatar: 'https://s.coze.cn/image/U6wQOiPszLo/',
      providerName: '李阿姨',
      providerAvatar: 'https://s.coze.cn/image/uBF2j4tGNEk/',
      serviceTime: '2024-01-15 09:00 - 18:00'
    },
    'order2': {
      orderNumber: '#20240101002',
      serviceType: '周托服务',
      petName: '小布偶',
      petAvatar: 'https://s.coze.cn/image/uh3_K50L4YQ/',
      providerName: '王小姐',
      providerAvatar: 'https://s.coze.cn/image/UYTlWLM6Gjo/',
      serviceTime: '2024-01-20 09:00 - 2024-01-27 18:00'
    },
    'order3': {
      orderNumber: '#20240101003',
      serviceType: '临时照看',
      petName: '小泰迪',
      petAvatar: 'https://s.coze.cn/image/W_QdljuPKzg/',
      providerName: '张先生',
      providerAvatar: 'https://s.coze.cn/image/NZBk7XOoeQY/',
      serviceTime: '2024-01-10 14:00 - 18:00'
    }
  };

  // 评分文本映射已移除

  const aiTags = ['耐心', '环境好', '按时喂药', '沟通及时', '责任心强', '服务专业', '价格合理', '接送方便'];

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 服务评价';
    return () => { document.title = originalTitle; };
  }, []);

  // 根据URL参数更新订单信息
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId && mockOrders[orderId]) {
      setOrderData(mockOrders[orderId]);
    }
  }, [searchParams]);

  // 星级评分处理函数已移除

  // 标签选择处理
  const handleTagClick = (tag: string) => {
    const newSelectedTags = new Set(selectedTags);
    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  // 照片上传处理
  const handleUploadAreaClick = () => {
    if (uploadedPhotos.length < 4 && photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      if (uploadedPhotos.length >= 4) {
        alert('最多只能上传4张照片');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const photoData: PhotoData = {
            id: Date.now() + Math.random(),
            src: e.target.result as string,
            file: file
          };
          setUploadedPhotos(prev => [...prev, photoData]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 拖拽处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadAreaRef.current) {
      uploadAreaRef.current.classList.add(styles.dragover);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadAreaRef.current) {
      uploadAreaRef.current.classList.remove(styles.dragover);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadAreaRef.current) {
      uploadAreaRef.current.classList.remove(styles.dragover);
    }
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // 删除照片
  const handleRemovePhoto = (photoId: number) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  // 关闭模态框
  const handleCloseModal = () => {
    navigate(-1);
  };

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // ESC键关闭
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

  // 提交评价
  const handleSubmitRating = async () => {
    setIsSubmitting(true);

    // 模拟提交过程
    setTimeout(() => {
      alert('评价提交成功！感谢您的反馈。');
      handleCloseModal();
    }, 1500);
  };

  // 评价内容输入处理
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setCommentText(value);
    }
  };

  // 评分显示逻辑已移除

  return (
    <div className={styles.pageWrapper}>
      {/* 模态弹窗遮罩 */}
      <div 
        className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center p-4`}
        onClick={handleOverlayClick}
      >
        {/* 模态弹窗内容 */}
        <div className={`${styles.modalContent} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl`}>
          {/* 弹窗头部 */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-accent">评价服务</h2>
            <button 
              onClick={handleCloseModal}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-times text-text-secondary text-lg"></i>
            </button>
          </div>
          
          {/* 弹窗主体 */}
          <div className="p-6">
            {/* 订单信息 */}
            <div className={`${styles.glassCard} p-4 rounded-xl mb-6`}>
              <h3 className="font-semibold text-accent mb-3">订单信息</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary">订单号：</span>
                  <span className="text-text-primary font-medium">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">服务类型：</span>
                  <span className="text-text-primary">{orderData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">宠物：</span>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={orderData.petAvatar}
                      alt={orderData.petName} 
                      className="w-6 h-6 rounded-full" 
                      data-category="动物"
                    />
                    <span className="text-text-primary">{orderData.petName}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">服务商：</span>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={orderData.providerAvatar}
                      alt={orderData.providerName} 
                      className="w-6 h-6 rounded-full" 
                      data-category="人物"
                    />
                    <span className="text-text-primary">{orderData.providerName}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">服务时间：</span>
                  <span className="text-text-primary">{orderData.serviceTime}</span>
                </div>
              </div>
            </div>
            
            {/* 星级评分已移除 */}
            
            {/* 评价内容 */}
            <div className="mb-6">
              <label htmlFor="comment-text" className="block text-sm font-medium text-accent mb-3">评价内容</label>
              <textarea 
                id="comment-text"
                value={commentText}
                onChange={handleCommentChange}
                placeholder="请分享您的服务体验，帮助其他宠物主人做出更好的选择..."
                className={`w-full px-4 py-3 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none`}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-text-light mt-2">{commentText.length}/500字</p>
            </div>
            
            {/* 照片上传 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-accent mb-3">上传照片（可选）</label>
              <div 
                ref={uploadAreaRef}
                className={`${styles.uploadArea} p-6 rounded-lg text-center cursor-pointer`}
                onClick={handleUploadAreaClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt text-3xl text-text-light mb-2"></i>
                <p className="text-text-secondary mb-1">点击或拖拽上传照片</p>
                <p className="text-xs text-text-light">支持 JPG、PNG 格式，最多上传4张</p>
                <input 
                  ref={photoInputRef}
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>
              
              {/* 照片预览 */}
              {uploadedPhotos.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {uploadedPhotos.map((photo) => (
                    <div key={photo.id} className={styles.photoPreview}>
                      <img src={photo.src} alt="评价照片" className="w-full h-20 object-cover rounded-lg" />
                      <button 
                        className={styles.removeBtn}
                        onClick={() => handleRemovePhoto(photo.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* AI生成的评价标签 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-accent mb-3">选择标签（可选）</label>
              <div className="flex flex-wrap gap-2">
                {aiTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTags.has(tag)
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-white/20 text-text-secondary hover:bg-secondary/20 hover:text-secondary'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 弹窗底部 */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/20">
            <button 
              onClick={handleCloseModal}
              className={`px-6 py-2 rounded-lg ${styles.glassEffect} text-text-secondary hover:bg-white/30 transition-colors`}
            >
              取消
            </button>
            <button 
              onClick={handleSubmitRating}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg bg-secondary text-white hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  提交中...
                </>
              ) : (
                '提交评价'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRatingPage;

