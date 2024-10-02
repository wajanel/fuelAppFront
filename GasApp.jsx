import React from 'react'
import { store } from './src/store'
import { AppRouter } from './src/router/AppRouter'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { changeLanguage } from './src/helpers/loadTranslations';

export const GasApp = () => {

  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
        const loadInitialTranslations = async () => {
            const savedLanguage = localStorage.getItem('language') || 'es';
            await changeLanguage(savedLanguage);
            setLoading(false);  // Desbloquea el renderizado tras cargar las traducciones
        };
        
        loadInitialTranslations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Muestra un loader mientras se cargan las traducciones
    }

  return (
    <Provider store={store}>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}
