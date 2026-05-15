import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'Kampus Alkitab',
  description = 'Platform pendidikan rohani digital #1 di Indonesia. Bertumbuh dalam Firman, berdampak dalam pelayanan.',
  image = '/og-cover.png',
  url,
  type = 'website',
}) => {
  const fullTitle = title.includes('Kampus Alkitab') ? title : `${title} — Kampus Alkitab`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / WhatsApp / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Kampus Alkitab" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  );
};

export default SEOHead;
