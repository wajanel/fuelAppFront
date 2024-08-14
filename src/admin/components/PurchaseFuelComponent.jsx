import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/purchaseFuelSlice';
import { startDeletingPurchaseFuel, startLoadingPurchaseFuels } from '../../store/admin/thunks/purchaseFuelThunk';
import { onOpenModalPurchaseFuel } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingProviders } from '../../store/admin/thunks/providerThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingMeasureFuels } from '../../store/admin/thunks/measureFuelThunk';
import { convertDBDate } from '../../helpers/convertDBDate';

const PurchaseFuelComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.purchaseFuel);
  const { data: branches } = useSelector(state => state.branch);
  const { data: providers } = useSelector(state => state.provider);
  const { data: fuelTypes } = useSelector(state => state.fuelType);
  const { data: measureFuels } = useSelector(state => state.measureFuel);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalPurchaseFuel(true));
  };

  const handleDelete = (id) => {
    const itemToDelete = data.find(item => item.id === id);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingPurchaseFuel(itemToDelete));
  };

  const { openModalPurchaseFuel } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({
      id_branch: '',
      id_provider: '',
      id_fuel_type: '',
      id_user: '',
      unit_price: '',
      quantity: '',
      id_measure: '',
      time: convertDBDate(new Date())
    }));
    openModalPurchaseFuel();
  };

  useEffect(() => {
    dispatch(startLoadingPurchaseFuels());
    dispatch(startLoadingBranches());
    dispatch(startLoadingProviders());
    dispatch(startLoadingFuelTypes());
    dispatch(startLoadingMeasureFuels());
  }, []);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Compras de Combustible</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>Proveedor</TableHeaderCell>
              <TableHeaderCell>Tipo de Combustible</TableHeaderCell>
              <TableHeaderCell>Precio Unitario</TableHeaderCell>
              <TableHeaderCell>Cantidad</TableHeaderCell>
              <TableHeaderCell>Medida</TableHeaderCell>
              <TableHeaderCell>Hora</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{branches.find(branch => branch.id === item.id_branch)?.name}</TableCell>
                <TableCell>{providers.find(provider => provider.id === item.id_provider)?.name}</TableCell>
                <TableCell>{fuelTypes.find(fuelType => fuelType.id === item.id_fuel_type)?.name}</TableCell>
                <TableCell>{item.unit_price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{measureFuels.find(measure => measure.id === item.id_measure)?.name}</TableCell>
                <TableCell>{convertDBDate(item.time)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item.id)}>Editar</Button>
                  <Button onClick={() => handleDelete(item.id)} color="red">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <button 
          className="btn btn-primary fab"
          onClick={handleClickNew}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </Card>
    </div>
  );
};

export default PurchaseFuelComponent;
