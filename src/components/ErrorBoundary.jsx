import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            😔
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1a237e',
            marginBottom: '0.5rem'
          }}>
            Oops! Terjadi Kesalahan
          </h1>
          <p style={{
            fontSize: '0.95rem',
            color: '#64748b',
            maxWidth: '400px',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            Halaman ini mengalami gangguan teknis. Silakan muat ulang halaman untuk melanjutkan.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 32px',
              background: '#1a237e',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#283593'}
            onMouseOut={(e) => e.target.style.background = '#1a237e'}
          >
            🔄 Muat Ulang Halaman
          </button>
          {this.state.error && (
            <details style={{
              marginTop: '2rem',
              padding: '1rem',
              background: 'rgba(239,68,68,0.05)',
              borderRadius: '8px',
              maxWidth: '500px',
              textAlign: 'left',
              fontSize: '0.8rem',
              color: '#94a3b8'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>Detail Teknis</summary>
              <pre style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
