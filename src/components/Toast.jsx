import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Toast.css';

const Toast = () => {
  const { toast, setToast } = useCart();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <XCircle size={20} color="#f87171" />;
      case 'info':
        return <Info size={20} color="#60a5fa" />;
      case 'success':
      default:
        return <CheckCircle2 size={20} color="#4ade80" />;
    }
  };

  return (
    <div className={`global-toast-container ${toast.type || 'success'}`}>
      <div className="global-toast-content">
        {getIcon()}
        <span>{toast.message}</span>
      </div>
      <button className="global-toast-close" onClick={() => setToast(null)} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
