import React from 'react';
import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/PumpComponent'
import FormComponent from '../components/PumpFormComponent'


export const PumpAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
