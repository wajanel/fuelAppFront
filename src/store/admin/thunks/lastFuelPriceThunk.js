import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onLoadingData, onResetData, setLoading } from "../lastFuelPrice"


export const startLoadingLastFuelPrices = (idPump, fuelTypeId)=>{
    return async (dispatch, getState) => {

        if (idPump ==='')
            return;

        dispatch(setLoading());
        dispatch(onResetData());
        try {
            const response = await backendApi.get(`/fuel-price/latest/${idPump}/${fuelTypeId}`)
            const {ok, results} = response.data;
            if( ok ){
                dispatch(onLoadingData(results))
                console.log(getState().latestFuelPrice)
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Cargar últimos precios', error.response?.data.msg || 'Error al cargar ultimos precios', 'error' )
        }
        
        dispatch(closeLoading())
    }
}

