import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onLoadingData, setLoading } from "../statusBranchSlice"


export const startLoadingStatusBranches = ()=>{
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/branch/statusbranch')
            const {ok, result} = response.data;
            if( ok ){
                dispatch(onLoadingData(result))
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Cargar estados sucursales', error.response?.data.msg || 'Error cargar estados sucursales', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

