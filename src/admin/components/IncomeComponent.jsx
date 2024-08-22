import React, { useEffect } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { onActiveData, setLoading } from '../../store/admin/incomeSlice';
import { startDeletingIncome, startLoadingIncomes } from '../../store/admin/thunks/incomeThunk'
import { onOpenModalIncome } from '../../store/ui/uiSlice';
import { useUiStore } from '../../hooks/useUiStore';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingIncomeTypes } from '../../store/admin/thunks/incomeTypeThunks';
import { convertDBDate } from '../../helpers/convertDBDate';

const IncomeComponent = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.income);
  const { data: branches } = useSelector(state => state.branch);
  const { data: incomeTypes } = useSelector(state => state.incomeType);

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    dispatch(onActiveData(itemToEdit));
    dispatch(setLoading());
    dispatch(onOpenModalIncome(true));
  };

  const handleDelete = (id) => {
    const itemToDelete = data.find(item => item.id === id);
    dispatch(onActiveData(itemToDelete));
    dispatch(startDeletingIncome(itemToDelete));
  };

  const { openModalIncome } = useUiStore();

  const handleClickNew = () => {
    dispatch(onActiveData({
      id_branch: '',
      id_income_type: '',
      id_user: '',
      total: '',
      date_process: convertDBDate(new Date()),
      description: ''
    }));
    openModalIncome();
  };

  useEffect(() => {
    dispatch(startLoadingIncomes());
  }, [data]);

  useEffect(() => {
    dispatch(startLoadingBranches());
    dispatch(startLoadingIncomeTypes());
  }, []);

  return (
    <div className="container mx-auto max-w-[80%]">
      <Card className='mt-6'>
        <Title>Lista de Ingresos</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>Tipo de Ingreso</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Fecha de Proceso</TableHeaderCell>
              <TableHeaderCell>Descripción</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{branches.find(branch => branch.id === item.id_branch)?.name}</TableCell>
                <TableCell>{incomeTypes.find(type => type.id === item.id_income_type)?.name}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{convertDBDate( item.date_process )}</TableCell>
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

export default IncomeComponent;
