// store/thunks/fuelPriceThunk.js
import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../fuelPriceSlice";

export const startLoadingFuelPrices = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/fuel-price');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando los precios del combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingFuelPrice = (fuelPrice) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/fuel-price', fuelPrice);
      const { ok, msg, id } = result.data;
      if (ok) {
        dispatch(onAddNewData({ id, ...fuelPrice }));
        Swal.fire('Éxito', msg || 'El precio del combustible se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar el precio del combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar el precio del combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingFuelPrice = (fuelPrice) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/fuel-price/${fuelPrice.id}`, fuelPrice);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(fuelPrice));
        Swal.fire('Éxito', msg || 'El precio del combustible se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar el precio del combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar el precio del combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingFuelPrice = (fuelPrice) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/fuel-price/${fuelPrice.id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Éxito', msg || 'El precio del combustible se ha eliminado con éxito', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar el precio del combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el precio del combustible', 'error');
    }
    dispatch(closeLoading());
  };
};
