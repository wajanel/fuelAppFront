import React, { useEffect, useState } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, TextInput, Select, SelectItem } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, onResetData, setLoading } from '../../store/admin/saleFuelSlice';
import { startDeletingSaleFuel, startLoadingSaleFuels } from '../../store/admin/thunks/saleFuelThunk';
import { useUiStore } from '../../hooks/useUiStore';
import { convertDBDate } from '../../helpers/convertDBDate';
import { startLoadingFuelPrices } from '../../store/admin/thunks/fuelPriceThunk';
import { startLoadingFuelTypes } from '../../store/admin/thunks/fuelTypeThunk';

const SaleFuelComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.saleFuel);
  const { data: fuelPricesList } = useSelector(state => state.fuelPrice);
  const { data: fuelTypeList } = useSelector(state => state.fuelType);

  const [filters, setFilters] = useState({
    branch: '',
    pump: '',
    fuelPrice: '',
    side: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    const time = convertDBDate(itemToEdit.time);
    dispatch(onActiveData({...itemToEdit, time}));
    dispatch(setLoading());
    openModalSaleFuel(true);
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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = data.filter(item => {
    return (
      (!filters.branch || item.branch.toLowerCase().includes(filters.branch.toLowerCase())) &&
      (!filters.pump || item.pump.toLowerCase().includes(filters.pump.toLowerCase())) &&
      (!filters.fuelPrice || item.price.toString().includes(filters.fuelPrice)) &&
      (!filters.side || item.side.toLowerCase().includes(filters.side.toLowerCase()))
    );
  });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    dispatch(startLoadingSaleFuels());
    dispatch(startLoadingFuelPrices());
  }, [data]);

  useEffect(() => {
    dispatch(startLoadingFuelTypes());
    dispatch(onResetData());
  }, []);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Ventas de Combustible</Title>
        
        <div className="flex gap-4 mb-4">
          <TextInput
            placeholder="Filtrar por Sucursal"
            name="branch"
            value={filters.branch}
            onChange={handleFilterChange}
          />
          <TextInput
            placeholder="Filtrar por Bomba"
            name="pump"
            value={filters.pump}
            onChange={handleFilterChange}
          />
          <TextInput
            placeholder="Filtrar por Precio de Combustible"
            name="fuelPrice"
            value={filters.fuelPrice}
            onChange={handleFilterChange}
          />
          <TextInput
            placeholder="Filtrar por Lado"
            name="side"
            value={filters.side}
            onChange={handleFilterChange}
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>Bomba</TableHeaderCell>
              <TableHeaderCell>Precio</TableHeaderCell>
              <TableHeaderCell>Hora</TableHeaderCell>
              <TableHeaderCell>Cantidad</TableHeaderCell>
              <TableHeaderCell>Medida</TableHeaderCell>
              <TableHeaderCell>Tipo</TableHeaderCell>
              <TableHeaderCell>Lado</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.branch}</TableCell>
                <TableCell>{item.pump}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{convertDBDate(item.time)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.measure}</TableCell>
                <TableCell>{fuelTypeList.find(fuelType => fuelType.id === fuelPricesList.find(fuelPrice => fuelPrice.id === item.id_fuel_price)?.id_fuel_type)?.name}</TableCell>
                <TableCell>{item.side}</TableCell>
                <TableCell>
                  <Button disabled={item.closing === 1} onClick={() => handleEdit(item.id)}>Editar</Button>
                  <Button disabled={item.closing === 1} onClick={() => handleDelete(item.id)} color="red">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4">
          <Button 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>

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
