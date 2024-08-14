import { createSlice } from '@reduxjs/toolkit';

export const createCommonSlice = (name, initData = []) => {
  return createSlice({
    name,
    initialState: {
      isLoading: true,
      data: initData,
      activeData: null,
      errorMsg:null
    },
    reducers: {
      setLoading: (state) =>{
        state.isLoading = true;
      },
      onActiveData: (state, { payload }) => {
        state.activeData = payload;
      },
      onAddNewData: (state, { payload }) => {
        console.log('onAddNewData');
        state.data.push(payload);
        state.activeData = null;
      },
      onUpdateData: (state, { payload }) => {
        state.data = state.data.map((d) => {
          if (d.id === payload.id) return payload;
          return d;
        });
      },
      onLoadingData: (state, { payload = [] }) => {
        console.log('OnLoadingData', payload);
        
        state.isLoading = false;
        payload.forEach((d) => {
          const exists = state.data.some((dbdata) => dbdata.id === d.id);
          if (!exists) state.data.push(d);
        });
      },
      onDeleteData: (state) => {
        state.data = state.data.filter((d) => d.id !== state.activeData.id);
        state.activeData = null;
      },
      closeLoading: (state) =>{
        state.isLoading = false;
      },
      onResetData: (state) => {
        state.data = []
      }
    },
  });
};
