export const getEnvVariables = () => {
  
    console.log('Se cargan variables de entorno');
    
    return {
        ...import.meta.env
    }
}