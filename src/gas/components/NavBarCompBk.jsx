import React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../hooks";

export const NavBarCompBk = () => {
    const {startLogout , user } = useAuthStore();

    const navigate = useNavigate();

    const handleLogout = () => {
        startLogout();
        navigate('/login', { replace: true });
    };
     
  return (
    <Navbar bg="dark" data-bs-theme="dark" className="my-3">
        <Container fluid>
            <Navbar.Brand href="#"><span className="navbar-brand">
                <i className="fas fa-user"/>
                &nbsp;
                {`${user.name} (${user.role})`}
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={"/"} className={({isActive})=> isActive?'active':''}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/admin"} className={({isActive})=> isActive?'active':''}>
                        Admin
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/user"} className={({isActive})=> isActive?'active':''}>
                        Usuario
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/incometype"} className={({isActive})=> isActive?'active':''}>
                        Income Type
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <button className="btn btn-outline-danger" onClick={ handleLogout }>
            <i className="fas fa-sign-out-alt mx-2"></i>
            <span>Salir</span>
        </button>
        </Container>
    </Navbar>
  )
}
