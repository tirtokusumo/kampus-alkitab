import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Wraps child content in a smooth fade + slide-up animation
 * that plays whenever the route (location.pathname) changes.
 */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.28,
};

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
