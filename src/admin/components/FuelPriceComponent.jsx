// components/FuelPriceComponent.js
import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/fuelPriceSlice';
import { startDeletingFuelPrice, startLoadingFuelPrices } from '../../store/admin/thunks/fuelPriceThunk';
import { onOpenModalFuelPrice } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { convertDBDate } from '../../helpers/convertDBDate';

const FuelPriceComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.fuelPrice);
  const { data:fuelTypeList } = useSelector(state => state.fuelType);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalFuelPrice(true));
  };

  const handleDelete = (id) => {
    const itemToDelete = data.find(item => item.id === id);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingFuelPrice(itemToDelete));
  };

  const { openModalFuelPrice } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({
      date: convertDBDate(new Date()),
      price: '',
      id_pump: '',
      id_fuel_type: ''
    }));
    openModalFuelPrice();
  };

  useEffect(() => {
    dispatch(startLoadingFuelPrices());
  }, []);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Precios de Combustible</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
              <TableHeaderCell>Bomba</TableHeaderCell>
              <TableHeaderCell>Tipo de Combustible</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={`${item.id}`}>
                <TableCell>{convertDBDate(item.date)}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.id_pump}</TableCell>
                <TableCell>{fuelTypeList.find( fuelType => fuelType.id === item.id_fuel_type)?.name}</TableCell>
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

export default FuelPriceComponent;
