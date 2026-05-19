import { FC, useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message: string;
  onClose?: () => void;
  autoClose?: number;
}

const alertStyles = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    text: 'text-green-800 dark:text-green-200',
    Icon: CheckCircle,
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    text: 'text-red-800 dark:text-red-200',
    Icon: AlertCircle,
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    text: 'text-yellow-800 dark:text-yellow-200',
    Icon: AlertTriangle,
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    text: 'text-blue-800 dark:text-blue-200',
    Icon: Info,
  },
};

const Alert: FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const style = alertStyles[type];
  const Icon = style.Icon;

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`rounded-lg border ${style.bg} ${style.border} p-4 mb-4`}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${style.icon}`} />
        <div className="flex-1">
          <h3 className={`font-semibold ${style.text}`}>{title}</h3>
          <p className={`text-sm mt-1 ${style.text} opacity-90`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className={`text-gray-400 hover:text-gray-600 flex-shrink-0`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
