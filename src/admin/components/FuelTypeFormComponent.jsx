import React, { useState, useEffect } from 'react';
import { Card, Title, TextInput, Button } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingFuelType, startUpdatingFuelType } from '../../store/admin/thunks/fuelTypeThunk';

const FuelTypeFormComponent = () => {
  const { isOpenModalFuelType, closeModalFuelType } = useUiStore();
  const { activeData } = useSelector(state => state.fuelType);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingFuelType(formData));
    } else {
      dispatch(startSavingFuelType(formData));
    }
    closeModalFuelType();
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
    handleSave();
  };

  return (
    <Modal
      isOpen={isOpenModalFuelType}
      onRequestClose={closeModalFuelType}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Tipo de Combustible</Title>
        <form onSubmit={handleSubmit}>
          <TextInput className="mb-4"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            label="Nombre"
            required
          />
          <TextInput className="mb-4"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Descripción"
            label="Descripción"
          />
          <Button type="submit">Guardar</Button>
          <Button type="button" onClick={closeModalFuelType} color="red">Cancelar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default FuelTypeFormComponent;
