import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Left Branded Panel */}
      <div className="auth-panel-left">
        <div className="auth-brand">
          <img src="/logo-dark.png" alt="Kampus Alkitab" className="auth-brand-logo" />
          <span className="auth-brand-name">Kampus Alkitab</span>
        </div>

        <div className="auth-panel-quote">
          <p className="auth-quote-text">
            "Usahakanlah supaya engkau layak di hadapan Allah sebagai seorang pekerja yang tidak usah malu, yang berterus terang memberitakan perkataan kebenaran itu."
          </p>
          <p className="auth-quote-source">— 2 Timotius 2:15</p>
        </div>

        <div className="auth-panel-bottom">
          <ul className="auth-feature-list">
            <li>Ratusan kelas rohani berkualitas tinggi</li>
            <li>Sertifikasi resmi pelayanan gereja</li>
            <li>Komunitas iman yang bertumbuh bersama</li>
            <li>Akses belajar kapan saja dan di mana saja</li>
          </ul>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-panel-right">
        <div className="auth-form-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
