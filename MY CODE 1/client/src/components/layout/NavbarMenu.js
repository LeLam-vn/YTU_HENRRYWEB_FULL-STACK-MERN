import React, {useContext} from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import logoutIcon from '../../assets/logout.svg'
import {AuthContext} from "../../contexts/AuthContext";

const NavbarMenu = () => {
    const {authState:{user:{username}}, logoutUser} = useContext(AuthContext);

    const logout = ()=>logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img
                    src={learnItLogo}
                    alt="Learn IT Logo"
                    width='32'
                    height='32'
                    className='mr-2'
                />
                Learn IT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/dashboard'
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/about'
                        as={Link}
                    >
                        About
                    </Nav.Link>

                </Nav>
                <Nav>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        disabled
                    >
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant ='secondary'
                        className='font-weight-bolder text-white'
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="logoutIcon"
                            width='32'
                            height='32'
                            className='mr-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavbarMenu