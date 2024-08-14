import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/incomeTypeSlice';
import { startDeletingIncomeType, startLoadingIncomeTypes } from '../../store/admin/thunks/incomeTypeThunks';
import { onOpenModalIncomeType } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';

const IncomeTypeComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.incomeType);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalIncomeType(true));
  };

  const handleDelete = (id) => {
    const itemToDelete = data.find(item => item.id === id);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingIncomeType(itemToDelete));
  };

  const { openModalIncomeType } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({ name: '', description: '' }));
    openModalIncomeType();
  };

  useEffect(() => {
    dispatch(startLoadingIncomeTypes());
  }, [data]);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Tipos de Ingreso</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
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

export default IncomeTypeComponent;
