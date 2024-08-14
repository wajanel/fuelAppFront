import { createCommonSlice } from "../../helpers/createCommonSlice";

export const saleFuelSlice = createCommonSlice('sale_fuel');

export const {
  onActiveData,
  onAddNewData,
  onUpdateData,
  onLoadingData,
  onDeleteData,
  setLoading,
  closeLoading
} = saleFuelSlice.actions;
