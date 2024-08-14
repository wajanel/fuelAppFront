import { createCommonSlice } from "../../helpers/createCommonSlice";

export const lastFuelPriceSlice = createCommonSlice('last_fuel_price');

export const { onActiveData, onAddNewData, onUpdateData, onLoadingData, onDeleteData, setLoading, closeLoading, onResetData } = lastFuelPriceSlice.actions;
