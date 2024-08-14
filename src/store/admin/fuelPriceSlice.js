import { createCommonSlice } from "../../helpers/createCommonSlice";

export const fuelPriceSlice = createCommonSlice('fuel_price');

export const {
  onActiveData,
  onAddNewData,
  onUpdateData,
  onLoadingData,
  onDeleteData,
  setLoading,
  closeLoading
} = fuelPriceSlice.actions;