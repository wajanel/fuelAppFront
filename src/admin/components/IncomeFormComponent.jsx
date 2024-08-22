import React, { useState, useEffect } from 'react';
import { Card, Title, Text, TextInput, Select, Button, SelectItem } from '@tremor/react';
import Modal from 'react-modal';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch, useSelector } from 'react-redux';
import { startSavingIncome, startUpdatingIncome } from '../../store/admin/thunks/incomeThunk';
import { startLoadingBranches } from '../../store/admin/thunks/branchThunk';
import { startLoadingIncomeTypes } from '../../store/admin/thunks/incomeTypeThunks';
import { convertDBDate } from '../../helpers/convertDBDate';

const IncomeFormComponent = () => {
  const { isOpenModalIncome, closeModalIncome } = useUiStore();
  const { activeData } = useSelector(state => state.income);
  const { data: branches } = useSelector(state => state.branch);
  const { data: incomeTypes } = useSelector(state => state.incomeType);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id_branch: '',
    id_income_type: '',
    id_user: '',
    total: '',
    description: '',
    date_process: ''
  });

  const handleSave = () => {
    if (formData.id) {
      console.log('income actualizado');
      dispatch(startUpdatingIncome(formData));
    } else {
      console.log('nuevo income');
      dispatch(startSavingIncome(formData));
    }
    closeModalIncome();
  };

  useEffect(() => {
    if (activeData) {
      setFormData({
        ...activeData,
        date_process: convertDBDate(activeData.date_process)
      });
    }
  }, [activeData]);

  useEffect(() => {
    dispatch(startLoadingBranches());
    dispatch(startLoadingIncomeTypes());
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
    console.log({name, value});
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal
      isOpen={isOpenModalIncome}
      onRequestClose={closeModalIncome}
      style={customStyles}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={200}
    >
      <Card>
        <Title>Formulario de Ingreso</Title>
        <Text>Por favor, llene los siguientes campos:</Text>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Select
              label="Sucursal"
              name="id_branch"
              value={formData.id_branch}
              onChange={(e) => handleSelectChange('id_branch', e)}
              required
            >
              <SelectItem value="">Seleccione una sucursal</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <Select
              label="Tipo de Ingreso"
              name="id_income_type"
              value={formData.id_income_type}
              onChange={(e) => handleSelectChange('id_income_type', e)}
              required
            >
              <SelectItem value="">Seleccione un tipo de ingreso</SelectItem>
              {incomeTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <TextInput
              label="Total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              placeholder="Ingrese el total"
              required
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Descripción"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Ingrese una descripción"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Hora"
              name="date_process"
              type="datetime-local"
              value={formData.date_process}
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

export default IncomeFormComponent;
