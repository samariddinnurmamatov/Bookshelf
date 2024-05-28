import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { TOKEN } from '../../constants/app.constant';

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("key");
    const isSignInOrSignUpPage = ['/sign-in', '/'].includes(location.pathname);
    if (!token && !isSignInOrSignUpPage) {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;