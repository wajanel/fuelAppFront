import { createCommonSlice } from "../../helpers/createCommonSlice";

export const incomeSlice = createCommonSlice('income');

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading } = incomeSlice.actions;
