import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/PurchaseFuelResumeComponent'
import FormComponent from '../components/PurchaseFuelResumeFormComponent'


export const PurchaseFuelResumeAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
