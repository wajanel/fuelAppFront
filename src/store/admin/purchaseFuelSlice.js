import { createCommonSlice } from "../../helpers/createCommonSlice";

export const purchaseFuelSlice = createCommonSlice('purchase_fuel');

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading } = purchaseFuelSlice.actions;