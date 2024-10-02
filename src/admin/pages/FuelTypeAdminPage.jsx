import React from 'react';
import { NavBarComp } from '../../gas/components/NavBarComp'
import FuelTypeComponent from '../components/FuelTypeComponent'
import FuelTypeFormComponent from '../components/FuelTypeFormComponent'


export const FuelTypeAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <FuelTypeComponent/>
      <FuelTypeFormComponent />
    </>
  )
}
