import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../branchSlice"


export const startLoadingBranches = ()=>{
    return async (dispatch, getState) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/branch')
            const {ok, listado} = response.data;
            if( ok ){
                dispatch(onLoadingData(listado))
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Agregar sucursales', error.response?.data.msg || 'Error agregación', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

export const startUpdatingBranches = (branch)=>{
    return async(dispatch, getState) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.put(`/branch/${branch.id}`, branch);
            const { ok, msg} = result.data
            if( ok ){
                dispatch(onUpdateData(branch))
                Swal.fire('Actualización de Sucursales', msg || 'Error actualizacion', 'success' )
            } else {
                Swal.fire('Actualización de Sucursales', msg || 'Error actualizacion', 'error' )
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Actualización de Sucursales', error.response?.data.msg || 'Error actualizacion', 'error' )
        }
        
        dispatch(closeLoading());
    }
}

export const startDeletingBranch = (branch) =>{
    return async (dispatch, getState) => {
        dispatch(setLoading());

        try {
            const result = await backendApi.delete(`/branch/${branch.id}`, branch);
            const {ok, msg} = result.data;

            if (ok) {
                dispatch(onDeleteData());
                dispatch(onActiveData(null));
                Swal.fire('Eliminación de sucursales', msg || 'Eliminación exitosa', 'success')
            } else {
                Swal.fire('Eliminación de sucursales', msg || 'Error eliminación', 'error' )
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Eliminación de sucursales', error.response?.data.msg || 'Error eliminación', 'error' )
        }

        dispatch(closeLoading())
    }
}

export const startSavingBranches = (branch)=>{
    return async(dispatch) =>{
        dispatch(setLoading());

        try {
            const result = await backendApi.post('/branch', branch);
            const {ok, msg, id} = await result.data;

            if (ok) {
                Swal.fire('Creación de sucursal', msg || 'Creación exitosa', 'success')
                dispatch(onAddNewData({id, ...branch}))
            } else {
                Swal.fire('Creación de sucursal', msg || 'Error creación de sucursal', 'error' )
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Creación de sucursal', error.response?.data.msg || 'Error creación', 'error' )
        }

        dispatch(closeLoading())
    }
}

