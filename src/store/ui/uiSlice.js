import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isOpenModalBranch: false,
    isOpenModalUser:false,
    isOpenModalIncomeType:false,
    isOpenModalIncome:false,
    isOpenModalProvider:false,
    isOpenModalMeasureFuel:false,
    isOpenModalFuelType: false,
    isOpenModalPurchaseFuel: false,
    isOpenModalPurchaseFuelResume: false,
    isOpenModalPump: false,
    isOpenModalFuelPump: false,
    isOpenModalFuelPrice: false,
    isOpenModalSaleFuel: false,
    isOpenModalUpdateSaleFuel:false
  },
  reducers: {
    onOpenModalBranch: (state, {payload = false}) => {
      state.isOpenModalBranch = payload;
    },
    onOpenModalUser: (state, {payload = false}) => {
      state.isOpenModalUser = payload;
    },
    onOpenModalIncomeType: (state, {payload = false}) => {
      state.isOpenModalIncomeType = payload;
    },
    onOpenModalIncome: (state, {payload = false}) => {
      state.isOpenModalIncome = payload;
    },
    onOpenModalProvider: (state, {payload = false}) => {
      state.isOpenModalProvider = payload;
    },
    onOpenModalMeasureFuel: (state, {payload = false}) => {
      state.isOpenModalMeasureFuel = payload;
    },
    onOpenModalFuelType: (state, {payload = false}) => {
      state.isOpenModalFuelType = payload;
    },
    onOpenModalPurchaseFuel: (state, {payload = false}) => {
      state.isOpenModalPurchaseFuel = payload;
    },
    onOpenModalPurchaseFuelResume: (state, {payload = false}) => {
      state.isOpenModalPurchaseFuelResume = payload;
    },
    onOpenModalPump: (state, { payload = false }) => {
      state.isOpenModalPump = payload;
    },
    onOpenModalFuelPump: (state, { payload = false }) => {
      state.isOpenModalFuelPump = payload;
    },
    onOpenModalFuelPrice: (state, { payload = false }) => {
      state.isOpenModalFuelPrice = payload;
    },
    onOpenModalSaleFuel: (state, {payload = false}) => {
      state.isOpenModalSaleFuel = payload;
    },
    onOpenModalUpdateSaleFuel : (state, {payload = false}) => {
      state.isOpenModalUpdateSaleFuel = payload
    }
  },
});

export const { onOpenModalBranch, onOpenModalUser, onOpenModalIncomeType, onOpenModalIncome, onOpenModalProvider,
  onOpenModalMeasureFuel, onOpenModalFuelType, onOpenModalPurchaseFuel, onOpenModalPurchaseFuelResume, onOpenModalPump, onOpenModalFuelPump,
  onOpenModalFuelPrice, onOpenModalSaleFuel, onOpenModalUpdateSaleFuel
 } = uiSlice.actions;
