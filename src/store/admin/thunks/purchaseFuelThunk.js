import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../purchaseFuelSlice";

export const startLoadingPurchaseFuels = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await backendApi.get('/purchase-fuel');
      const { ok, listado } = response.data;
      if (ok) {
        dispatch(onLoadingData(listado));
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error cargando las compras de gasolina', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startSavingPurchaseFuel = (purchaseFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.post('/purchase-fuel', purchaseFuel);
      const { ok, msg, id } = result.data;
      if (ok) {
        dispatch(onAddNewData({id, ...purchaseFuel}));
        Swal.fire('Éxito', msg || 'La compra de gasolina se ha registrado', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al registrar la compra de gasolina', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al registrar la compra de gasolina', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startUpdatingPurchaseFuel = (purchaseFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.put(`/purchase-fuel/${purchaseFuel.id}`, purchaseFuel);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onUpdateData(purchaseFuel));
        Swal.fire('Éxito', msg || 'La compra de gasolina se ha actualizado correctamente', 'success');
      } else {
        Swal.fire('Error', msg || 'Error al actualizar la compra de gasolina', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al actualizar la compra de gasolina', 'error');
    }
    dispatch(closeLoading());
  };
};

export const startDeletingPurchaseFuel = (purchaseFuel) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const result = await backendApi.delete(`/purchase-fuel/${purchaseFuel.id}`);
      const { ok, msg } = result.data;
      if (ok) {
        dispatch(onDeleteData());
        dispatch(onActiveData(null));
        Swal.fire('Success', msg || 'El registro de compra de gasolina ha sido eliminado con éxito', 'success');
      } else {
        Swal.fire('Éxito', msg || 'Error al eliminar el registro de compra de gasolina', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response?.data.msg || 'Error al eliminar el registro de compra de gasolina', 'error');
    }
    dispatch(closeLoading());
  };
};
