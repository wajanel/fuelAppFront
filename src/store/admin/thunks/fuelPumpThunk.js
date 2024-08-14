// store/thunks/fuelPumpThunk.js
import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../fuelPumpSlice";

export const startLoadingFuelPumps = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/fuel-pump');
      const { ok, listado } = response.data;
      console.log({listado});
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando las bombas de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingFuelPump = (fuelPump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      console.log('startSaving');
      console.log(fuelPump);
      const result = await backendApi.post('/fuel-pump', fuelPump);
      const { ok, msg, } = result.data;
      if (ok) {
        dispatch(onAddNewData(fuelPump));
        Swal.fire('Éxito', msg || 'La bomba de combustible se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar la bomba de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar la bomba de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingFuelPump = (fuelPump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
        console.log(fuelPump);
      const result = await backendApi.put(`/fuel-pump/${fuelPump.id_fuel_type}/${fuelPump.id_pump}`, fuelPump);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(fuelPump));
        Swal.fire('Éxito', msg || 'La bomba de combustible se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar la bomba de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar la bomba de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingFuelPump = (fuelPump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/fuel-pump/${fuelPump.id_fuel_type}/${fuelPump.id_pump}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Success', msg || 'El registro de la bomba de combustible ha sido eliminado con éxito', 'success');
      } else {
        Swal.fire('Éxito', msg || 'Error al eliminar el registro de la bomba de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el registro de la bomba de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};
