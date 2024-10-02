import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuthStore } from "../../hooks";
import LanguageSwitcher from "./LanguageSwitcher";

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const NavBarComp = () => {

    const { t } = useTranslation();
    const { startLogout, user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        startLogout();
        navigate('/login', { replace: true });
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
            <Container fluid>
                <Navbar.Brand href="#">
                    <span className="navbar-brand">
                        {!isEmptyObject(user) ? (
                            <>
                                <i className="fas fa-user" />
                                &nbsp; {user.name} ({user.role})
                            </>
                        ) : (
                            <button className="btn btn-outline-primary" onClick={handleLogin}>
                                <i className="fas fa-sign-out-alt mx-2"></i>
                                <span>{t('msg_ingresar')}</span>
                            </button>
                        )}
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link as={NavLink} to={"/"} className={({ isActive }) => isActive ? 'active' : ''}>
                            {t('msg_inicio')}
                        </Nav.Link>
                        {isEmptyObject(user) && (
                            <Nav.Link as={NavLink} to={"/registro"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_registro')}
                            </Nav.Link>
                        )}
                        {!isEmptyObject(user) && (user.role === 'usuario' || user.role === 'admin') && (
                            <>
                                <Nav.Link as={NavLink} to={"/provider"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_proveedores')}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/purchasefuel"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_compras')}
                                </Nav.Link> 
                                <Nav.Link as={NavLink} to={"/salefuel"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_ventas')}
                                </Nav.Link>
                                <Nav.Link as={NavLink} to={"/income"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_ingresos')}
                                </Nav.Link>
                            </>
                        )}
                        {!isEmptyObject(user) && user.role === 'admin' && (
                            <NavDropdown title="Configuración" id="basic-nav-dropdown">
                                <NavDropdown.Item as={NavLink} to={"/incometype"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_tipo_ingresos')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/branch"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_sucursales')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/fueltype"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_tipos_combustible')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/measurefuel"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_medidas_combustible')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/graficas"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_graficas')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/user"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_usuario')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/fuelprice"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_precios')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/pump"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_bombas')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/fuelpump"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_bombas_combustible')}
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to={"/dailyclosing"} className={({ isActive }) => isActive ? 'active' : ''}>
                                {t('msg_cierre_diario')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <LanguageSwitcher/>  {/* Se añade algo de espacio a la izquierda */}
                    {!isEmptyObject(user) && (
                        <button className="btn btn-outline-danger my-2 my-lg-0 ms-2" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt mx-2"></i>
                            <span>{t('msg_salir')}</span>
                        </button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
