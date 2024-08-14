import { createCommonSlice } from "../../helpers/createCommonSlice";

export const providerSlice = createCommonSlice('provider');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = providerSlice.actions;