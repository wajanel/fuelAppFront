import React, { useState, useEffect } from 'react';
import { Card, Title, TextInput, Button } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingMeasureFuel, startUpdatingMeasureFuel } from '../../store/admin/thunks/measureFuelThunk';

const MeasureFuelFormComponent = () => {
  const { isOpenModalMeasureFuel, closeModalMeasureFuel } = useUiStore();
  const { activeData } = useSelector(state => state.measureFuel);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingMeasureFuel(formData));
    } else {
      dispatch(startSavingMeasureFuel(formData));
    }
    closeModalMeasureFuel();
  };

  
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

  useEffect(() => {
    if (activeData) {
      console.log({modificacion:activeData});
      setFormData(activeData);
    }
  }, [activeData]);
  
  return (
    <Modal
    isOpen={isOpenModalMeasureFuel}
      onRequestClose={closeModalMeasureFuel}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Medida de Combustible</Title>
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
          <Button type="button" onClick={closeModalMeasureFuel} color="red">Cancelar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default MeasureFuelFormComponent;
