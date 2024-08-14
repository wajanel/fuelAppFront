import { useDispatch, useSelector } from "react-redux"
import { onOpenModalBranch, onOpenModalUser, onOpenModalIncomeType, onOpenModalIncome, onOpenModalProvider, onOpenModalMeasureFuel, onOpenModalFuelType, onOpenModalPurchaseFuel, onOpenModalPurchaseFuelResume, onOpenModalPump, onOpenModalFuelPump, onOpenModalFuelPrice, onOpenModalSaleFuel } from "../store/ui/uiSlice";


export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isOpenModalBranch, isOpenModalUser, isOpenModalIncome, isOpenModalIncomeType, 
    isOpenModalProvider, isOpenModalMeasureFuel, isOpenModalFuelType, isOpenModalPurchaseFuel, isOpenModalPurchaseFuelResume,
    isOpenModalPump, isOpenModalFuelPump, isOpenModalFuelPrice, isOpenModalSaleFuel } = useSelector(state => state.ui);

  const openModalBranch = () =>{
    dispatch(onOpenModalBranch(true));
  }

  const closeModalBranch = () =>{
    dispatch(onOpenModalBranch(false));
  }

  const openModalUser = () =>{
    dispatch(onOpenModalUser(true));
  }

  const closeModalUser = () =>{
    dispatch(onOpenModalUser(false));
  }
   
  const openModalIncomeType = () =>{
    dispatch(onOpenModalIncomeType(true));
  }

  const closeModalIncomeType = () =>{
    dispatch(onOpenModalIncomeType(false));
  }
   
  const openModalIncome = () =>{
    dispatch(onOpenModalIncome(true));
  }

  const closeModalIncome = () =>{
    dispatch(onOpenModalIncome(false));
  }

  const openModalProvider = () =>{
    dispatch(onOpenModalProvider(true));
  }

  const closeModalProvider = () =>{
    dispatch(onOpenModalProvider(false));
  }

  const openModalMeasureFuel = () =>{
    dispatch(onOpenModalMeasureFuel(true));
  }

  const closeModalMeasureFuel = () =>{
    dispatch(onOpenModalMeasureFuel(false));
  }

  const openModalFuelType = () => {
    dispatch(onOpenModalFuelType(true));
  };

  const closeModalFuelType = () => {
    dispatch(onOpenModalFuelType(false));
  };

  const openModalPurchaseFuel = () => {
    dispatch(onOpenModalPurchaseFuel(true));
  };

  const closeModalPurchaseFuel = () => {
    dispatch(onOpenModalPurchaseFuel(false));
  };

  const openModalPurchaseFuelResume = () => {
    console.log('opne');
    dispatch(onOpenModalPurchaseFuelResume(true));
  };

  const closeModalPurchaseFuelResume = () => {
    console.log('close');
    dispatch(onOpenModalPurchaseFuelResume(false));
  };

  const openModalPump = () => {
    dispatch(onOpenModalPump(true));
  };

  const closeModalPump = () => {
    dispatch(onOpenModalPump(false));
  };

  const openModalFuelPump = () => {
    dispatch(onOpenModalPump(true));
  };

  const closeModalFuelPump = () => {
    dispatch(onOpenModalFuelPump(false));
  };

  const openModalFuelPrice = () => {
    dispatch(onOpenModalFuelPrice(true));
  };

  const closeModalFuelPrice = () => {
    dispatch(onOpenModalFuelPrice(false));
  };

  const openModalSaleFuel = () => {
    dispatch(onOpenModalSaleFuel(true));
  };

  const closeModalSaleFuel = () => {
    dispatch(onOpenModalSaleFuel(false));
  };

  return (
    {
        //variables
        isOpenModalBranch,
        isOpenModalUser,
        isOpenModalIncome,
        isOpenModalIncomeType,
        isOpenModalProvider,
        isOpenModalMeasureFuel,
        isOpenModalFuelType,
        isOpenModalPurchaseFuel,
        isOpenModalPurchaseFuelResume,
        isOpenModalPump,
        isOpenModalFuelPump,
        isOpenModalFuelPrice,
        isOpenModalSaleFuel,
        
        //acciones
        openModalBranch,
        closeModalBranch,
        openModalUser,
        closeModalUser,
        openModalIncomeType,
        closeModalIncomeType,
        openModalIncome,
        closeModalIncome,
        openModalProvider,
        closeModalProvider,
        openModalMeasureFuel,
        closeModalMeasureFuel,
        openModalFuelType,
        closeModalFuelType,
        openModalPurchaseFuel,
        closeModalPurchaseFuel,
        openModalPurchaseFuelResume,
        closeModalPurchaseFuelResume,
        openModalPump,
        closeModalPump,
        openModalFuelPump,
        closeModalFuelPump,
        openModalFuelPrice,
        closeModalFuelPrice,
        openModalSaleFuel,
        closeModalSaleFuel,
    }
  )
}
