import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicRoute = () => {
  const { status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === 'authorized') {
    console.log({public:location});
    console.log(`esta autorizado ubicación ${location.state?.from?.pathname}`);
    return <Navigate to={location.state?.from?.pathname || '/'} />;
  }

  return <Outlet />;
};
