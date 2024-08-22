import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/SaleFuelComponent'
import FormComponent from '../components/SaleFuelFormComponent'
import UpdateFormComponet from '../components/SaleFuelUpdateFormComponent'


export const SaleFuelAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
