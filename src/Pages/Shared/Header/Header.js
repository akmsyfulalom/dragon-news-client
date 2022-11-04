
import { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';


const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error('error:', error))

    }
    return (
        <div>

            <Navbar className='mb-2' collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand> <Link to="/">Dreagon News</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">All News</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            < >
                                {
                                    user?.uid ?
                                        <div className='d-lg-flex justify-content-center align-items-lg-center d-sm-block'>


                                            <Link to="/profile" >
                                                <span className='fw-bold text-decoration-none'>{user?.displayName} </span>
                                                {user?.photoURL ?
                                                    <Image style={{ height: '30px' }} roundedCircle src={user?.photoURL}></Image>
                                                    :
                                                    <FaUser></FaUser>
                                                }
                                            </Link>
                                            <Button onClick={handleLogOut} variant="outline-primary">Log Out</Button>
                                        </div>
                                        :
                                        <>

                                            <Link className='me-2' to="/login"><Button variant="outline-primary">Login</Button></Link>
                                            <Link to="/register"><Button variant="outline-primary">Register</Button></Link>
                                        </>
                                }
                            </>

                        </Nav>
                        <div className='d-lg-none'>
                            <LeftSideNav></LeftSideNav>
                        </div>
                    </Navbar.Collapse>

                </Container>

            </Navbar>
        </div >
    );
};

export default Header;