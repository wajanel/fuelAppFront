import { createCommonSlice } from "../../helpers/createCommonSlice";

export const dailyClosingSlice = createCommonSlice('dailyClosing');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = dailyClosingSlice.actions;