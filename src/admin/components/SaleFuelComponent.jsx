import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/saleFuelSlice';
import { startDeletingSaleFuel, startLoadingSaleFuels } from '../../store/admin/thunks/saleFuelThunk';
import { onOpenModalSaleFuel } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { convertDBDate } from '../../helpers/convertDBDate';
import { startLoadingFuelPrices } from '../../store/admin/thunks/fuelPriceThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';

const SaleFuelComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.saleFuel);
  const { data:measureFuelList } = useSelector(state=> state.measureFuel)
  const { data:fuelPricesList } = useSelector(state => state.fuelPrice);
  const { data:fuelTypeList } = useSelector(state=> state.fuelType);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalSaleFuel(true));
  };

  const handleDelete = (id) => {
    const itemToDelete = data.find(item => item.id === id);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingSaleFuel(itemToDelete));
  };

  const { openModalSaleFuel } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({
      id_fuel_price: '',
      time: convertDBDate(new Date()),
      quantity: '',
      id_measure: '',
      id_user: ''
    }));
    openModalSaleFuel(true);
  };

  useEffect(() => {
    dispatch(startLoadingSaleFuels());
    dispatch(startLoadingFuelPrices());
  }, [data]);

  useEffect(() => {
    dispatch(startLoadingFuelTypes());
  }, [])
  

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Ventas de Combustible</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Precio del Combustible</TableHeaderCell>
              <TableHeaderCell>Hora</TableHeaderCell>
              <TableHeaderCell>Cantidad</TableHeaderCell>
              <TableHeaderCell>Medida</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{ fuelPricesList.find( fuelPrice => fuelPrice.id === item.id_fuel_price )?.price}</TableCell>
                <TableCell>{convertDBDate(item.time)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{ measureFuelList.find( measure => measure.id === item.id_measure )?.name }</TableCell>
                <TableCell>{ fuelTypeList.find( fuelType => fuelType.id === fuelPricesList.find( fuelPrice => fuelPrice.id === item.id_fuel_price )?.id_fuel_type)?.name }</TableCell>
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

export default SaleFuelComponent;
