import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {FaShoppingCart , FaUser} from "react-icons/fa" //fa is fonts awesome
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from "../slices/authSlice"
import logo from "../assets/logo3.png"
export const Header = () => {

  const { cartItems } = useSelector((state)=> state.cart); //state.cart - cart is the reducer mentioned in store.js
  const { userInfo } = useSelector((state)=> state.auth); 

  // console.log(cartItems)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); //logoutApiCall is distructured from useLogoutMutation. we can call it whatever we want it is a variable name given to the function

  const logoutHandler =async()=>{
    try {
      await logoutApiCall(); // this is to clear cookie
      dispatch(logout());//this is to clear localstorage and global state
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }
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
                          <Nav.Link><FaShoppingCart /> Cart
                          {cartItems.length > 0 && (
                            <Badge pill bg='success' style={{marginLeft:'5px'}}>
                              {cartItems.reduce((a,c)=> a+c.qty , 0)}
                            </Badge>
                          ) }
                          </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                          <NavDropdown title={userInfo.name} id="username">
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                          </NavDropdown>
                        ) : (
                        <LinkContainer to="/login">
                          <Nav.Link>
                            <FaUser /> Login
                          </Nav.Link>
                        </LinkContainer>)}


                        {userInfo && userInfo.isAdmin && (
                          <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/productlist'>
                              <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/userlist'>
                              <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                              <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                          </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}
