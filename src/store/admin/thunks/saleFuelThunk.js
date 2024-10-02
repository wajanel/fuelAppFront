import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onDeleteData, onErrorMessage, onLoadingData, onResetData, onUpdateData, setLoading } from "../saleFuelSlice";

export const startLoadingSaleFuels = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/sale-fuel/listadocompleto');
      const { ok, listado} = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando las ventas de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingSaleFuel = (saleFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const validate = await backendApi.post('/closing/locate', saleFuel);
      const { ok:validateok } = validate.data;

      if (!validateok){
        console.log('Cierre ya realizado, no se pueden agregar ventas');
        dispatch(onErrorMessage('Cierre ya realizado, no se pueden agregar ventas'));
        dispatch(closeLoading());
        return;
      }

      const result = await backendApi.post('/sale-fuel', saleFuel);
      const { ok, msg } = result.data;
      if (ok) {
        //dispatch(onAddNewData({ id, ...saleFuel }));
        dispatch(onResetData());
        Swal.fire('Éxito', msg || 'La venta de combustible se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar la venta de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar la venta de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingSaleFuel = (saleFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/sale-fuel/${saleFuel.id}`, saleFuel);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(saleFuel));
        Swal.fire('Éxito', msg || 'La venta de combustible se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar la venta de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar la venta de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingSaleFuel = (saleFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/sale-fuel/${saleFuel.id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Success', msg || 'El registro de venta de combustible ha sido eliminado con éxito', 'success');
      } else {
        Swal.fire('Éxito', msg || 'Error al eliminar el registro de venta de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el registro de venta de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};
