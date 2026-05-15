import { useParams } from 'react-router-dom';
import { useCms } from '../cms/CmsContext';
import BlockRenderer from '../cms/BlockRenderer';
import SEOHead from '../components/SEOHead';

/**
 * CmsPage — Dynamic page that renders blocks from CMS data.
 * Used for custom pages created in the admin Page Manager.
 */
const CmsPage = () => {
  const { slug } = useParams();
  const { pages, siteSettings } = useCms();

  // Find page by slug (prepend / if needed)
  const fullSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const page = pages.find(p => p.slug === fullSlug && p.status === 'published');

  if (!page) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#94a3b8'
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#e2e8f0', marginBottom: '0.5rem' }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>Halaman Tidak Ditemukan</h2>
        <p style={{ fontSize: '0.9rem' }}>Halaman yang Anda cari tidak ada atau belum dipublikasikan.</p>
      </div>
    );
  }

  const blocks = page.blocks || [];

  return (
    <>
      <SEOHead
        title={`${page.title} | ${siteSettings?.siteName || 'Kampus Alkitab'}`}
        description={siteSettings?.metaDescription}
      />
      {blocks.length > 0 ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <div style={{
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>{page.title}</h1>
          <p>Halaman ini belum memiliki konten. Tambahkan blok melalui CMS admin.</p>
        </div>
      )}
    </>
  );
};

export default CmsPage;
