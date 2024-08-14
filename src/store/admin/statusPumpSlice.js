import { createCommonSlice } from "../../helpers/createCommonSlice";

export const statusPumpSlice = createCommonSlice('status_pump');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = statusPumpSlice.actions;