import React from 'react';
import styles from './styles.module.css';

interface Props {
  icon: string;
  title: string;
  desc: string;
  onClick?: () => void;
  colorClass: string;
}

const QuickAction: React.FC<Props> = ({
  icon,
  title,
  desc,
  onClick,
  colorClass,
}) => (
  <button
    onClick={onClick}
    className={`${styles.glassCard} p-6 rounded-xl text-left hover:bg-white/30 transition-colors w-full`}
  >
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}>
        <i className={`${icon} text-xl`}></i>
      </div>
      <div>
        <h4 className="font-semibold text-accent">{title}</h4>
        <p className="text-text-light text-sm">{desc}</p>
      </div>
    </div>
  </button>
);

export default QuickAction;
