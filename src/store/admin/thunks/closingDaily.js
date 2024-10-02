import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onLoadingData, setLoading } from "../dailyClosingSlice"


export const startLoadingDailyClosing = ()=>{
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/closing')
            const {ok, result} = response.data;
            console.log(result);
            if (ok) {
                const formattedResult = result.map(item => ({
                    ...item,
                    date_process: new Date(item.date_process).toISOString().split('T')[0] // Solo la parte de la fecha
                }));
                dispatch(onLoadingData(formattedResult));
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Carga de cierres diarios', error.response?.data.msg || 'Error cargar cierres diarios', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

