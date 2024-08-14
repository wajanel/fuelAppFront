import { createCommonSlice } from "../../helpers/createCommonSlice";

export const usersSlice = createCommonSlice('users');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = usersSlice.actions;