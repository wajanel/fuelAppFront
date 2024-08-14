import { createCommonSlice } from "../../helpers/createCommonSlice";

export const fuelTypeSlice = createCommonSlice('fuel_type');

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading } = fuelTypeSlice.actions;