import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onAddNewData, onLoadingData, onUpdateData, setLoading } from "../userSlice"


export const startLoadingUsers = ()=>{
    return async (dispatch, getState) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/auth/users')
            const {ok, result} = response.data;
            if( ok ){
                dispatch(onLoadingData(result))
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Agregar sucursales', error.response?.data.msg || 'Error agregación', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

export const startUpdatingUsers = (user)=>{
    return async(dispatch, getState) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.put(`/auth/user/${user.id}`, user);
            const { ok, msg} = result.data
            if( ok ){
                dispatch(onUpdateData(user))
                Swal.fire('Actualización de usuario', msg || 'Error actualizacion', 'success' )
            } else {
                Swal.fire('Actualización de usuario', msg || 'Error actualizacion', 'error' )
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Actualización de usuario', error.response?.data.msg || 'Error actualizacion', 'error' )
        }
        
        dispatch(closeLoading());
    }
}

export const startSavingUsers = (user)=>{
    return async(dispatch) =>{
        dispatch(setLoading());

        try {
            const result = await backendApi.post('/auth/new', user);
            const {ok, msg} = result.data;

            if (ok) {
                Swal.fire('Creación de usuario', msg || 'Creación exitosa', 'success')
                dispatch(onAddNewData(user))
            } else {
                Swal.fire('Creación de usuario', msg || 'Error creación de usuario', 'error' )
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Creación de usuario', error.response?.data.msg || 'Error creación', 'error' )
        }

        dispatch(closeLoading())
    }
}

