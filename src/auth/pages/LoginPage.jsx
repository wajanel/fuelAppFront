import React, { useEffect } from 'react';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { Card, Button, TextInput, Title } from '@tremor/react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavBarComp } from '../../gas/components/NavBarComp';
import { useTranslation } from 'react-i18next';


const loginFormFields = {
    loginUser: '',
    loginPassword: ''
};

export const LoginPage = () => {

    const { t } = useTranslation();

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
                    <Title >{t('msg_ingresar')}</Title>
                      <form onSubmit={submitLogin}>
                          <TextInput
                              type="text"
                              placeholder={t('msg_usuario')}
                              name="loginUser"
                              value={loginUser}
                              onChange={onLoginInputChange}
                              className="mb-2"
                              />
                          <TextInput
                              type="password"
                              placeholder={t('msg_contrasena')}
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

