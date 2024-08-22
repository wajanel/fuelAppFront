import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingPurchaseFuel, startUpdatingPurchaseFuel } from '../../store/admin/thunks/purchaseFuelThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingProviders } from '../../store/admin/thunks/providerThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingMeasureFuels } from '../../store/admin/thunks/measureFuelThunk';
import { convertDBDate } from '../../helpers/convertDBDate';

const PurchaseFuelFormComponent = () => {
  const { isOpenModalPurchaseFuel, closeModalPurchaseFuel } = useUiStore();
  const { activeData } = useSelector(state => state.purchaseFuel);
  const { data: branches } = useSelector(state => state.branch);
  const { data: providers } = useSelector(state => state.provider);
  const { data: fuelTypes } = useSelector(state => state.fuelType);
  const { data: measureFuels } = useSelector(state => state.measureFuel);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id_branch: '',
    id_provider: '',
    id_fuel_type: '',
    id_user: '',
    unit_price: '',
    quantity: '',
    id_measure: '',
    time: ''
  });

  const handleSave = () => {
    if (formData.id) {
      dispatch(startUpdatingPurchaseFuel(formData));
    } else {
      dispatch(startSavingPurchaseFuel({ ...formData, id_user: 1 }));
    }
    closeModalPurchaseFuel();
  };

  useEffect(() => {
    if (activeData) {
        setFormData({
            ...activeData,
            time: convertDBDate(activeData.time)
          });
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingBranches());
    dispatch(startLoadingProviders());
    dispatch(startLoadingFuelTypes());
    dispatch(startLoadingMeasureFuels());
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

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalPurchaseFuel}
      onRequestClose={closeModalPurchaseFuel}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Compra de Combustible</Title>
        <Text>Por favor, llene los siguientes campos:</Text>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Select
              label="Sucursal"
              name="id_branch"
              value={formData.id_branch}
              onChange={(e) => handleSelectChange('id_branch', e)}
              required
            >
              <SelectItem value="">Seleccione una sucursal</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              label="Proveedor"
              name="id_provider"
              value={formData.id_provider}
              onChange={(e) => handleSelectChange('id_provider', e)}
              required
            >
              <SelectItem value="">Seleccione un proveedor</SelectItem>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              label="Tipo de Combustible"
              name="id_fuel_type"
              value={formData.id_fuel_type}
              onChange={(e) => handleSelectChange('id_fuel_type', e)}
              required
            >
              <SelectItem value="">Seleccione un tipo de combustible</SelectItem>
              {fuelTypes.map((fuelType) => (
                <SelectItem key={fuelType.id} value={fuelType.id}>
                  {fuelType.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <TextInput
              label="Precio Unitario"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleChange}
              placeholder="Ingrese el precio unitario"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Cantidad"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Ingrese la cantidad"
              required
            />
          </div>
          <div className="mb-4">
            <Select
              label="Medida"
              name="id_measure"
              value={formData.id_measure}
              onChange={(e) => handleSelectChange('id_measure', e)}
              required
            >
              <SelectItem value="">Seleccione una medida</SelectItem>
              {measureFuels.map((measure) => (
                <SelectItem key={measure.id} value={measure.id}>
                  {measure.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <TextInput
              label="Hora"
              name="time"
              type="datetime-local"
              value={formData.time}
              onChange={handleChange}
              placeholder="Seleccione la hora"
              required
            />
          </div>
          <Button type="submit">Guardar</Button>
          <Button type="button" onClick={closeModalPurchaseFuel} color="red">Cancelar</Button>
        </form>
      </Card>
    </Modal>
  );
};

export default PurchaseFuelFormComponent;
