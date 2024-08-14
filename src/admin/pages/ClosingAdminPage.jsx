import React, { useState } from 'react'
import { NavBarComp } from '../../gas/components/NavBarComp'
import { Col, Row, Container, Button } from 'react-bootstrap'
import { Card, TextInput } from '@tremor/react';
import { useDispatch } from 'react-redux'
import { startDailyClosing } from '../../store/admin/thunks/dailyClosingThunk';

export const ClosingAdminPage = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    const handleSave = () => {
        const datetime = `${formData.date} 00:00:00`;
        dispatch(startDailyClosing({ date: datetime }));
    };

  return (
    <>
        <NavBarComp/>
        <Container className="mt-5">
            <Row className='justify-content-center'>
                <Col xs={4}>
                    <Card>
                        <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                <TextInput
                                    label="Fecha"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="Seleccione la fecha"
                                    required
                                />
                            </div>
                            <Button type="submit">Realizar Cierre</Button>
                        </form>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
}
