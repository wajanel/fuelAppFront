import { backendApi } from '../../src/api/backendApi';

describe('Pruebas sobre backendApi', () => {

    test('debe tener la configuración por defecto', () => { 
        const { VITE_URL_BACKEND } = process.env;

        expect(backendApi.defaults.baseURL).toBe(VITE_URL_BACKEND);
    });
});
