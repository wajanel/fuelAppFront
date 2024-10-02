import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";

export const startDailyClosing = (data)=>{
    return async () => {
        try {
            const response = await backendApi.post('/closing/daily', data);
            const {ok, msg} = response.data;

            console.log(response.data);
            if( ok ){
                Swal.fire('Cierre Diario', 'Cierre diario realizado exitosamente', 'success' );
            } else {
                Swal.fire('Cierre Diario', msg || 'Cierre diario NO realizado', 'error' );
            }
        } catch (error) {
            console.log( error );
            console.log(error.response?.data.msg);
            Swal.fire('Cierre Diario', error.response?.data.msg || 'Error al realizar cierre diario', 'error' )
        }
    }
}

