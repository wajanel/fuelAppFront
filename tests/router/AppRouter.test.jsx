import { render, screen } from "@testing-library/react"
import { AppRouter } from "../../src/router/AppRouter"
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { MemoryRouter } from "react-router-dom";

jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: jest.fn()
  }));

jest.mock('../../src/hooks/useAuthStore');

/*jest.mock('../../src/gas/pages/HomePage', ()=>({ //return implicito
    HomePage: ()=> <h1>HomePage</h1>
    })
);*/



describe('pruebas sobre el componente AppRouter', () => {


    const mockCheckAuthToken = jest.fn();

    beforeEach(() => jest.clearAllMocks() );


    test('debe mostrar la leyenda de cargando y ejecutar el useEffect', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });


        render(<MemoryRouter>
            <AppRouter/>
            </MemoryRouter>
        );

        expect( screen.getByText('Cargando')).toBeTruthy();
    });

    
    test('Debe mostrar el login si no se esta autenticado', ()=> {
        
        useAuthStore.mockReturnValue({
            status: 'no-authenticated',
            user:{},
            checkAuthToken: mockCheckAuthToken
        });

        render(<MemoryRouter>
                <AppRouter/>
                </MemoryRouter>
        );

        expect(screen.getByText('msg_ingresar')).toBeTruthy();
    }
    );

    
    //Se hace mock de un Componente
    test('debe mostrar el calendario si se está logueado', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            user:{name:'Walter Ajanel', role:'admin'},
            checkAuthToken:mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        );

        expect(screen.getByText('Walter Ajanel (admin)')).toBeTruthy();
    });
    
})