import React, { useEffect } from 'react';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { Card, Button, TextInput, Title } from '@tremor/react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavBarComp } from '../../gas/components/NavBarComp';


const loginFormFields = {
    loginUser: '',
    loginPassword: ''
};

const registerFormFields = {
    registerUser: '',
    registerName: '',
    registerPassword: '',
    registerPassword2: '',
    registerCodEmpleado:''
};

export const RegisterPage = () => {
    const { loginUser, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { registerUser, registerName, registerPassword, registerPassword2, registerCodEmpleado, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const submitLogin = (event) => {
        event.preventDefault();
        startLogin({ userName: loginUser, password: loginPassword });
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);

    const submitRegister = (event) => {
        event.preventDefault();

        if (registerPassword !== registerPassword2) {
            Swal.fire('Error creación usuario', 'No coinciden las contraseñas', 'error');
            return;
        }
        startRegister({ userName: registerUser, name: registerName, password: registerPassword, password2: registerPassword2, codEmpleado:registerCodEmpleado });
    };

    return (
        <>
        <NavBarComp/>
        <Container className="mt-5">
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <Card>
                    <Title>Registro</Title>
                      <form onSubmit={submitRegister}>
                          <TextInput
                              type="text"
                              placeholder="Nombre"
                              name="registerName"
                              value={registerName}
                              onChange={onRegisterInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="text"
                              placeholder="Usuario"
                              name="registerUser"
                              value={registerUser}
                              onChange={onRegisterInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="text"
                              placeholder="Codigo empleado"
                              name="registerCodEmpleado"
                              value={registerCodEmpleado}
                              onChange={onRegisterInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="password"
                              placeholder="Contraseña"
                              name="registerPassword"
                              value={registerPassword}
                              onChange={onRegisterInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="password"
                              placeholder="Repita la contraseña"
                              name="registerPassword2"
                              value={registerPassword2}
                              onChange={onRegisterInputChange}
                              className="mb-2"
                              />
                          <Button type="submit" color="blue" className="mt-3">
                              Crear cuenta
                          </Button>
                      </form>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

