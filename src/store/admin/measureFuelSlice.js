import { createCommonSlice } from "../../helpers/createCommonSlice";

export const measureFuelSlice = createCommonSlice('measure_fuel');

export const {onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading} = measureFuelSlice.actions;