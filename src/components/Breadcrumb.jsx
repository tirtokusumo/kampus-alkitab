import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

/**
 * Reusable breadcrumb component.
 * @param {{ items: { label: string, to?: string }[] }} props
 * items — array of crumbs. Last item is shown as current page (no link).
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-item" aria-label="Beranda">
        <Home size={14} />
        <span>Beranda</span>
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ChevronRight size={12} className="breadcrumb-sep" />
            {isLast ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.to} className="breadcrumb-item">{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
