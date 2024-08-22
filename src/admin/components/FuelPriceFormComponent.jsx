import React, { useState, useEffect } from 'react';
import { Card, Title, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingFuelPrice, startUpdatingFuelPrice } from '../../store/admin/thunks/fuelPriceThunk';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingFuelPumps } from '../../store/admin/thunks/fuelPumpThunk';
import { convertDBDate } from '../../helpers/convertDBDate';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';

const FuelPriceFormComponent = () => {
  const { isOpenModalFuelPrice, closeModalFuelPrice } = useUiStore();
  const { activeData } = useSelector(state => state.fuelPrice);
  const { data: pumps } = useSelector(state => state.pump);
  const { data: branches} = useSelector(state => state.branch);
  const { data: fuelTypes } = useSelector(state => state.fuelType);
  const { data: fuelPumpsList } = useSelector(state => state.fuelPump);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: '',
    price: '',
    id_pump: '',
    id_fuel_type: '',
    fuel_pump_key: ''
  });

  const getFuelPumpKey = (fuelPump) => `${fuelPump.id_pump}-${fuelPump.id_fuel_type}`;

  const handleSave = () => {
    const [id_pump, id_fuel_type] = formData.fuel_pump_key.split('-');
    const payload = {
      ...formData,
      id_pump,
      id_fuel_type
    };

    if (formData.id) {
      dispatch(startUpdatingFuelPrice(payload));
    } else {
      dispatch(startSavingFuelPrice(payload));
    }

    closeModalFuelPrice();
  };

  useEffect(() => {
    if (activeData) {
      const fuel_pump_key = getFuelPumpKey(activeData);
      setFormData({ ...activeData, fuel_pump_key });
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingPumps());
    dispatch(startLoadingFuelTypes());
    dispatch(startLoadingFuelPumps());
    dispatch(startLoadingBranches());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    console.log({fuel_pump_key:formData.fuel_pump_key});
    
    setFormData({ ...formData, [name]: value });
  };

  const filteredFuelPumps = fuelPumpsList.filter(fuelPump => 
    fuelPump.id_pump === formData.id_pump && 
    fuelPump.id_fuel_type === formData.id_fuel_type
  );

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
            disabled
          />

          <TextInput
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            type="number"
            step="0.0001"
            required
          />

          <Select
            name="id_pump"
            value={formData.id_pump}
            onChange={e => handleSelectChange('id_pump', e)}
          >
            <SelectItem value="">Seleccione una bomba</SelectItem>
            {pumps.map(pump => {
              const branch = branches.find( b => b.id === pump.id_branch);
              return (
              <SelectItem key={pump.id} value={pump.id}>{pump.name +' - '+branch?.name}</SelectItem>
            )}
            )
            }
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

          <Select
            name="fuel_pump_key"
            value={formData.fuel_pump_key}
            onChange={e => handleSelectChange('fuel_pump_key', e)}
            disabled={!formData.id_pump || !formData.id_fuel_type}
          >
            <SelectItem value="">Seleccione una bomba de combustible</SelectItem>
            {filteredFuelPumps.map(fuelPump => {
              const fuelPumpKey = getFuelPumpKey(fuelPump);
              return (
                <SelectItem 
                  key={fuelPumpKey} 
                  value={fuelPumpKey}
                >
                  {`${fuelPump.side} - ${pumps.find(pump => pump.id === fuelPump.id_pump)?.name} (${fuelTypes.find(fuelType => fuelType.id === fuelPump.id_fuel_type)?.name})`}
                </SelectItem>
              );
            })}
          </Select>

          <Button disabled={(formData.fuel_pump_key==='-' || formData.fuel_pump_key==='')} type="submit" className="mt-4">
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
