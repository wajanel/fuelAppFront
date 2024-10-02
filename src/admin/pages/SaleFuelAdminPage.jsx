import React from 'react';
import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/SaleFuelComponent'
import FormComponent from '../components/SaleFuelFormComponent'

export const SaleFuelAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
