import { createCommonSlice } from "../../helpers/createCommonSlice";

export const statusBranchSlice = createCommonSlice('status_branch');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = statusBranchSlice.actions;