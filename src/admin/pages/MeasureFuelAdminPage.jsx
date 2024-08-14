import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/MeasureFuelComponent'
import FormComponent from '../components/MeasureFuelFormComponent'


export const MeasureFuelAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}