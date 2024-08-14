import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingPurchaseFuelResume, startUpdatingPurchaseFuelResume } from '../../store/admin/thunks/purchaseFuelResumeThunk';
import { startLoadingPurchaseFuels } from '../../store/admin/thunks/purchaseFuelThunk';

const PurchaseFuelResumeFormComponent = () => {
    const { isOpenModalPurchaseFuelResume, closeModalPurchaseFuelResume } = useUiStore();
    const { activeData } = useSelector(state => state.purchaseFuelResume);
    const { data: purchaseFuels } = useSelector(state => state.purchaseFuel);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        invoice: '',
        id_purchase_fuel: '',
        time: '',
        id_user: ''
    });

    const formatDateForInput = (date) => {
        const d = new Date(date);
        const pad = (n) => (n < 10 ? '0' + n : n);
        const year = d.getFullYear();
        const month = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        const hours = pad(d.getHours());
        const minutes = pad(d.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSave = () => {
        if (formData.id) {
            dispatch(startUpdatingPurchaseFuelResume(formData));
        } else {
            dispatch(startSavingPurchaseFuelResume({ ...formData, id_user: 1 }));
        }
        closeModalPurchaseFuelResume();
    };

    useEffect(() => {
        if (activeData) {
            setFormData({
                ...activeData,
                time: formatDateForInput(activeData.time)
            });
        }
    }, [activeData]);

    useEffect(() => {
        dispatch(startLoadingPurchaseFuels());
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
            isOpen={isOpenModalPurchaseFuelResume}
            onRequestClose={closeModalPurchaseFuelResume}
            style={customStyles}
            className={'modal'}
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={200}
        >
            <Card>
                <Title>Formulario de Resumen de Compra de Combustible</Title>
                <Text>Por favor, llene los siguientes campos:</Text>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextInput
                            label="Factura"
                            name="invoice"
                            value={formData.invoice}
                            onChange={handleChange}
                            placeholder="Ingrese la factura"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            label="Compra de Combustible"
                            name="id_purchase_fuel"
                            value={formData.id_purchase_fuel}
                            onChange={(e) => handleSelectChange('id_purchase_fuel', e)}
                        >
                            <SelectItem value="">Seleccione una compra de combustible</SelectItem>
                            {purchaseFuels.map((fuel) => (
                                <SelectItem key={fuel.id} value={fuel.id}>
                                    {fuel.time}
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
                </form>
            </Card>
        </Modal>
    );
};

export default PurchaseFuelResumeFormComponent;
