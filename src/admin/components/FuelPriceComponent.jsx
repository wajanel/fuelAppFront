// components/FuelPriceComponent.js
import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData } from '../../store/admin/fuelPriceSlice';
import { startLoadingFuelPrices } from '../../store/admin/thunks/fuelPriceThunk';
import { useUiStore } from '../../hooks/useUiStore';
import { convertDBDate } from '../../helpers/convertDBDate';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';

const FuelPriceComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.fuelPrice);
  const { data:fuelTypeList } = useSelector(state => state.fuelType);
  const { data:pumpList } = useSelector(state=>state.pump);
  const { data:branchList } = useSelector(state=> state.branch);

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
    dispatch(startLoadingPumps());
    dispatch(startLoadingBranches());
    dispatch(startLoadingFuelTypes());
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
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>Tipo de Combustible</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => {
              const pump = pumpList.find(pump => pump.id === item.id_pump);
              const branch = branchList.find(branch => branch.id === pump?.id_branch);
              const fuelType = fuelTypeList.find(fuelType => fuelType.id === item.id_fuel_type);

              return (
              <TableRow key={`${item.id}`}>
                <TableCell>{convertDBDate(item.date)}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{ pump?.name }</TableCell>
                <TableCell>{ branch?.name }</TableCell>
                <TableCell>{fuelType?.name}</TableCell>
              </TableRow>
            )})}
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
