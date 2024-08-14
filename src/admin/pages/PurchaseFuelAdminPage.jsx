import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/PurchaseFuelComponent'
import FormComponent from '../components/PurchaseFuelFormComponent'


export const PurchaseFuelAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
