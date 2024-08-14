import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@tremor/react';
import { startLoadingPurchaseFuelResumes, startDeletingPurchaseFuelResume } from '../../store/admin/thunks/purchaseFuelResumeThunk';
import { useUiStore } from '../../hooks/useUiStore';
import { onActiveData, setLoading } from '../../store/admin/purchaseFuelResumeSlice';
import { onOpenModalPurchaseFuelResume } from '../../store/ui/uiSlice';
import { convertDBDate } from '../../helpers/convertDBDate';

const PurchaseFuelResumeComponent = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector(state => state.purchaseFuelResume);
    
    useEffect(() => {
        dispatch(startLoadingPurchaseFuelResumes());
    }, [dispatch]);

    const handleEdit = (id) => {
        const itemToEdit = data.find(item => item.id === id);
        dispatch(onActiveData(itemToEdit));
        dispatch(setLoading());
        dispatch(onOpenModalPurchaseFuelResume(true));
    };

    const handleDelete = (id) => {
        const itemToDelete = data.find(item => item.id === id);
        dispatch(onActiveData(itemToDelete));
        dispatch(startDeletingPurchaseFuelResume(itemToDelete.id));
    };

    const { openModalPurchaseFuelResume } = useUiStore();

    const handleClickNew = () => {
        console.log('clicknew');
        dispatch(onActiveData({
          invoice: '',
          id_purchase_fuel: '',
          time: convertDBDate(new Date())
        }));
        openModalPurchaseFuelResume();
      };
    
    return (
        <div className="container mx-auto max-w-[80%]">
        <Card>
            <Title>Purchase Fuel Resumes</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Invoice</TableHeaderCell>
                        <TableHeaderCell>Purchase Fuel ID</TableHeaderCell>
                        <TableHeaderCell>Time</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading && data.map((resume) => (
                        <TableRow key={resume.id}>
                            <TableCell>{resume.invoice}</TableCell>
                            <TableCell>{resume.id_purchase_fuel}</TableCell>
                            <TableCell>{convertDBDate(resume.time)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(resume.id)}>Editar</Button>
                                <Button onClick={() => handleDelete(resume.id)} color="red">Eliminar</Button>
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

export default PurchaseFuelResumeComponent;
