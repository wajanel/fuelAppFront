import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const PrivateRoute = ({roles = []}) => {
  
    const {status, user} =useSelector(state => state.auth);
    const location = useLocation();
    console.log({private: location});

    console.log({status});

    if (status !== 'authorized'){
        console.log('No autorizado');
        return <Navigate to='/login' state={{ from: location }} />;
    }

    if (!roles.includes(user.role)){
        console.log('No permitido');
        Swal.fire('Error acceso', 'No puede ver esta página', 'error');
        return <Navigate to='/' />;
    }
    console.log('outlet');
    return <Outlet />
}
