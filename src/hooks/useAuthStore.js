import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { backendApi } from "../api/backendApi";
import Swal from 'sweetalert2';


export const useAuthStore = ()=>{
    const { status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async({userName, password})=>{
        
        dispatch(onChecking())
        try {
            console.log( {userName, password});
            const {data} = await backendApi.post('/auth/login', {userName, password})
            localStorage.setItem('token', data?.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(onLogin({name:data.name, uid:data.uid, role:data.role}));

        } catch (error) {
            console.log('startlogin', error);
            dispatch(onLogout('Fallo la autenticación'));
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 1000)
        }
    }

    const startRegister = async ({name, userName, password, password2, codEmpleado})=>{
        dispatch(onChecking());
        console.log({name, userName, password, password2, codEmpleado});
        try {
            const {data} = await backendApi.post('/auth/new', {name, user_name:userName, password,cod_employee:codEmpleado,status_id:2,role:'admin'});
            console.log(data);
            
            dispatch(onLogout())
            Swal.fire('Se creó la cuenta correctamente, comuniquese con el admin para ser activa')
            
        } catch (error) {
            console.log(error.response.data?.msg);
            dispatch(onLogout(error.response.data?.msg || 'Error al crear el usuario'));
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 1000)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        console.log( {token});
        if (!token) {
            console.log( 'no encontro token');
            return dispatch (onLogout())
        }

        try {
            console.log('antes de renovar token');
            const {data} = await backendApi.get('/auth/renew');
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-time', new Date().getTime());
            dispatch(onLogin({name:data.name, uid:data.uid, role:data.role}));
        } catch (error) {
            console.log( 'fallo al renovar token');
            localStorage.clear();
            dispatch(onLogout());
        }
    }
     
     const startLogout = () =>{
        const lng = localStorage.getItem('language') || 'es';
        localStorage.clear();
        localStorage.setItem('language', lng);
        dispatch (onLogout ());
     }


    return {
            //propiedades
            status,
            user,
            errorMessage,

            //acciones
            startLogin,
            startRegister,
            checkAuthToken,
            startLogout 
    }
}