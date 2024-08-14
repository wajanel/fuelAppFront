import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading, onResetData } from "../pumpSlice";

export const startLoadingPumps = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/pump');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando las bombas', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startLoadingPumpsPerId = (id_branch) => {
  return async (dispatch) => {
    dispatch(setLoading());
    dispatch(onResetData());
    if (id_branch === '') {
      dispatch(closeLoading());
      return;
    }
    try {
      const response = await backendApi.get(`/pump/${id_branch}`);
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando las bombas', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingPump = (pump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/pump', pump);
      const { ok, msg, id } = result.data;
      if (ok) {
        dispatch(onAddNewData({id, ...pump}));
        Swal.fire('Éxito', msg || 'La bomba se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar la bomba', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar la bomba', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingPump = (pump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/pump/${pump.id}`, pump);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(pump));
        Swal.fire('Éxito', msg || 'La bomba se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar la bomba', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar la bomba', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingPump = (pump) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/pump/${pump.id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Success', msg || 'La bomba ha sido eliminada con éxito', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar la bomba', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar la bomba', 'error');
    }
    dispatch(closeLoading());
  };
};
