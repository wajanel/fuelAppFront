import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/FuelPumpComponent'
import FormComponent from '../components/FuelPumpFormComponent'


export const FuelPumpAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
