import { NavBarComp } from '../../gas/components/NavBarComp'
import CrudComponent from '../components/BranchComponent'
import FormComponent from '../components/BranchFormComponent'


export const BranchAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <CrudComponent/>
      <FormComponent />
    </>
  )
}
