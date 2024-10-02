import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../../src/store/ui/uiSlice"


const getMockStore = (initialState)=>{

    return configureStore({
        reducer:{
            ui:uiSlice.reducer
        },
        preloadedState:{
            ui: {...initialState}
        }
    })
}

describe('pruebas sobre el archivo useUiStore', () => {

    test('debe devolver el estado inicial del Hook', () => {

        const mockStore = getMockStore({isOpenModalBranch: false,
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
            isOpenModalUpdateSaleFuel:false})

        
        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        console.log(result.current);
        

        expect(result.current).toEqual({
            isOpenModalBranch: false,
            isOpenModalFuelPrice: false,
            isOpenModalFuelPump: false,
            isOpenModalFuelType: false,
            isOpenModalIncome: false,
            isOpenModalIncomeType: false,
            isOpenModalMeasureFuel: false,
            isOpenModalProvider: false,
            isOpenModalPump: false,
            isOpenModalPurchaseFuel: false,
            isOpenModalPurchaseFuelResume: false,
            isOpenModalSaleFuel: false,
            isOpenModalUpdateSaleFuel: false,
            isOpenModalUser: false,
            openModalBranch: expect.any(Function),
            closeModalBranch: expect.any(Function),
            openModalUser: expect.any(Function),
            closeModalUser: expect.any(Function),
            openModalIncomeType: expect.any(Function),
            closeModalIncomeType: expect.any(Function),
            openModalIncome: expect.any(Function),
            closeModalIncome: expect.any(Function),
            openModalProvider: expect.any(Function),
            closeModalProvider: expect.any(Function),
            openModalMeasureFuel: expect.any(Function),
            closeModalMeasureFuel: expect.any(Function),
            openModalFuelType: expect.any(Function),
            closeModalFuelType: expect.any(Function),
            openModalPurchaseFuel: expect.any(Function),
            closeModalPurchaseFuel: expect.any(Function),
            openModalPurchaseFuelResume: expect.any(Function),
            closeModalPurchaseFuelResume: expect.any(Function),
            openModalPump: expect.any(Function),
            closeModalPump: expect.any(Function),
            openModalFuelPump: expect.any(Function),
            closeModalFuelPump: expect.any(Function),
            openModalFuelPrice: expect.any(Function),
            closeModalFuelPrice: expect.any(Function),
            openModalSaleFuel: expect.any(Function),
            closeModalSaleFuel: expect.any(Function),
            openModalUpdateSaleFuel: expect.any(Function),
            closeModalUpdateSaleFuel: expect.any(Function),
        })
        
    });

    
    test('debe activar la bandera isDateModalOpen cuando se invoque la función openModalState', () => { 

        const mockStore = getMockStore({isOpenModalBranch: false})

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openModalBranch } = result.current;

        act(()=> openModalBranch());

        expect(result.current.isOpenModalBranch).toBeTruthy();
        
     });

     
     test('debe cerrarse el modal al invocar el closeModalDate', () => {
        const mockStore = getMockStore({isOpenModalBranch:true});

        const { result } = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const { closeModalBranch } = result.current;

        act(()=> closeModalBranch());

        expect(result.current.isOpenModalBranch).toBeFalsy();
        
     })
})