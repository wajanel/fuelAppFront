import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Title, TextInput, Button, Select, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { onAddNewData, onUpdateData, onActiveData } from '../../store/admin/fuelPumpSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startSavingFuelPump, startUpdatingFuelPump } from '../../store/admin/thunks/fuelPumpThunk';

const FuelPumpFormComponent = () => {
  const dispatch = useDispatch();
  const { isOpenModalFuelPump, closeModalFuelPump } = useUiStore();
  const { activeData } = useSelector(state => state.fuelPump);
  const { data:brances } = useSelector( state=> state.branch);
  const { data:pumps } = useSelector( state => state.pump);
  const { data:fueltypes } = useSelector (state => state.fuelType);

  const [formData, setFormData] = useState({
    id_fuel_type: '',
    id_pump: '',
    side: '',
  });

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    console.log({name, value});
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('handlesave');
    if (formData.id_fuel_type && formData.id_pump) {
        console.log('actualizacion pump');
        dispatch(startUpdatingFuelPump(formData));
    }else {
        console.log('nuevo pump');
        dispatch(startSavingFuelPump(formData));
      }
    closeModalFuelPump();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  useEffect(() => {
    dispatch(startLoadingBranches());
    dispatch(startLoadingFuelTypes());
    dispatch(startLoadingPumps());
  }, [])
  

  return (
    <Modal
      isOpen={isOpenModalFuelPump}
      onRequestClose={closeModalFuelPump}
      style={customStyles}
      contentLabel="Formulario de Bomba de Combustible"
    >
      <Card>
        <Title>{formData.id_fuel_type ? 'Editar Bomba de Combustible' : 'Nueva Bomba de Combustible'}</Title>
        <form onSubmit={handleSubmit}>
          <Title>Tipo de Combustible</Title>
          <Select
            label="Tipo Combustible"
            name="id_fuel_type"
            value={formData.id_fuel_type}
            onChange={(e) => handleSelectChange('id_fuel_type', e)}
          >
            <SelectItem value=''>Seleccione un tipo de combustible</SelectItem>
            {
                fueltypes.map(
                    fuelType => <SelectItem key={fuelType.id} value={fuelType.id}>{fuelType.name}</SelectItem>
                )
            }
          </Select>
          <Title>Bomba</Title>
          <Select
            label="Bomba"
            name="id_pump"
            value={formData.id_pump}
            onChange={(e) => handleSelectChange('id_pump', e)}
          >
            <SelectItem value=''>Seleccione bomba</SelectItem>
            {
                pumps.map( pump =>
                    <SelectItem key={pump.id} value={pump.id}>{pump.name}</SelectItem>
                )
            }
          </Select>
          <Title>Lado</Title>
          <TextInput
            name="side"
            value={formData.side}
            onChange={handleChange}
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" color="blue">{formData.id_fuel_type ? 'Actualizar' : 'Guardar'}</Button>
            <Button color="red" onClick={closeModalFuelPump}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default FuelPumpFormComponent;
