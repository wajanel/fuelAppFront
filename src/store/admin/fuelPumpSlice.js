import { createCommonCompundSlice } from "../../helpers/createCommonCompundSlice";

export const fuelPumpSlice = createCommonCompundSlice('fuel_pump', [], ['id_fuel_type', 'id_pump']);

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading } = fuelPumpSlice.actions;
