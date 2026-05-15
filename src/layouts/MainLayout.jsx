import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout flex flex-col min-h-screen">
      <Navbar />
      <main className="content-area container w-full flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
};

export default MainLayout;
