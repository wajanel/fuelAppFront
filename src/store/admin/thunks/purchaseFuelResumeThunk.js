import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../purchaseFuelResumeSlice";

export const startLoadingPurchaseFuelResumes = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/purchase-fuel-resume');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando los resúmenes de compra de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingPurchaseFuelResume = (purchaseFuelResume) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/purchase-fuel-resume', purchaseFuelResume);
      const { ok, msg, id } = result.data;
      if (ok) {
        dispatch(onAddNewData({ id, ...purchaseFuelResume }));
        Swal.fire('Éxito', msg || 'El resumen de compra de combustible se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar el resumen de compra de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar el resumen de compra de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingPurchaseFuelResume = (purchaseFuelResume) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/purchase-fuel-resume/${purchaseFuelResume.id}`, purchaseFuelResume);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(purchaseFuelResume));
        Swal.fire('Éxito', msg || 'El resumen de compra de combustible se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar el resumen de compra de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar el resumen de compra de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingPurchaseFuelResume = (id) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/purchase-fuel-resume/${id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData(id));
        dispatch(onActiveData(null));
        Swal.fire('Success', msg || 'El resumen de compra de combustible ha sido eliminado con éxito', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al eliminar el resumen de compra de combustible', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el resumen de compra de combustible', 'error');
    }
    dispatch(closeLoading());
  };
};
