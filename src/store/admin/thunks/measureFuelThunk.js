// src/store/admin/thunks/measureFuelThunk.js
import Swal from 'sweetalert2';
import { backendApi } from '../../../api/backendApi';
import {
  setLoading,
  onActiveData,
  onAddNewData,
  onUpdateData,
  onLoadingData,
  onDeleteData,
  closeLoading
} from '../measureFuelSlice';

export const startLoadingMeasureFuels = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/measure-fuel');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al cargar medidas de combustible', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startSavingMeasureFuel = (measureFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/measure-fuel', measureFuel);
      const { ok, msg, id } = result.data;
      if (ok) {
        Swal.fire('Éxito', msg || 'Medida de combustible creada exitosamente', 'success');
        dispatch(onAddNewData({id, ...measureFuel}));
      } else {
        Swal.fire('Error', msg || 'Error al crear medida de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al crear medida de combustible', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startUpdatingMeasureFuel = (measureFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/measure-fuel/${measureFuel.id}`, measureFuel);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(measureFuel));
        Swal.fire('Éxito', msg || 'Medida de combustible actualizada exitosamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar medida de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar medida de combustible', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startDeletingMeasureFuel = (id) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/measure-fuel/${id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Éxito', msg || 'Medida de combustible eliminada exitosamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar medida de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar medida de combustible', 'error');
    }
    dispatch(closeLoading());
  }
};
