

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

type AuditStatus = 'pending' | 'approved' | 'rejected' | 'not-submitted';

interface UploadedFile {
  file: File;
  preview: string;
}

const QualificationAuditPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<AuditStatus>('pending');
  const [rejectionReason, setRejectionReason] = useState<string>('请检查身份证照片是否清晰，确保所有信息可见。');
  
  // 文件上传状态
  const [idCardFront, setIdCardFront] = useState<UploadedFile | null>(null);
  const [idCardBack, setIdCardBack] = useState<UploadedFile | null>(null);
  const [idCardSelfie, setIdCardSelfie] = useState<UploadedFile | null>(null);
  const [environmentPhotos, setEnvironmentPhotos] = useState<(UploadedFile | null)[]>([null, null, null]);
  const [businessLicense, setBusinessLicense] = useState<UploadedFile | null>(null);
  
  // 文件输入引用
  const idCardFrontInputRef = useRef<HTMLInputElement>(null);
  const idCardBackInputRef = useRef<HTMLInputElement>(null);
  const idCardSelfieInputRef = useRef<HTMLInputElement>(null);
  const environmentPhotoInputsRef = useRef<(HTMLInputElement | null)[]>([null, null, null]);
  const businessLicenseInputRef = useRef<HTMLInputElement>(null);

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - 资质审核';
    return () => { document.title = originalTitle; };
  }, []);

  // 处理文件上传
  const handleFileUpload = (
    file: File, 
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setter({
          file,
          preview: e.target.result as string
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // 处理拖拽上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add(styles.uploadAreaDragover);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.uploadAreaDragover);
  };

  const handleDrop = (
    e: React.DragEvent, 
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>,
    currentFile: UploadedFile | null
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove(styles.uploadAreaDragover);
    
    if (currentFile) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileUpload(file, setter);
      }
    }
  };

  // 删除上传文件
  const handleRemoveFile = (
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>
  ) => {
    setter(null);
  };

  // 表单验证
  const validateForm = (): boolean => {
    const requiredFiles = [
      idCardFront,
      idCardBack,
      idCardSelfie,
      environmentPhotos[0],
      environmentPhotos[1],
      environmentPhotos[2]
    ];

    for (const file of requiredFiles) {
      if (!file) {
        alert('请完成所有必填项的上传');
        return false;
      }
    }

    return true;
  };

  // 提交审核
  const handleSubmitAudit = () => {
    if (validateForm()) {
      setCurrentStatus('pending');
      alert('资质材料已提交，我们将在1-3个工作日内完成审核');
    }
  };

  // 重新提交
  const handleResubmitAudit = () => {
    if (validateForm()) {
      setCurrentStatus('pending');
      alert('资质材料已重新提交，我们将在1-3个工作日内完成审核');
    }
  };

  // 处理导航项点击
  const handleNavigation = (path: string, requiresApproval: boolean = false) => {
    if (requiresApproval && currentStatus !== 'approved') {
      alert('请先通过资质审核');
      return;
    }
    navigate(path);
  };

  // 处理AI客服点击
  const handleAiCustomerService = () => {
    alert('AI客服功能开发中...');
  };

  // 渲染状态徽章
  const renderStatusBadge = () => {
    switch (currentStatus) {
      case 'pending':
        return (
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles.statusPending}`}>
            <i className="fas fa-clock mr-1"></i>
            待审核
          </span>
        );
      case 'approved':
        return (
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles.statusApproved}`}>
            <i className="fas fa-check mr-1"></i>
            审核通过
          </span>
        );
      case 'rejected':
        return (
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles.statusRejected}`}>
            <i className="fas fa-times mr-1"></i>
            审核未通过
          </span>
        );
      default:
        return (
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${styles.statusPending}`}>
            <i className="fas fa-upload mr-1"></i>
            待提交
          </span>
        );
    }
  };

  // 渲染状态文本
  const renderStatusText = () => {
    switch (currentStatus) {
      case 'pending':
        return '您的资质材料正在审核中，预计1-3个工作日内完成';
      case 'approved':
        return '恭喜！您的资质审核已通过，可以开始发布托管服务了';
      case 'rejected':
        return '您的资质材料未通过审核，请修改后重新提交';
      default:
        return '请提交您的资质材料进行审核';
    }
  };

  // 渲染上传区域
  const renderUploadArea = (
    title: string,
    description: string,
    file: UploadedFile | null,
    inputRef: React.RefObject<HTMLInputElement>,
    onUpload: (file: File) => void,
    onRemove: () => void,
    heightClass: string = 'h-48'
  ) => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{title}</label>
      <div 
        className={`${styles.uploadArea} rounded-lg p-6 text-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, onUpload, file)}
        onClick={() => !file && inputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={inputRef}
          accept="image/*" 
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              onUpload(selectedFile);
            }
          }}
        />
        {!file ? (
          <div className="space-y-2">
            <i className="fas fa-cloud-upload-alt text-3xl text-text-light"></i>
            <p className="text-text-light text-sm">{description}</p>
            <p className="text-text-light text-xs">请确保照片清晰，信息完整</p>
          </div>
        ) : (
          <div className={`${styles.uploadedImage} ${heightClass} w-full object-cover rounded-lg`}>
            <img src={file.preview} alt={title} className="w-full h-full object-cover rounded-lg" />
            <button 
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // 渲染环境照片上传区域
  const renderEnvironmentPhotoUpload = (
    index: number,
    file: UploadedFile | null
  ) => (
    <div 
      key={index}
      className={`${styles.uploadArea} rounded-lg p-4 text-center cursor-pointer`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        const setter = (newFile: UploadedFile | null) => {
          const newPhotos = [...environmentPhotos];
          newPhotos[index] = newFile;
          setEnvironmentPhotos(newPhotos);
        };
        handleDrop(e, setter, file);
      }}
      onClick={() => !file && environmentPhotoInputsRef.current[index]?.click()}
    >
      <input 
        type="file" 
        ref={(el) => environmentPhotoInputsRef.current[index] = el}
        accept="image/*" 
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            const setter = (newFile: UploadedFile | null) => {
              const newPhotos = [...environmentPhotos];
              newPhotos[index] = newFile;
              setEnvironmentPhotos(newPhotos);
            };
            handleFileUpload(selectedFile, setter);
          }
        }}
      />
      {!file ? (
        <div className="space-y-2">
          <i className="fas fa-plus text-2xl text-text-light"></i>
          <p className="text-text-light text-xs">上传环境照片</p>
        </div>
      ) : (
        <div className={`${styles.uploadedImage} w-full h-32 object-cover rounded-lg`}>
          <img src={file.preview} alt="环境照片" className="w-full h-full object-cover rounded-lg" />
          <button 
            className={styles.removeBtn}
            onClick={(e) => {
              e.stopPropagation();
              const newPhotos = [...environmentPhotos];
              newPhotos[index] = null;
              setEnvironmentPhotos(newPhotos);
            }}
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      )}
    </div>
  );

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
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">1</span>
            </button>
            
            {/* 用户头像 */}
            <div className="relative">
              <button className={`flex items-center space-x-2 p-2 rounded-lg ${styles.glassEffect} hover:bg-white/30 transition-colors`}>
                <img src="https://s.coze.cn/image/Jq6vFyO0_W0/" 
                     alt="用户头像" className="w-8 h-8 rounded-full" />
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
            <button 
              onClick={() => handleNavigation('/service-publish', true)}
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors w-full text-left`}
            >
              <i className="fas fa-shopping-bag text-lg"></i>
              <span className="font-medium">服务广场</span>
            </button>
            <button 
              onClick={() => handleNavigation('/order-hall', true)}
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors w-full text-left`}
            >
              <i className="fas fa-clipboard-list text-lg"></i>
              <span className="font-medium">接单大厅</span>
            </button>
            <button 
              onClick={() => handleNavigation('/provider-order-manage', true)}
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors w-full text-left`}
            >
              <i className="fas fa-clipboard-check text-lg"></i>
              <span className="font-medium">订单管理</span>
            </button>
            <button 
              onClick={() => handleNavigation('/growth-system', true)}
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors w-full text-left`}
            >
              <i className="fas fa-trophy text-lg"></i>
              <span className="font-medium">成长体系</span>
            </button>
            <Link 
              to="/user-profile" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-user text-lg"></i>
              <span className="font-medium">个人中心</span>
            </Link>
            <a 
              href="#" 
              className={`${styles.menuItem} ${styles.menuItemActive} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-primary`}
            >
              <i className="fas fa-id-card text-lg"></i>
              <span className="font-medium">资质审核</span>
            </a>
            <Link 
              to="/provider-dashboard" 
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors`}
            >
              <i className="fas fa-home text-lg"></i>
              <span className="font-medium">工作台</span>
            </Link>
            <button 
              onClick={() => handleNavigation('/withdrawal', true)}
              className={`${styles.menuItem} flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-secondary transition-colors w-full text-left`}
            >
              <i className="fas fa-money-bill-wave text-lg"></i>
              <span className="font-medium">收入提现</span>
            </button>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6 min-h-screen">
          {/* 页面头部 */}
          <header className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">资质审核</h2>
                <nav className="text-sm text-text-light">
                  <span>首页</span>
                  <i className="fas fa-chevron-right mx-2"></i>
                  <span className="text-secondary">资质审核</span>
                </nav>
              </div>
              <button 
                onClick={handleAiCustomerService}
                className={`${styles.glassEffect} px-4 py-2 rounded-lg text-text-primary hover:bg-white/30 transition-colors`}
              >
                <i className="fas fa-robot mr-2"></i>
                AI客服
              </button>
            </div>
          </header>

          {/* 审核状态显示区 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-id-card text-secondary text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-1">审核状态</h3>
                    <div className="flex items-center space-x-2">
                      {renderStatusBadge()}
                      <span className="text-text-secondary text-sm">
                        {renderStatusText()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-spinner fa-spin text-secondary text-xl"></i>
                    </div>
                    <p className="text-text-light text-sm">审核进行中</p>
                  </div>
                </div>
              </div>
              
              {/* 驳回原因显示 */}
              {currentStatus === 'rejected' && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">审核未通过</h4>
                      <p className="text-red-700 text-sm">
                        {rejectionReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 资质提交表单 */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-accent mb-4">提交资质材料</h3>
            <form className="space-y-6">
              {/* 身份证正反面 */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">
                  <i className="fas fa-id-card mr-2 text-secondary"></i>
                  身份证信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 身份证正面 */}
                  {renderUploadArea(
                    '身份证正面',
                    '点击上传身份证正面照片',
                    idCardFront,
                    idCardFrontInputRef,
                    (file) => handleFileUpload(file, setIdCardFront),
                    () => handleRemoveFile(setIdCardFront)
                  )}
                  
                  {/* 身份证反面 */}
                  {renderUploadArea(
                    '身份证反面',
                    '点击上传身份证反面照片',
                    idCardBack,
                    idCardBackInputRef,
                    (file) => handleFileUpload(file, setIdCardBack),
                    () => handleRemoveFile(setIdCardBack)
                  )}
                </div>
              </div>

              {/* 手持身份证自拍 */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">
                  <i className="fas fa-user-check mr-2 text-secondary"></i>
                  手持身份证自拍
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {renderUploadArea(
                    '手持身份证自拍照片',
                    '点击上传手持身份证自拍',
                    idCardSelfie,
                    idCardSelfieInputRef,
                    (file) => handleFileUpload(file, setIdCardSelfie),
                    () => handleRemoveFile(setIdCardSelfie),
                    'h-64'
                  )}
                </div>
              </div>

              {/* 托管环境照片 */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">
                  <i className="fas fa-home mr-2 text-secondary"></i>
                  托管环境照片
                </h4>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">托管环境照片（至少3张）</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {environmentPhotos.map((photo, index) =>
                      renderEnvironmentPhotoUpload(index, photo)
                    )}
                  </div>
                  <p className="text-text-light text-xs">请展示托管环境的不同角度，包括活动区域、休息区域等</p>
                </div>
              </div>

              {/* 营业执照（可选） */}
              <div className={`${styles.glassCard} p-6 rounded-xl`}>
                <h4 className="font-semibold text-accent mb-4">
                  <i className="fas fa-file-contract mr-2 text-secondary"></i>
                  营业执照 <span className="text-text-light font-normal">(可选)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {renderUploadArea(
                    '营业执照照片',
                    '点击上传营业执照照片',
                    businessLicense,
                    businessLicenseInputRef,
                    (file) => handleFileUpload(file, setBusinessLicense),
                    () => handleRemoveFile(setBusinessLicense)
                  )}
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="flex justify-center space-x-4 pt-6">
                {currentStatus === 'not-submitted' && (
                  <button 
                    type="button" 
                    onClick={handleSubmitAudit}
                    className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-accent transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    提交审核
                  </button>
                )}
                {currentStatus === 'rejected' && (
                  <button 
                    type="button" 
                    onClick={handleResubmitAudit}
                    className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-accent transition-colors"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    重新提交
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* 审核说明 */}
          <section className="mb-8">
            <div className={`${styles.glassCard} p-6 rounded-xl`}>
              <h3 className="text-lg font-semibold text-accent mb-4">
                <i className="fas fa-info-circle mr-2 text-secondary"></i>
                审核说明
              </h3>
              <div className="space-y-3 text-text-secondary text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>审核将在1-3个工作日内完成，我们会通过短信和平台消息通知您审核结果</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>请确保所有照片清晰可辨，信息完整，否则可能导致审核失败</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>审核通过后，您将获得托管服务商资质，可以开始发布托管服务</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>如有疑问，请联系客服或查看帮助中心</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* AI客服悬浮按钮 */}
      <button 
        onClick={handleAiCustomerService}
        className="fixed bottom-6 right-6 w-14 h-14 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-accent transition-colors z-40"
      >
        <i className="fas fa-comments text-xl"></i>
      </button>
    </div>
  );
};

export default QualificationAuditPage;

