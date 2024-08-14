import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../fuelTypeSlice";

export const startLoadingFuelTypes = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/fuel-type');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando los tipos de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingFuelType = (fuelType) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/fuel-type', fuelType);
      const { ok, msg, id } = result.data;
      if (ok) {
        dispatch(onAddNewData({id, ...fuelType}));
        Swal.fire('Éxito', msg || 'Tipo de combustible creado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al crear el tipo de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error creando el tipo de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingFuelType = (fuelType) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/fuel-type/${fuelType.id}`, fuelType);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(fuelType));
        Swal.fire('Éxito', msg || 'Tipo de combustible actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar el tipo de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar el tipo de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingFuelType = (fuelType) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/fuel-type/${fuelType.id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Éxito', msg || 'Tipo de combustible eliminado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar el tipo de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el tipo de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};
