import React from 'react';
import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/FuelPriceComponent'
import FormComponent from '../components/FuelPriceFormComponent'


export const FuelPriceAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
