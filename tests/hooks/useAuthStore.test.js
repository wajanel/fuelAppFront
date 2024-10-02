import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { authenticatedState, notAuthenticatedState } from "../fixtures/authStates";
import { backendApi } from "../../src/api/backendApi";

const getMockStore = ( initialState) =>{
    return configureStore({
        reducer:{
            auth:authSlice.reducer
        },
        preloadedState:{
            auth: {...initialState}
        }
    })
};

describe('pruebas sobre el archivo useAuthStore', () => {

    beforeEach( ()=> localStorage.clear());

    test('debe devolver el estado inicial del Hook', () => {

        const mockStore = getMockStore({ status: 'no-authenticated',
                                        user: {},
                                        errorMessage:undefined})
        const { result } = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            status: 'no-authenticated',
            user: {},
            errorMessage:undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function) 
        });
    });

    test('debería hacer el login', async () => {
        const storeMock = getMockStore({...notAuthenticatedState});

        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({children})=> <Provider store={storeMock}>{children}</Provider>
        });

        const spy = jest.spyOn(backendApi, 'post').mockReturnValue({
            data:{
                ok:true,
                uid:'12345',
                name:'Walter',
                token:'MiToken',
                role:'admin'
            }
        })

        await act( async()=>  
                await result.current.startLogin({email:'wilson@gmail.com', password:'1234567'}));

        expect(result.current).toEqual({
            status: 'authorized',
            user: {
                name: 'Walter',
                uid: '12345',
                role: 'admin'
            },
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        });

        expect(localStorage.getItem('token')).not.toBeNull();
        expect(localStorage.getItem('token-init-time')).toEqual(expect.any(String))

        spy.mockRestore();
    });

    test('debería fallar el login con mensaje de error', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider> 
        });

        const spy = jest.spyOn(backendApi, 'post').mockRejectedValueOnce(new Error('Fallo la autenticación'))

        await act( async ()=> await result.current.startLogin({email:'wilson@gmail.com', password:'123'}));

        expect(result.current.errorMessage).toBe('Fallo la autenticación');
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('token-init-time')).toBeNull();

        waitFor(()=>
            expect(result.current.errorMessage).toBeNull()
        );

        spy.mockRestore();
    });
    
    test('debería de crear el usuario', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const newUser = {name:'Walter', email:'wilson@gmail.com', password:'123', password2:'123'}; 
        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider> 
        });

        const spy = jest.spyOn(backendApi, 'post').mockReturnValue({
            data:{
                ok:true,
                uid:'12345',
                name:'Walter',
                token:'MiToken'
            }
        })

        await act( async ()=> await result.current.startRegister(newUser));

        const{ errorMessage, status, user} = result.current;
        expect({ errorMessage, status, user}).toEqual({
            status: 'no-authenticated',
            user: {  },
            errorMessage: undefined
        })

        spy.mockRestore();

    });

    
    test('debería fallar la creación del usuario', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const newUser = {name:'Walter', email:'walter@gmail.com', password:'1234567', password2:'1234567'}; 
        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider> 
        });

        const errorResponse = {
            response: {
                data: {
                    msg: 'Correo ya existe',
                },
            },
        };

        const spy = jest.spyOn(backendApi, 'post').mockRejectedValueOnce(errorResponse);
       
        await act( async ()=> await result.current.startRegister(newUser));

        const{ errorMessage, status, user} = result.current;

        console.log({ errorMessage, status, user});

        expect(errorMessage).toBe('Correo ya existe')

        spy.mockRestore();
        
    });

    
    test('debe hacer logout si no se encuentra el token', async() => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const { result } = renderHook( ()=> useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act( async()=> await result.current.checkAuthToken());

        const { status, user, errorMessage} = result.current;

        expect({ status, user, errorMessage}).toEqual({
            status: 'no-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('debe validar correctamente el token', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const { result } = renderHook(()=>useAuthStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider>
        });

        localStorage.setItem('token', 'MiToken' );

        const spy = jest.spyOn(backendApi, 'get').mockReturnValue({
            data:{
                ok:true,
                uid:'12345',
                name:'Walter',
                token:'MiToken',
                role:'admin'
            }
        });

        await act(async()=> await result.current.checkAuthToken());

        const { status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'authorized',
            user: { name: 'Walter', uid: '12345', role: 'admin' },
            errorMessage: undefined
        })

        spy.mockReset();
    })
});