import { NavBarComp } from '../../gas/components/NavBarComp'
import IncomeTypeComponent from '../components/IncomeTypeComponent'
import IncomeTypeFormComponent from '../components/IncomeTypeFormComponent'


export const IncomeTypeAdminPage = () => {
  return (
    <>
      <NavBarComp/>
      <IncomeTypeComponent/>
      <IncomeTypeFormComponent />
    </>
  )
}
