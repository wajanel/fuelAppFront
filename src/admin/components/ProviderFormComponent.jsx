import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Button } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingProvider, startUpdatingProvider } from '../../store/admin/thunks/providerThunk';

const ProviderFormComponent = () => {
  const { isOpenModalProvider, closeModalProvider } = useUiStore();
  const { activeData } = useSelector(state => state.provider);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone_number: '',
    description: '',
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingProvider(formData));
    } else {
      dispatch(startSavingProvider(formData));
    }
    closeModalProvider();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalProvider}
      onRequestClose={closeModalProvider}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Proveedor</Title>
        <Text>Por favor, llene los siguientes campos:</Text>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Dirección"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="Ingrese la dirección"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Teléfono"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              placeholder="Ingrese el teléfono"
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
          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default ProviderFormComponent;
