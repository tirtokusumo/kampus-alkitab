import { Link } from 'react-router-dom';
import './BlockRenderer.css';

/**
 * BlockRenderer — renders CMS blocks as public-facing page sections.
 * Each block type maps to a styled section component.
 */
const BlockRenderer = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="br-page">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

const RenderBlock = ({ block }) => {
  switch (block.type) {
    case 'hero':
      return <HeroBlock data={block} />;
    case 'text':
      return <TextBlock data={block} />;
    case 'image_text':
      return <ImageTextBlock data={block} />;
    case 'cta':
      return <CtaBlock data={block} />;
    case 'features_grid':
      return <FeaturesGridBlock data={block} />;
    case 'testimonials':
      return <TestimonialsBlock data={block} />;
    case 'stats':
      return <StatsBlock data={block} />;
    case 'spacer':
      return <div style={{ height: block.height || 48 }} />;
    default:
      return null;
  }
};

/* ── Hero ── */
const HeroBlock = ({ data }) => (
  <section className="br-hero" style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})` } : {}}>
    {data.backgroundImage && <div className="br-hero-overlay" />}
    <div className="br-hero-inner">
      <h1 className="br-hero-heading">{data.heading}</h1>
      {data.subheading && <p className="br-hero-sub">{data.subheading}</p>}
      <div className="br-hero-actions">
        {data.ctaText && (
          <Link to={data.ctaLink || '#'} className="br-btn br-btn-primary">{data.ctaText}</Link>
        )}
        {data.secondaryText && (
          <Link to={data.secondaryLink || '#'} className="br-btn br-btn-ghost">{data.secondaryText}</Link>
        )}
      </div>
    </div>
  </section>
);

/* ── Text ── */
const TextBlock = ({ data }) => (
  <section className="br-text" style={{ textAlign: data.alignment || 'left' }}>
    <div className="br-text-inner">
      {data.heading && <h2 className="br-text-heading">{data.heading}</h2>}
      {data.body && data.body.split('\n\n').map((p, i) => (
        <p key={i} className="br-text-para">{p}</p>
      ))}
    </div>
  </section>
);

/* ── Image + Text ── */
const ImageTextBlock = ({ data }) => (
  <section className={`br-imgtext ${data.imagePosition === 'right' ? 'reverse' : ''}`}>
    <div className="br-imgtext-inner">
      <div className="br-imgtext-img-wrap">
        <img src={data.imageUrl} alt={data.heading || ''} className="br-imgtext-img" />
      </div>
      <div className="br-imgtext-content">
        {data.heading && <h2 className="br-imgtext-heading">{data.heading}</h2>}
        {data.body && <p className="br-imgtext-body">{data.body}</p>}
        {data.ctaText && (
          <Link to={data.ctaLink || '#'} className="br-btn br-btn-primary">{data.ctaText}</Link>
        )}
      </div>
    </div>
  </section>
);

/* ── CTA ── */
const CtaBlock = ({ data }) => {
  const variants = {
    primary: 'br-cta-primary',
    secondary: 'br-cta-secondary',
    dark: 'br-cta-dark',
  };
  return (
    <section className={`br-cta ${variants[data.variant] || 'br-cta-primary'}`}>
      <div className="br-cta-inner">
        <h2 className="br-cta-heading">{data.heading}</h2>
        {data.body && <p className="br-cta-body">{data.body}</p>}
        <div className="br-cta-actions">
          {data.ctaText && (
            <Link to={data.ctaLink || '#'} className="br-btn br-btn-cta">{data.ctaText}</Link>
          )}
          {data.secondaryText && (
            <Link to={data.secondaryLink || '#'} className="br-btn br-btn-ghost-light">{data.secondaryText}</Link>
          )}
        </div>
      </div>
    </section>
  );
};

/* ── Features Grid ── */
const FeaturesGridBlock = ({ data }) => (
  <section className="br-features">
    <div className="br-features-inner">
      {data.heading && <h2 className="br-features-heading">{data.heading}</h2>}
      {data.subheading && <p className="br-features-sub">{data.subheading}</p>}
      <div className="br-features-grid">
        {(data.features || []).map((f, i) => (
          <div key={i} className="br-feature-card">
            <span className="br-feature-icon">{f.icon}</span>
            <h3 className="br-feature-title">{f.title}</h3>
            <p className="br-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Testimonials ── */
const TestimonialsBlock = ({ data }) => (
  <section className="br-testimonials">
    <div className="br-testimonials-inner">
      {data.heading && <h2 className="br-testimonials-heading">{data.heading}</h2>}
      <div className="br-testimonials-grid">
        {(data.testimonials || []).map((t, i) => (
          <div key={i} className="br-testimonial-card">
            <p className="br-testimonial-quote">"{t.quote}"</p>
            <div className="br-testimonial-author">
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} className="br-testimonial-avatar" />
              ) : (
                <div className="br-testimonial-avatar-placeholder">
                  {t.name ? t.name[0] : '?'}
                </div>
              )}
              <div>
                <div className="br-testimonial-name">{t.name}</div>
                <div className="br-testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Stats ── */
const StatsBlock = ({ data }) => (
  <section className="br-stats">
    <div className="br-stats-inner">
      {(data.stats || []).map((s, i) => (
        <div key={i} className="br-stat-item">
          <div className="br-stat-number">{s.number}</div>
          <div className="br-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default BlockRenderer;
