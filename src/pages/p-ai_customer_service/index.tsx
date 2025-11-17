

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  isTyping?: boolean;
}

const AICustomerService: React.FC = () => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      content: '您好！我是宠托帮的AI客服，很高兴为您服务。请问有什么可以帮助您的吗？',
      isUser: false
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // AI回复模板
  const aiResponses: Record<string, string> = {
    '托管需要带什么证件？': '托管宠物时，建议携带宠物的疫苗接种证明、身份证明（如宠物证），以及宠物的日常用品如食物、玩具等。如果宠物有特殊医疗需求，还需要提供相关的医疗记录。',
    '宠物生病怎么办？': '如果托管期间宠物生病，我们的托管师会立即联系您，并根据您的指示进行处理。如果情况紧急，会第一时间送往合作的宠物医院，并及时通知您。我们建议您提前告知托管师宠物的健康状况和常用药物。',
    '如何选择合适的托管服务？': '您可以通过以下方式选择合适的托管服务：\n1. 查看服务商的评分和评价\n2. 筛选距离您较近的服务商\n3. 确认服务商是否接受您的宠物类型\n4. 查看服务商的托管环境照片\n5. 了解服务内容和价格\n如有疑问，欢迎随时咨询！',
    '如何预约托管服务？': '预约托管服务的步骤：\n1. 在"寻找服务"页面筛选合适的服务商\n2. 查看服务详情并选择预约时段\n3. 选择要托管的宠物\n4. 填写特殊需求（如有）\n5. 支付定金完成预约\n预约成功后，我们会及时通知您和服务商。',
    '托管费用如何计算？': '托管费用根据服务类型（日托、周托、临时照看）、宠物类型、服务时长等因素计算。您可以在服务详情页面查看具体价格，也可以联系服务商协商价格。',
    '可以随时取消预约吗？': '可以取消预约，但需要根据取消时间收取相应的手续费：\n• 提前48小时以上取消：全额退款\n• 提前24-48小时取消：退款80%\n• 提前12-24小时取消：退款50%\n• 不足12小时取消：不予退款\n建议您提前规划，避免不必要的损失。',
    '如何查看宠物的实时状态？': '您可以通过"云看宠"功能查看宠物的实时状态。如果服务商接入了监控摄像头，您可以观看实时视频；托管师也会定期上传宠物的照片和短视频，让您随时了解宠物的情况。',
    '平台如何保障宠物安全？': '我们通过以下措施保障宠物安全：\n1. 所有服务商都经过实名认证和资质审核\n2. 重要环节有监控记录\n3. 建立完善的评价体系\n4. 提供宠物保险\n5. 24小时客服支持\n让您的宠物在托管期间得到最好的照顾。',
    '如何成为托管服务商？': '成为托管服务商需要：\n1. 完成实名认证\n2. 提交托管环境照片\n3. 提供相关资质证明\n4. 通过平台审核\n审核通过后，您就可以发布托管服务，开始接单了。',
    '提现多久能到账？': '订单完成后，资金会在T+1个工作日内到达您的银行卡。平台会在每个工作日的固定时间处理提现申请，您可以在"收入提现"页面查看提现进度。'
  };

  // 设置页面标题
  useEffect(() => {
    const originalTitle = document.title;
    document.title = '宠托帮 - AI客服';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseChat();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 关闭聊天窗口
  const handleCloseChat = () => {
    navigate(-1);
  };

  // 发送消息
  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (!message || isSending) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      content: message,
      isUser: true
    };

    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsSending(true);

    // 添加正在输入指示器
    const typingIndicator: ChatMessage = {
      id: Date.now().toString() + '-typing',
      content: '',
      isUser: false,
      isTyping: true
    };

    setChatMessages(prev => [...prev, typingIndicator]);

    // 模拟AI回复延迟
    setTimeout(() => {
      // 移除正在输入指示器
      setChatMessages(prev => prev.filter(msg => msg.id !== typingIndicator.id));

      // 查找匹配的回复
      let response = aiResponses[message];
      if (!response) {
        response = '抱歉，我暂时无法回答这个问题。您可以尝试以下方式：\n1. 重新描述您的问题\n2. 查看常见问题\n3. 转人工客服咨询';
      }

      // 添加AI回复
      const aiMessage: ChatMessage = {
        id: Date.now().toString() + '-ai',
        content: response,
        isUser: false
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsSending(false);
    }, 1000 + Math.random() * 1000);
  };

  // 处理输入框回车
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理输入框变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setUserInput(target.value);
    
    // 自动调整高度
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
  };

  // 快捷问题点击
  const handleQuickQuestion = (question: string) => {
    setUserInput(question);
    setShowQuickQuestions(false);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // 转人工客服
  const handleTransferToHuman = () => {
    const transferMessage: ChatMessage = {
      id: Date.now().toString() + '-transfer',
      content: '正在为您转接人工客服，请稍候...',
      isUser: false
    };

    setChatMessages(prev => [...prev, transferMessage]);

    setTimeout(() => {
      const busyMessage: ChatMessage = {
        id: Date.now().toString() + '-busy',
        content: '抱歉，当前人工客服暂时繁忙，请您稍后再试或留下联系方式，我们会尽快回复您。',
        isUser: false
      };

      setChatMessages(prev => [...prev, busyMessage]);
    }, 2000);
  };

  // 处理背景点击
  const handleBackgroundClick = () => {
    handleCloseChat();
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={handleBackgroundClick}
      />
      
      {/* AI客服弹窗 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`${styles.glassCard} w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl`}>
          {/* 弹窗头部 */}
          <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent">AI客服</h3>
                <p className="text-sm text-text-light">7×24小时在线服务</p>
              </div>
            </div>
            <button 
              onClick={handleCloseChat}
              className="p-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <i className="fas fa-times text-text-secondary text-lg" />
            </button>
          </div>
          
          {/* 对话历史区域 */}
          <div 
            ref={chatContainerRef}
            className={`${styles.chatContainer} p-4 space-y-4`}
          >
            {chatMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-2">
                {message.isUser ? (
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-white text-sm" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-white text-sm" />
                  </div>
                )}
                
                <div className={`${message.isUser ? styles.chatMessageUser : styles.chatMessageAi} max-w-xs p-3 text-sm`}>
                  {message.isTyping ? (
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                      <div className={styles.typingDot} />
                    </div>
                  ) : (
                    message.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < message.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))
                  )}
                </div>
              </div>
            ))}
            
            {/* 常见问题快捷入口 */}
            {showQuickQuestions && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button 
                  onClick={() => handleQuickQuestion('托管需要带什么证件？')}
                  className="px-3 py-2 bg-white/50 text-text-secondary text-sm rounded-full hover:bg-white/70 transition-colors"
                >
                  托管需要带什么证件？
                </button>
                <button 
                  onClick={() => handleQuickQuestion('宠物生病怎么办？')}
                  className="px-3 py-2 bg-white/50 text-text-secondary text-sm rounded-full hover:bg-white/70 transition-colors"
                >
                  宠物生病怎么办？
                </button>
                <button 
                  onClick={() => handleQuickQuestion('如何选择合适的托管服务？')}
                  className="px-3 py-2 bg-white/50 text-text-secondary text-sm rounded-full hover:bg-white/70 transition-colors"
                >
                  如何选择合适的托管服务？
                </button>
              </div>
            )}
          </div>
          
          {/* 输入区域 */}
          <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea 
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className={`${styles.chatInput} w-full px-4 py-3 bg-white/80 border border-white/30 rounded-xl resize-none text-text-primary placeholder-text-light`}
                  placeholder="请输入您的问题..." 
                  rows={1}
                  maxLength={500}
                />
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isSending}
                className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white hover:bg-accent transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane text-lg" />
              </button>
            </div>
            
            {/* 转人工按钮 */}
            <div className="flex justify-center mt-3">
              <button 
                onClick={handleTransferToHuman}
                className="px-4 py-2 text-sm text-text-secondary hover:text-secondary transition-colors"
              >
                <i className="fas fa-user-tie mr-2" />
                转人工客服
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICustomerService;

