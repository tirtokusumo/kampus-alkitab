import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CmsProvider } from './cms/CmsContext';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

/* ── Layouts (kept static — lightweight) ── */
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import CoursePlayerLayout from './layouts/CoursePlayerLayout';

/* ── Lazy-loaded Pages (code splitting) ── */
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Courses = lazy(() => import('./pages/Courses'));
const Bible = lazy(() => import('./pages/Bible'));
const Community = lazy(() => import('./pages/Community'));
const ForumThread = lazy(() => import('./pages/ForumThread'));
const SmallGroups = lazy(() => import('./pages/SmallGroups'));
const SmallGroupDetail = lazy(() => import('./pages/SmallGroupDetail'));
const Certifications = lazy(() => import('./pages/Certifications'));
const CertificationDetail = lazy(() => import('./pages/CertificationDetail'));
const MyCertifications = lazy(() => import('./pages/MyCertifications'));
const Landing = lazy(() => import('./pages/Landing'));
const Renungan = lazy(() => import('./pages/Renungan'));
const RenunganDetail = lazy(() => import('./pages/RenunganDetail'));
const Acara = lazy(() => import('./pages/Acara'));
const StudyBibleClub = lazy(() => import('./pages/StudyBibleClub'));
const NewLifeCamp = lazy(() => import('./pages/NewLifeCamp'));
const TentangKami = lazy(() => import('./pages/TentangKami'));
const MinistryHub = lazy(() => import('./pages/MinistryHub'));
const ResourceStore = lazy(() => import('./pages/ResourceStore'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Settings = lazy(() => import('./pages/Settings'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Donasi = lazy(() => import('./pages/Donasi'));
const PrayerWall = lazy(() => import('./pages/PrayerWall'));

/* ── Admin Pages ── */
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const PageManager = lazy(() => import('./pages/admin/PageManager'));
const MenuBuilder = lazy(() => import('./pages/admin/MenuBuilder'));
const ThemeSettings = lazy(() => import('./pages/admin/ThemeSettings'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const BlockEditor = lazy(() => import('./pages/admin/BlockEditor'));
const MediaManager = lazy(() => import('./pages/admin/MediaManager'));
const CmsPage = lazy(() => import('./pages/CmsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* ── Loading fallback ── */
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh', flexDirection: 'column', gap: 16
  }}>
    <div style={{
      width: 40, height: 40, border: '4px solid #e2e8f0',
      borderTopColor: '#1a237e', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 500 }}>Memuat halaman...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
    <HelmetProvider>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <CmsProvider>
          <Toast />
          <Router>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* ── Landing Page ── */}
            <Route path="/" element={<Landing />} />

            {/* ── Auth Routes ── */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* ── Course Player (login required) ── */}
            <Route element={<CoursePlayerLayout />}>
              <Route path="/course/:id" element={<ProtectedRoute><CoursePlayer /></ProtectedRoute>} />
            </Route>

            {/* ── PUBLIC Routes (no login required) ── */}
            <Route element={<PublicLayout />}>
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/renungan" element={<Renungan />} />
              <Route path="/renungan/:id" element={<RenunganDetail />} />
              <Route path="/acara" element={<Acara />} />
              <Route path="/acara/study-bible-club" element={<StudyBibleClub />} />
              <Route path="/acara/new-life-camp" element={<NewLifeCamp />} />
              <Route path="/tentang" element={<TentangKami />} />
              <Route path="/ministry-hub" element={<MinistryHub />} />
              <Route path="/toko" element={<ResourceStore />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/certifications/:slug" element={<CertificationDetail />} />
              <Route path="/toko/:id" element={<ProductDetail />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/dukungan" element={<Donasi />} />
              <Route path="/doa" element={<PrayerWall />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/thread/:id" element={<ForumThread />} />
              <Route path="/community/small-groups" element={<SmallGroups />} />
              <Route path="/community/small-groups/:id" element={<SmallGroupDetail />} />
              <Route path="/p/:slug" element={<CmsPage />} />
            </Route>

            {/* ── MEMBER Routes (logged-in area) ── */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/bible" element={<ProtectedRoute><Bible /></ProtectedRoute>} />
              <Route path="/my-certifications" element={<ProtectedRoute><MyCertifications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Route>

            {/* ── ADMIN CMS Routes ── */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/pages" element={<AdminRoute><PageManager /></AdminRoute>} />
            <Route path="/admin/menus" element={<AdminRoute><MenuBuilder /></AdminRoute>} />
            <Route path="/admin/theme" element={<AdminRoute><ThemeSettings /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><SiteSettings /></AdminRoute>} />
            <Route path="/admin/pages/:id/edit" element={<AdminRoute><BlockEditor /></AdminRoute>} />
            <Route path="/admin/media" element={<AdminRoute><MediaManager /></AdminRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Router>
        </CmsProvider>
      </CartProvider>
      </WishlistProvider>
    </AuthProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
