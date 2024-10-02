import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Title, Button, Select, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startSavingFuelPump } from '../../store/admin/thunks/fuelPumpThunk';

const side = ['A', 'B', 'M'];

const FuelPumpFormComponent = () => {
  const dispatch = useDispatch();
  const { isOpenModalFuelPump, closeModalFuelPump } = useUiStore();
  const { activeData } = useSelector(state => state.fuelPump);
  const { data:pumps } = useSelector( state => state.pump);
  const { data:fueltypes } = useSelector (state => state.fuelType);
  const { data:branches } = useSelector(state=> state.branch);

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

  const handleSelectChange = (name, value) => {
    console.log({name, value});
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('handlesave');
      dispatch(startSavingFuelPump(formData));
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
      className={'modal'}
      overlayClassName={'modal-fondo'}
    >
      <Card >
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
                {
                  const branch = branches.find(b => b.id === pump.id_branch);
                  return (<SelectItem key={pump.id} value={pump.id}>{`${pump.name} - ${branch.name}`}</SelectItem>)
                }
                )
            }
          </Select>
          <Title>Lado</Title>
          <Select 
            value={formData.side}
            onChange={e => handleSelectChange('side', e)}
            required
          >
            <SelectItem value=''>Seleccione Lado</SelectItem>
            {
              side.map( s =>
                <SelectItem key={s} value={s}>{s}</SelectItem>
              )
            }
          </Select>
          <div className="flex justify-end mt-4">
            <Button type="submit" color="blue">{'Guardar'}</Button>
            <Button color="red" onClick={closeModalFuelPump}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default FuelPumpFormComponent;
