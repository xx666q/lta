import React from 'react';
import styles from './styles.module.css';

interface Props {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'up' | 'down' | 'warning';
  icon: string;
  colorClass: string;
}
 
const StatCard: React.FC<Props> = ({
  title,
  value,
  trend,
  trendType = 'up',
  icon,
  colorClass,
}) => {
  const trendColor =
    trendType === 'up'
      ? 'text-green-600'
      : trendType === 'down'
      ? 'text-red-600'
      : 'text-yellow-600';

  return (
    <div className={`${styles.glassCard} p-6 rounded-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-light text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-secondary">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trendColor}`}>
              <i className={`fas fa-arrow-${
                trendType === 'up' ? 'up' : 'down'
              } mr-1`}></i>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
