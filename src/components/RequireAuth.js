import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './../Hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.username ? (
    <Outlet />
  ) : (
    <>
      {alert('please login')}
      <Navigate to='/' state={{ from: location }} replace />
    </>
  );
};

export default RequireAuth;
