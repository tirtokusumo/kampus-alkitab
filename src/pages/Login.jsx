import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Login.css';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useCart();
  usePageTitle('Masuk');
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      showToast('Password harus minimal 6 karakter!', 'error');
      setError('Password harus minimal 6 karakter');
      return;
    }
    setError('');
    setLoading(true);
    // Call the actual node backend
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      showToast('Berhasil masuk', 'success');
      // result.user.role comes from database (sqlite)
      if (result.user.role === 'admin' || result.user.role === 'superadmin') {
        navigate('/admin');
      } else if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/dashboard');
      }
    } else {
      const errMsg = result.error || 'Email atau password tidak sesuai. Coba lagi.';
      showToast(errMsg, 'error');
      setError(errMsg);
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
        <h1 className="login-title">Selamat Datang!</h1>
        <p className="login-subtitle">Masuk untuk melanjutkan perjalanan rohanimu.</p>
      </div>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="login-form">
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
          <div className="login-label-row">
            <label htmlFor="password" className="login-label">Password</label>
            <a href="#" className="login-forgot">Lupa password?</a>
          </div>
          <div className="login-input-wrap">
            <Lock size={17} className="login-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="login-input"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
          {loading ? (
            <span className="login-spinner" />
          ) : (
            <>Masuk <ArrowRight size={18} /></>
          )}
        </button>
      </form>


      <div className="login-register">
        Belum punya akun?{' '}
        <Link to={`/register${redirectUrl ? '?redirect=' + redirectUrl : ''}`} className="login-register-link">Daftar di sini</Link>
      </div>
    </div>
  );
};

export default Login;
