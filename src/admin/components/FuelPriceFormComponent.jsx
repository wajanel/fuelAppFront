// components/FuelPriceFormComponent.js
import React, { useState, useEffect } from 'react';
import { Card, Title, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingFuelPrice, startUpdatingFuelPrice } from '../../store/admin/thunks/fuelPriceThunk';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { convertDBDate } from '../../helpers/convertDBDate';

const FuelPriceFormComponent = () => {
  const { isOpenModalFuelPrice, closeModalFuelPrice } = useUiStore();
  const { activeData } = useSelector(state => state.fuelPrice);
  const { data: pumps } = useSelector(state => state.pump);
  const { data: fuelTypes } = useSelector(state => state.fuelType);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: '',
    price: '',
    id_pump: '',
    id_fuel_type: ''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingFuelPrice(formData));
    } else {
      dispatch(startSavingFuelPrice(formData));
    }

    closeModalFuelPrice();
  };

  useEffect(() => {
    if (activeData) {
      setFormData(activeData);
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingPumps());
    dispatch(startLoadingFuelTypes());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    console.log({name, value});
    setFormData({ ...formData, [name]: value });
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

  return (
    <Modal
      isOpen={isOpenModalFuelPrice}
      onRequestClose={closeModalFuelPrice}
      contentLabel="Formulario de Precio de Combustible"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      ariaHideApp={false}
      style={customStyles}
    >
      <Card className='mt-2'>
        <Title>{formData.id ? 'Editar Precio de Combustible' : 'Registrar Precio de Combustible'}</Title>
        <form onSubmit={handleSave}>
          <TextInput
            name="date"
            value={convertDBDate(formData.date)}
            onChange={handleChange}
            placeholder="Fecha"
            type="datetime-local"
          />

          <TextInput
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            type="number"
            step="0.0001"
          />

          <Select
            name="id_pump"
            value={formData.id_pump}
            onChange={e => handleSelectChange('id_pump', e)}
          >
            <SelectItem value="">Seleccione una bomba</SelectItem>
            {pumps.map(pump => (
              <SelectItem key={pump.id} value={pump.id}>{pump.name}</SelectItem>
            ))}
          </Select>

          <Select
            name="id_fuel_type"
            value={formData.id_fuel_type}
            onChange={e => handleSelectChange('id_fuel_type', e)}
          >
            <SelectItem value="">Seleccione un tipo de combustible</SelectItem>
            {fuelTypes.map(fuelType => (
              <SelectItem key={fuelType.id} value={fuelType.id}>{fuelType.name}</SelectItem>
            ))}
          </Select>

          <Button type="submit" className="mt-4">
            {formData.id ? 'Actualizar' : 'Guardar'}
          </Button>
          <Button type="button" className="mt-4 ml-2" color="red" onClick={closeModalFuelPrice}>
            Cancelar
          </Button>
        </form>
      </Card>
    </Modal>
  );
};

export default FuelPriceFormComponent;
