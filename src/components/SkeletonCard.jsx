import './SkeletonCard.css';

/**
 * Reusable skeleton card shimmer component.
 * @param {{ count?: number, variant?: 'course' | 'product' }} props
 */
const SkeletonCard = ({ count = 4, variant = 'course' }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className={`skeleton-card-img skeleton-shimmer`} style={{ height: variant === 'product' ? 220 : 180 }} />
          <div className="skeleton-card-body">
            <div className="skeleton-line skeleton-shimmer w-40 h-sm" />
            <div className="skeleton-line skeleton-shimmer w-80 h-lg" />
            <div className="skeleton-line skeleton-shimmer w-60" />
            <div className="skeleton-row">
              <div className="skeleton-line skeleton-shimmer w-40 h-sm" />
              <div className="skeleton-line skeleton-shimmer w-40 h-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
