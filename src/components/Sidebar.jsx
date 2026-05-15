import { NavLink } from 'react-router-dom';
import { BookOpen, Home, Book, Users, Award, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Bible Tools', path: '/bible', icon: <Book size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Sertifikasiku', path: '/my-certifications', icon: <Award size={20} /> },
    { name: 'Volunteer', path: '/volunteer', icon: <FileText size={20} /> }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header flex items-center">
        <div className="logo-icon" style={{ backgroundColor: 'transparent', padding: 0 }}>
          <img src="/logo-light.png" alt="Kampus Alkitab Logo" style={{ height: '32px' }} />
        </div>
        <h2 className="logo-text">Kampus Alkitab</h2>
      </div>

      <nav className="sidebar-nav flex flex-col">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item flex items-center ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="spiritual-level card">
          <p className="level-title">Spiritual Growth</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${user?.progress || 0}%` }}></div>
          </div>
          <p className="level-text">{user?.level || 'Level 1: Seeker'}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
