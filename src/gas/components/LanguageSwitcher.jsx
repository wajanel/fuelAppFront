import React from 'react';
import { changeLanguage } from '../../helpers/loadTranslations';
import { Form } from 'react-bootstrap';  // Usaremos el componente Form de Bootstrap

const LanguageSwitcher = () => {
    const handleLanguageChange = async (event) => {
        const selectedLanguage = event.target.value;
        console.log('LanguageSwitcher Select value: ', selectedLanguage);
        await changeLanguage(selectedLanguage);
    };

    const savedLanguage = localStorage.getItem('language') || 'es';

    return (
        <Form.Select 
            onChange={handleLanguageChange} 
            defaultValue={savedLanguage}
            size="sm"  // Reduce el tamaño del select
            style={{ width: '150px', marginLeft: '10px' }}  // Ajusta el ancho y añade margen
        >
            <option value="en">English</option>
            <option value="es">Español</option>
        </Form.Select>
    );
};

export default LanguageSwitcher;
