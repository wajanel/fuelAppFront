import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../providerSlice";

export const startLoadingProviders = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/provider');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al cargar proveedores', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startSavingProvider = (provider) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/provider', provider);
      const { ok, msg, id } = result.data;
      if (ok) {
        Swal.fire('Éxito', msg || 'Proveedor creado exitosamente', 'success');
        dispatch(onAddNewData({id, ...provider}));
      } else {
        Swal.fire('Error', msg || 'Error al crear proveedor', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al crear proveedor', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startUpdatingProvider = (provider) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/provider/${provider.id}`, provider);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(provider));
        Swal.fire('Éxito', msg || 'Proveedor actualizado exitosamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar proveedor', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar proveedor', 'error');
    }
    dispatch(closeLoading());
  }
};

export const startDeletingProvider = (id) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/provider/${id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData(id));
        dispatch(onActiveData(null));
        Swal.fire('Éxito', msg || 'Proveedor eliminado exitosamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar proveedor', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar proveedor', 'error');
    }
    dispatch(closeLoading());
  }
};
