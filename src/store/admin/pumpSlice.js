import { createCommonSlice } from "../../helpers/createCommonSlice";

export const pumpSlice = createCommonSlice('pump');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading, onResetData} = pumpSlice.actions;
