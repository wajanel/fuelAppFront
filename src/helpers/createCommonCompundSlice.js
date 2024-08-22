import { createSlice } from '@reduxjs/toolkit';

export const createCommonCompundSlice = (name, initData = [], keys = ['id']) => {
  return createSlice({
    name,
    initialState: {
      isLoading: true,
      data: initData,
      activeData: null,
      errorMsg: null,
    },
    reducers: {
      setLoading: (state) => {
        state.isLoading = true;
      },
      onActiveData: (state, { payload }) => {
        state.activeData = payload;
      },
      onAddNewData: (state, { payload }) => {
        state.data.push(payload);
        state.activeData = null;
      },
      onUpdateData: (state, { payload }) => {
        state.data = state.data.map((d) => {
          const matches = keys.every(key => d[key] === payload[key]);
          if (matches) return payload;
          return d;
        });
      },
      onLoadingData: (state, { payload = [] }) => {
        console.log(payload.length);
        state.isLoading = false;
        payload.forEach((d) => {
          const exists = state.data.some((dbdata) => {
            return keys.every(key => dbdata[key] === d[key]);
          });
          if (!exists) state.data.push(d);
        });
      },
      onDeleteData: (state) => {
        state.data = state.data.filter((d) => {
          return !keys.every(key => d[key] === state.activeData[key]);
        });
        state.activeData = null;
      },
      closeLoading: (state) => {
        state.isLoading = false;
      },
      onResetData: (state) => {
        state.data = []
      },
    },
  });
};
