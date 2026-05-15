import { Outlet } from 'react-router-dom';
import './CoursePlayerLayout.css';

const CoursePlayerLayout = () => {
  return (
    <div className="cp-layout">
      <Outlet />
    </div>
  );
};

export default CoursePlayerLayout;
