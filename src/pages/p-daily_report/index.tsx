

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './styles.module.css';

interface OrderData {
  orderNumber: string;
  petName: string;
  reportDate: string;
}

interface PhotoData {
  id: number;
  file: File;
  url: string;
}

const DailyReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 表单状态
  const [feedingLog, setFeedingLog] = useState('');
  const [toiletLog, setToiletLog] = useState('');
  const [exerciseLog, setExerciseLog] = useState('');
  
  // 照片上传状态
  const [uploadedPhotos, setUploadedPhotos] = useState<PhotoData[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  
  // 订单数据状态
  const [orderData, setOrderData] = useState<OrderData>({
    orderNumber: '#20240101001',
    petName: '小金毛',
    reportDate: '2024-01-15'
  });

  const maxPhotos = 6;

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 填写托管日报';
    return () => { document.title = originalTitle; };
  }, []);

  // 获取URL参数并更新订单信息
  useEffect(() => {
    const orderId = searchParams.get('orderId') || 'order1';
    
    // 模拟订单数据
    const mockOrders: Record<string, OrderData> = {
      'order1': {
        orderNumber: '#20240101001',
        petName: '小金毛',
        reportDate: '2024-01-15'
      },
      'order2': {
        orderNumber: '#20240101002',
        petName: '小布偶',
        reportDate: '2024-01-15'
      },
      'order3': {
        orderNumber: '#20240101003',
        petName: '小泰迪',
        reportDate: '2024-01-15'
      }
    };

    const currentOrderData = mockOrders[orderId] || mockOrders['order1'];
    setOrderData(currentOrderData);
  }, [searchParams]);

  // ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // 处理文件上传
  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      if (uploadedPhotos.length >= maxPhotos) {
        alert(`最多只能上传${maxPhotos}张照片`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('照片大小不能超过5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const photoData: PhotoData = {
            id: Date.now() + Math.random(),
            file: file,
            url: e.target.result as string
          };
          setUploadedPhotos(prev => [...prev, photoData]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 点击上传区域
  const handleUploadAreaClick = () => {
    if (uploadedPhotos.length < maxPhotos && photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  // 文件选择处理
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  // 拖拽处理
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
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  // 删除照片
  const handleRemovePhoto = (photoId: number) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  // 表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedingLog.trim() || !toiletLog.trim() || !exerciseLog.trim()) {
      alert('请填写完整的托管记录');
      return;
    }

    // 模拟提交数据
    const reportData = {
      orderId: searchParams.get('orderId') || 'order1',
      orderNumber: orderData.orderNumber,
      petName: orderData.petName,
      reportDate: orderData.reportDate,
      feedingLog: feedingLog,
      toiletLog: toiletLog,
      exerciseLog: exerciseLog,
      photos: uploadedPhotos
    };

    console.log('提交托管日报数据:', reportData);

    // 显示提交成功提示
    alert('托管日报提交成功！');
    
    // 返回订单管理页
    navigate('/provider-order-manage');
  };

  // 关闭弹窗
  const handleClose = () => {
    navigate(-1);
  };

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 模态弹窗遮罩 */}
      <div 
        className={`${styles.modalOverlay} fixed inset-0 z-50 flex items-center justify-center p-4`}
        onClick={handleOverlayClick}
      >
        {/* 模态弹窗内容 */}
        <div className={`${styles.modalContent} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl`}>
          {/* 弹窗头部 */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-file-alt text-secondary text-lg"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-accent">填写托管日报</h2>
                <p className="text-sm text-text-light">记录宠物的一天</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <i className="fas fa-times text-text-light text-lg"></i>
            </button>
          </div>

          {/* 弹窗内容 */}
          <div className="p-6">
            {/* 订单信息 */}
            <div className={`${styles.glassCard} p-4 rounded-xl mb-6`}>
              <h3 className="text-lg font-semibold text-accent mb-3">订单信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-hashtag text-secondary"></i>
                  <div>
                    <p className="text-sm text-text-light">订单号</p>
                    <p className="font-medium text-text-primary">{orderData.orderNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-paw text-secondary"></i>
                  <div>
                    <p className="text-sm text-text-light">宠物名称</p>
                    <p className="font-medium text-text-primary">{orderData.petName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-calendar text-secondary"></i>
                  <div>
                    <p className="text-sm text-text-light">记录日期</p>
                    <p className="font-medium text-text-primary">{orderData.reportDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 托管日报表单 */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 喂食记录 */}
              <div className="space-y-2">
                <label htmlFor="feeding-log" className="block text-sm font-medium text-accent">
                  <i className="fas fa-utensils text-secondary mr-2"></i>
                  喂食记录
                </label>
                <textarea 
                  id="feeding-log" 
                  name="feeding-log" 
                  rows={4} 
                  placeholder="请记录今天的喂食情况，包括喂食时间、食物种类、食量等..."
                  value={feedingLog}
                  onChange={(e) => setFeedingLog(e.target.value)}
                  className={`w-full px-4 py-3 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none`}
                />
              </div>

              {/* 排便记录 */}
              <div className="space-y-2">
                <label htmlFor="toilet-log" className="block text-sm font-medium text-accent">
                  <i className="fas fa-toilet text-secondary mr-2"></i>
                  排便记录
                </label>
                <textarea 
                  id="toilet-log" 
                  name="toilet-log" 
                  rows={4} 
                  placeholder="请记录今天的排便情况，包括次数、状态、是否正常等..."
                  value={toiletLog}
                  onChange={(e) => setToiletLog(e.target.value)}
                  className={`w-full px-4 py-3 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none`}
                />
              </div>

              {/* 运动记录 */}
              <div className="space-y-2">
                <label htmlFor="exercise-log" className="block text-sm font-medium text-accent">
                  <i className="fas fa-running text-secondary mr-2"></i>
                  运动记录
                </label>
                <textarea 
                  id="exercise-log" 
                  name="exercise-log" 
                  rows={4} 
                  placeholder="请记录今天的运动情况，包括散步、玩耍、活动时间等..."
                  value={exerciseLog}
                  onChange={(e) => setExerciseLog(e.target.value)}
                  className={`w-full px-4 py-3 border border-white/30 rounded-lg ${styles.glassEffect} text-text-primary placeholder-text-light focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none`}
                />
              </div>

              {/* 照片上传 */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-accent">
                  <i className="fas fa-camera text-secondary mr-2"></i>
                  照片上传
                  <span className="text-xs text-text-light ml-2">(最多上传6张照片)</span>
                </label>
                
                {/* 上传区域 */}
                <div 
                  onClick={handleUploadAreaClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`${styles.uploadArea} ${isDragOver ? styles.uploadAreaDragover : ''} p-6 rounded-lg text-center cursor-pointer`}
                >
                  <input 
                    type="file" 
                    ref={photoInputRef}
                    multiple 
                    accept="image/*" 
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <div className="space-y-2">
                    <i className="fas fa-cloud-upload-alt text-3xl text-text-light"></i>
                    <p className="text-text-secondary">点击或拖拽照片到此处上传</p>
                    <p className="text-sm text-text-light">支持 JPG、PNG 格式，单张不超过5MB</p>
                  </div>
                </div>

                {/* 照片预览区域 */}
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {uploadedPhotos.map(photo => (
                      <div key={photo.id} className={styles.photoPreview}>
                        <img src={photo.url} alt="宠物照片" className="w-full h-32 object-cover rounded-lg" />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePhoto(photo.id)}
                          className={styles.removePhoto}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* 弹窗底部 */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-white/20">
            <button 
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-white/30 rounded-lg text-text-secondary hover:bg-white/20 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              form="daily-report-form"
              onClick={handleSubmit}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              提交日报
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReportPage;

