import UserFormComponent from "../../admin/components/UserFormComponent"
import UsersComponent from "../../admin/components/UsersComponent"
import { NavBarComp } from "../components/NavBarComp"

export const UsuarioPage = () => {
  return (
    <>
      <NavBarComp/>
      <UsersComponent/>
      <UserFormComponent />
    </>
  )
}
