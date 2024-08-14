import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingUsers, startUpdatingUsers } from '../../store/admin/thunks/usersThunk';

const statuses = [
  { id: 1, description: 'Activo' },
  { id: 2, description: 'Inactivo' },
  { id: 3, description: 'Bloqueo Temporal' },
];

const roles = [
  { id: 'admin', description: 'admin' },
  { id: 'usuario', description: 'usuario' },
];

const UserFormComponent = () => {
  
  const {isOpenModalUser, closeModalUser} = useUiStore();
  const { activeData } = useSelector(state => state.users);
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
        name:'',
        user_name:'',
        password:'',
        password2:'',
        cod_employee:'',
        status_id:1,
        role:''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingUsers(formData))
    } else {
      dispatch(startSavingUsers({...formData}));
    }

    closeModalUser();
  };
  
  useEffect(() => {
    if (activeData) {
      setFormData(activeData);
    }
  }, [activeData]);
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectStatusChange = (e) => {
    console.log('changeSelect');
    console.log(e);
    setFormData({ ...formData, status_id: e });
    console.log('fin changeSelect');
  };
   
  const handleSelectRoleChange = (e) => {
    console.log('changeSelect');
    console.log(e);
    setFormData({ ...formData, role: e });
    console.log('fin changeSelect');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalUser}
      onRequestClose={closeModalUser}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Registro Usuarios</Title>
        <Text>Por favor, llene los siguientes campos:</Text>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Usuario"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Código Empleado"
              name="cod_employee"
              value={formData.cod_employee || ''}
              onChange={handleChange}
              placeholder="Ingrese su código de empleado"
            />
          </div>

          { !activeData?.id && (
          <>
            <div className="mb-4">
              <TextInput
               type='password'
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su password"
                required
              />
            </div>
            <div className="mb-4">
              <TextInput 
                type='password'
                label="Confirmar password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Repita su password"
              />
            </div>
          </>
        )}
          
          <div className="mb-4">
            <Select
              label="Estado"
              name="status_id"
              value={formData.status_id}
              onChange={handleSelectStatusChange}
            >
              <SelectItem value="">Seleccione un estado</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.description}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleSelectRoleChange}
            >
              <SelectItem value="">Seleccione un rol</SelectItem>
              {roles.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.description}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default UserFormComponent;
