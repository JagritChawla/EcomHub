import { Navbar, Nav, Container } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {FaShoppingCart , FaUser} from "react-icons/fa" //fa is fonts awesome
import logo from "../assets/logo3.png"
export const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} alt="EcomHub" style={{ maxWidth: '100%', height: '45px' }}/>
                    EcomHub
                </Navbar.Brand>
              </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                          <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                        
                          {/* <FaShoppingCart /> this is a cart icon that we have imported from fonts awesome */}
                        <LinkContainer to="/login">
                          <Nav.Link><FaUser /> Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
