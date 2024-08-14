import Swal from "sweetalert2";
import { backendApi } from "../../../api/backendApi";
import { closeLoading, onActiveData, onAddNewData, onDeleteData, onLoadingData, onUpdateData, setLoading } from "../incomeSlice";

export const startLoadingIncomes = () => {
    return async (dispatch, getState) => {
        dispatch(setLoading());
        try {
            const response = await backendApi.get('/income');
            const { ok, listado } = response.data;
            if (ok) {
                dispatch(onLoadingData(listado));
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Cargar ingresos', error.response?.data.msg || 'Error al cargar', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startSavingIncome = (income) => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            console.log('start saving income');
            const result = await backendApi.post('/income', income);
            const { ok, msg } = result.data;
            if (ok) {
                console.log('se agrega el income obtenido');
                dispatch(onAddNewData(income));
                Swal.fire('Creación de ingreso', msg || 'Creación exitosa', 'success');
            } else {
                Swal.fire('Creación de ingreso', msg || 'Error en la creación', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Creación de ingreso', error.response?.data.msg || 'Error en la creación', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startUpdatingIncome = (income) => {
    return async (dispatch, getState) => {
        console.log('start updating incomes');
        dispatch(setLoading());
        try {
            const result = await backendApi.put(`/income/${income.id}`, income);
            const { ok, msg } = result.data;
            if (ok) {
                console.log('se actualiza correctamente');
                dispatch(onUpdateData(income));
                Swal.fire('Actualización de ingreso', msg || 'Actualización exitosa', 'success');
            } else {
                Swal.fire('Actualización de ingreso', msg || 'Error en la actualización', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Actualización de ingreso', error.response?.data.msg || 'Error en la actualización', 'error');
        }
        dispatch(closeLoading());
    };
};

export const startDeletingIncome = (income) => {
    return async (dispatch, getState) => {
        dispatch(setLoading());
        try {
            const result = await backendApi.delete(`/income/${income.id}`);
            const { ok, msg } = result.data;
            if (ok) {
                dispatch(onDeleteData());
                dispatch(onActiveData(null));
                Swal.fire('Eliminación de ingreso', msg || 'Eliminación exitosa', 'success');
            } else {
                Swal.fire('Eliminación de ingreso', msg || 'Error en la eliminación', 'error');
            }
        } catch (error) {
            console.log(error);
            Swal.fire('Eliminación de ingreso', error.response?.data.msg || 'Error en la eliminación', 'error');
        }
        dispatch(closeLoading());
    };
};
