import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingPump, startUpdatingPump } from '../../store/admin/thunks/pumpThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingStatusPump } from '../../store/admin/thunks/statusPumpThunk';

const PumpFormComponent = () => {
  
  const { isOpenModalPump, closeModalPump } = useUiStore();
  const { activeData } = useSelector(state => state.pump);
  const { data: statusData } = useSelector(state => state.statuspump);
  const { data: branchData } = useSelector(state => state.branch);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    id_status: '',
    description: '',
    id_branch: ''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingPump(formData));
    } else {
      dispatch(startSavingPump(formData));
    }

    closeModalPump();
  };

  useEffect(() => {
    if (activeData) {
      setFormData(activeData);
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingStatusPump());
    dispatch(startLoadingBranches());
  }, [dispatch]);

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

  const handleSelectChange = (e, name) => {
    setFormData({ ...formData, [name]: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalPump}
      onRequestClose={closeModalPump}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Registro de Bomba</Title>
        <Text>Por favor, llene los siguientes campos:</Text>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre de la bomba"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Código"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Ingrese el código de la bomba"
              required
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
              onChange={(e) => handleSelectChange(e, 'id_status')}
              required
            >
              <SelectItem value="">Seleccione un estado</SelectItem>
              {statusData.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              label="Sucursal"
              name="id_branch"
              value={formData.id_branch}
              onChange={(e) => handleSelectChange(e, 'id_branch')}
              required
            >
              <SelectItem value="">Seleccione una sucursal</SelectItem>
              {branchData.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Button type="submit">Guardar</Button>
          <Button type='button' color='red' onClick={closeModalPump}>Cancelar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default PumpFormComponent;
