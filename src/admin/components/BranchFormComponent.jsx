import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingBranches, startUpdatingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingStatusBranches } from '../../store/admin/thunks/statusBranchThunk';

const BranchFormComponent = () => {
  
  const {isOpenModalBranch, closeModalBranch} = useUiStore();
  const { activeData } = useSelector(state => state.branch);
  const { data } = useSelector(state=> state.statusbranch)
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    id_status: '',
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingBranches(formData))
    } else {
      dispatch(startSavingBranches({...formData, id_user:1}));
    }

    closeModalBranch();
  };
  
  useEffect(() => {
    if (activeData) {
      setFormData(activeData);
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingStatusBranches())
  }, []);
  
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

  const handleSelectChange = (e) => {
    console.log('changeSelect');
    console.log(e);
    setFormData({ ...formData, id_status: e });
    console.log('fin changeSelect');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalBranch}
      onRequestClose={closeModalBranch}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Registro</Title>
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
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ingrese su dirección"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Teléfono"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="Ingrese su teléfono"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Descripción"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Ingrese una descripción"
            />
          </div>
          <div className="mb-4">
            <Select
              label="Estado"
              name="id_status"
              value={formData.id_status}
              onChange={handleSelectChange}
            >
              <SelectItem value="">Seleccione un estado</SelectItem>
              {data.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.status}
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

export default BranchFormComponent;
