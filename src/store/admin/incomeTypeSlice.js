import { createCommonSlice } from "../../helpers/createCommonSlice";

export const incomeTypeSlice = createCommonSlice('income_type');

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading } = incomeTypeSlice.actions;
