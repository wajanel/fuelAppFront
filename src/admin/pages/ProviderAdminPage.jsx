import React from 'react';
import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/ProviderComponent'
import FormComponent from '../components/ProviderFormComponent'


export const ProviderAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
