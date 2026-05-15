import { useLocation } from 'react-router-dom';
import { useCms } from './CmsContext';
import BlockRenderer from './BlockRenderer';

/**
 * CmsBlockInjector
 * Automatically finds the published CMS page for the current URL path
 * and renders its blocks. Used to inject dynamically built CMS blocks
 * into hardcoded core pages like Landing, Courses, etc.
 */
const CmsBlockInjector = ({ slugOverride }) => {
  const location = useLocation();
  const { pages } = useCms();
  
  const currentSlug = slugOverride || location.pathname;
  const page = pages.find(p => p.slug === currentSlug && p.status === 'published');
  
  if (!page || !page.blocks || page.blocks.length === 0) return null;
  
  return (
    <div className="cms-injected-blocks" style={{ width: '100%' }}>
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
};

export default CmsBlockInjector;
