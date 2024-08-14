import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onLoadingData, setLoading } from "../statusPumpSlice"


export const startLoadingStatusPump = ()=>{
    return async (dispatch, getState) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/pump/status/pump')
            const {ok, result} = response.data;
            if( ok ){
                dispatch(onLoadingData(result))
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Cargar Estados de Bombas', error.response?.data.msg || 'Error cargar estados de bombas', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

