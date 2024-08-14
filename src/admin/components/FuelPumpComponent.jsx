// components/FuelPumpComponent.js
import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/fuelPumpSlice';
import { startDeletingFuelPump, startLoadingFuelPumps } from '../../store/admin/thunks/fuelPumpThunk';
import { onOpenModalFuelPump } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingPumps } from '../../store/admin/thunks/pumpThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';

const FuelPumpComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.fuelPump);
  const { data:pumps } = useSelector(state=> state.pump);
  const { data:fueltypes } = useSelector(state => state.fuelType)
  const { data:branches } = useSelector(state=>state.branch);


  const handleEdit = (itemEdit) => {
    const itemToEdit = data.find(item => item.id_fuel_type === itemEdit.id_fuel_type && item.id_pump === itemEdit.id_pump);
    console.log(itemToEdit);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalFuelPump(true));
  };

  const handleDelete = (itemDelete) => {
    const itemToDelete = data.find(item => item.id_fuel_type === itemDelete.id_fuel_type && item.id_pump === itemDelete.id_pump);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingFuelPump(itemToDelete));
  };

  const { openModalFuelPump } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({
      id_fuel_type: '',
      id_pump: '',
      side: ''
    }));
    openModalFuelPump();
  }

  useEffect(() => {
    dispatch(startLoadingFuelPumps());
    dispatch(startLoadingPumps());
    dispatch(startLoadingFuelTypes());
    dispatch(startLoadingBranches())
  }, [data]);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Bombas de Combustible</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Tipo de Combustible</TableHeaderCell>
              <TableHeaderCell>Bomba</TableHeaderCell>
              <TableHeaderCell>Lado</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={`${item.id_fuel_type}-${item.id_pump}`}>
                <TableCell>{fueltypes.find(fueltype => fueltype.id === item.id_fuel_type )?.name}</TableCell>
                <TableCell>
                {(() => {
                    const pump = pumps.find(pump => pump.id === item.id_pump);
                    const branch = branches.find(branch => branch.id === pump?.id_branch);
                    return pump ? `${pump.name} - ${branch ? branch.name : 'Sucursal desconocida'}` : 'Bomba desconocida';
                })()}
                </TableCell>
                <TableCell>{item.side}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item)}>Editar</Button>
                  <Button onClick={() => handleDelete(item)} color="red">Eliminar</Button>
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

export default FuelPumpComponent;
