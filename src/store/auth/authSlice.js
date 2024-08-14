import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  //nombre del slice con el que se vincula al store
  name: 'auth',
  //declaracion del estado inicial de las variables
  initialState: {
    status: 'no-authenticated',
    user: {},
    errorMessage:undefined
  },
  reducers: {
    onChecking: (state) => {
      console.log('onChecking');
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined
    },
    onLogin : (state, {payload}) =>{
      console.log('onLogin');
        state.status = 'authorized',
        state.user = payload;
        state.errorMessage = undefined
    },
    onLogout: (state, {payload}) =>{
      console.log('onLogout', payload);
      state.status= 'no-authenticated',
      state.user = {},
      state.errorMessage = payload
    },
    clearErrorMessage: (state) =>{
      state.errorMessage = undefined
    }
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;

