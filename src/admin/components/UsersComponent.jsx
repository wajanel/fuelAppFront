import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/userSlice';
import { onOpenModalUser } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingUsers } from '../../store/admin/thunks/usersThunk';

const statuses = [
  { id: 1, description: 'Activo' },
  { id: 2, description: 'Inactivo' },
  { id: 3, description: 'Bloqueo Temporal' },
];

const UsersComponent = () => {

  const dispatch = useDispatch();
  const {data} = useSelector(state => state.users)

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit))
    dispatch(setLoading());
    dispatch(onOpenModalUser(true))
  };

  const {openModalUser} = useUiStore();

    const handleClickNew = ()=>{
      dispatch(onActiveData({
        name:'',
        user_name:'',
        password:'',
        password2:'',
        cod_employee:'',
        status_id:1
      }))
      openModalUser();
    }
   
  useEffect(() => {
    dispatch (startLoadingUsers())
  }, [data])
  

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Registros</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Usuario</TableHeaderCell>
              <TableHeaderCell>Cod Empleado</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Rol</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.cod_employee}</TableCell>
                <TableCell>{statuses.find(status => status.id === item.status_id)?.description}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item.id)}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <button 
          className="btn btn-primary fab"
          onClick={handleClickNew}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </Card>
    </div>
  );
};

export default UsersComponent;
