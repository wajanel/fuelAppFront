import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../incomeTypeSlice";

export const startLoadingIncomeTypes = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/income-type');
            const { ok, listado } = response.data;
            if (ok) {
                dispatch(onLoadingData(listado));
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Cargar tipos de ingresos', error.response?.data.msg || 'Error al cargar', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startSavingIncomeType = (incomeType) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.post('/income-type', incomeType);
            const { ok, msg } = result.data;
            if (ok) {
                dispatch(onAddNewData(incomeType));
                Swal.fire('Creación de tipo de ingreso', msg || 'Creación exitosa', 'success');
            } else {
                Swal.fire('Creación de tipo de ingreso', msg || 'Error en la creación', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Creación de tipo de ingreso', error.response?.data.msg || 'Error en la creación', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startUpdatingIncomeType = (incomeType) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.put(`/income-type/${incomeType.id}`, incomeType);
            const { ok, msg } = result.data;
            if (ok) {
                dispatch(onUpdateData(incomeType));
                Swal.fire('Actualización de tipo de ingreso', msg || 'Actualización exitosa', 'success');
            } else {
                Swal.fire('Actualización de tipo de ingreso', msg || 'Error en la actualización', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Actualización de tipo de ingreso', error.response?.data.msg || 'Error en la actualización', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startDeletingIncomeType = (incomeType) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.delete(`/income-type/${incomeType.id}`);
            const { ok, msg } = result.data;
            if (ok) {
                dispatch(onDeleteData());
                dispatch(onActiveData(null));
                Swal.fire('Eliminación de tipo de ingreso', msg || 'Eliminación exitosa', 'success');
            } else {
                Swal.fire('Eliminación de tipo de ingreso', msg || 'Error en la eliminación', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Eliminación de tipo de ingreso', error.response?.data.msg || 'Error en la eliminación', 'error');
        }
        dispatch(closeLoading());
    };
};
