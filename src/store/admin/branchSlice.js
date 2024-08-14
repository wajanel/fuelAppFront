import { createCommonSlice } from "../../helpers/createCommonSlice";

export const branchSlice = createCommonSlice('branch');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = branchSlice.actions;