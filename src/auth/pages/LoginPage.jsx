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

export const LoginPage = () => {
    const { loginUser, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    
    const { startLogin, errorMessage } = useAuthStore();

    const submitLogin = (event) => {
        event.preventDefault();
        startLogin({ userName: loginUser, password: loginPassword });
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);

    return (
        <>
        <NavBarComp/>
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={6}>
                    <Card>
                    <Title >Ingreso</Title>
                      <form onSubmit={submitLogin}>
                          <TextInput
                              type="text"
                              placeholder="Usuario"
                              name="loginUser"
                              value={loginUser}
                              onChange={onLoginInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="password"
                              placeholder="Contraseña"
                              name="loginPassword"
                              value={loginPassword}
                              onChange={onLoginInputChange}
                              className="mb-2"
                              />
                          <Button type="submit" color="blue" className="mt-3">
                              Login
                          </Button>
                      </form>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

