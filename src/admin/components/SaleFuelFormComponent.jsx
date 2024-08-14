import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingSaleFuel, startUpdatingSaleFuel } from '../../store/admin/thunks/saleFuelThunk';
import { startLoadingMeasureFuels } from '../../store/admin/thunks/measureFuelThunk';
import { startLoadingLastFuelPrices } from '../../store/admin/thunks/lastFuelPriceThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingPumps, startLoadingPumpsPerId } from '../../store/admin/thunks/pumpThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';

const SaleFuelFormComponent = () => {
  const { isOpenModalSaleFuel, closeModalSaleFuel } = useUiStore();
  const { activeData } = useSelector(state => state.saleFuel);
  const { data:measureFuelList } = useSelector(state=> state.measureFuel);
  const { data:latestFuelPriceList } = useSelector(state=>state.latestFuelPrice);
  const { data:branchesList } = useSelector(state=>state.branch);
  const { data:pumpList} = useSelector(state => state.pump);
  const { data:fuelTypeList } = useSelector(state=> state.fuelType);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id_fuel_price: '',
    time: '',
    quantity: '',
    id_measure: '',
    id_user: ''
  });

  const [ idBranch, setIdBranch] = useState('');
  const [ idPump, setIdPump] = useState('');
  const [ fuelTypeId, setFuelTypeId] = useState('');

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingSaleFuel(formData));
    } else {
      dispatch(startSavingSaleFuel({ ...formData, id_user: 1 }));
    }
    closeModalSaleFuel(false);
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

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    handleSave();
  };

  useEffect(() => {
    dispatch(startLoadingMeasureFuels());
    dispatch(startLoadingBranches());
    dispatch(startLoadingFuelTypes())
  }, [])

  useEffect(() => {
    dispatch(startLoadingPumpsPerId(idBranch));
  }, [idBranch])
  
  useEffect(() =>{
    dispatch(startLoadingLastFuelPrices(idPump, fuelTypeId));
  }, [idPump, fuelTypeId])

  return (
    <Modal
      isOpen={isOpenModalSaleFuel}
      onRequestClose={closeModalSaleFuel}
      style={customStyles}
      contentLabel="Formulario de Venta de Combustible"
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Seleccione el tipo de combustible</Title>
        <Select 
          value={fuelTypeId}
          onChange={(e) => setFuelTypeId(e)}
          >
          {fuelTypeList.map(
            fuelType => <SelectItem key={fuelType.id} value={fuelType.id}>{fuelType.name}</SelectItem>
          )}
        </Select>
        <Title>Seleccione la sucursal</Title>
        <Select value={idBranch}
                onChange={e=>setIdBranch(e)}
                key={idBranch}
        >
          <SelectItem value=''>Seleccione Sucursal</SelectItem>
          {
            branchesList.map(branch=>
              <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
            )
          }
        </Select>
        {
          branchesList.length > 0 && pumpList.length > 0?
          <>
            <Title>Seleccione Bomba</Title>
            <Select 
            value={idPump} 
            key={idPump}
            onChange={e=>setIdPump(e)}
            >
                {pumpList.map(
                  pump => <SelectItem key={pump.id} value={pump.id}>{pump.name}</SelectItem>
                )}
            </Select>
          </>
          :''
        }
      </Card>
      { idBranch !=='' && latestFuelPriceList.length > 0 ?  <Card>
        <Title>{formData.id ? 'Editar Venta de Combustible' : 'Nueva Venta de Combustible'}</Title>
        <form onSubmit={handleSubmit}>
          <Text>Precio del Combustible</Text>
          <Select
            name="id_fuel_price"
            value={formData.id_fuel_price}
            onChange={e => handleSelectChange('id_fuel_price', e)}
          >
            <SelectItem>Seleccione precio</SelectItem>
            {
              latestFuelPriceList.map(price => 
                <SelectItem value={price.id} key={price.id}>{price.price}</SelectItem>
              )
            }
          </Select>
          <Text>Hora</Text>
          <TextInput
            name="time"
            type="datetime-local"
            value={formData.time}
            onChange={handleChange}
          />
          <Text>Cantidad</Text>
          <TextInput
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <Text>Medida</Text>
          <Select
            name="id_measure"
            value={formData.id_measure}
            onChange={e => handleSelectChange('id_measure', e)}
          >
            {
            measureFuelList.map((measure) => (
              <SelectItem key={measure.id} value={measure.id}>
                {measure.name}
              </SelectItem>
            ))} 

          </Select>
          <div className="flex justify-end mt-4">
            <Button type="submit" color="blue">{formData.id ? 'Actualizar' : 'Guardar'}</Button>
            <Button type="button" color="red" onClick={closeModalSaleFuel}>Cancelar</Button>
          </div>
        </form>
      </Card>
      :''  
    }
    </Modal>
  );
};

export default SaleFuelFormComponent;
