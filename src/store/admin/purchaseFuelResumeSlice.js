import { createCommonSlice } from '../../helpers/createCommonSlice';

export const purchaseFuelResumeSlice = createCommonSlice('purchaseFuelResume');
export const { setLoading, onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, closeLoading } = purchaseFuelResumeSlice.actions;
