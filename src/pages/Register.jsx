import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import usePageTitle from '../hooks/usePageTitle';

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();
  const { register } = useAuth();
  usePageTitle('Daftar');
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      showToast('Password harus minimal 6 karakter!', 'error');
      return;
    }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      showToast('Berhasil mendaftar! Silakan masuk.', 'success');
      navigate(redirectUrl ? `/login?redirect=${redirectUrl}` : '/login');
    } else {
      showToast(result.error || 'Gagal mendaftar', 'error');
    }
  };

  return (
    <div className="login-page">
      {/* Logo — click to go home */}
      <Link to="/" className="login-logo-row" style={{ textDecoration: 'none' }}>
        <img src="/logo-dark.png" alt="Kampus Alkitab" className="login-logo" />
        <span className="login-app-name">Kampus Alkitab</span>
      </Link>

      <div className="login-heading">
        <h1 className="login-title">Bergabung Sekarang</h1>
        <p className="login-subtitle">Buat akun untuk mulai belajar & melayani.</p>
      </div>

      <form onSubmit={handleRegister} className="login-form">
        {/* Full Name */}
        <div className="login-field">
          <label htmlFor="name" className="login-label">Nama Lengkap</label>
          <div className="login-input-wrap">
            <User size={17} className="login-input-icon" />
            <input
              type="text"
              id="name"
              className="login-input"
              placeholder="Masukkan nama lengkapmu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="login-field">
          <label htmlFor="email" className="login-label">Email</label>
          <div className="login-input-wrap">
            <Mail size={17} className="login-input-icon" />
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="nama@gereja.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-field">
          <label htmlFor="password" className="login-label">Password</label>
          <div className="login-input-wrap">
            <Lock size={17} className="login-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="login-input"
              placeholder="Buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="login-submit-btn" disabled={loading}>
          {loading ? <span className="login-spinner" /> : <>Buat Akun <ArrowRight size={18} /></>}
        </button>
      </form>

      <div className="login-register" style={{ marginTop: '1.25rem' }}>
        Sudah punya akun?{' '}
        <Link to={`/login${redirectUrl ? '?redirect=' + redirectUrl : ''}`} className="login-register-link">Masuk di sini</Link>
      </div>
    </div>
  );
};

export default Register;
