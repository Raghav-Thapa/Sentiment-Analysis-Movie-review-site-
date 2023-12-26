import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/logo.png"


const Header = () =>{
    return(<>
         <Navbar className='navv' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/"><img className='logo' src={logo} alt="" /></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className='headertitle' to="/">Home</NavLink>
            <NavLink className='headertitle' to="#features">Movies</NavLink>
            <NavLink className='headertitle' to="#pricing">Now Showing</NavLink>
            <NavLink className='headertitlesignin' to="#pricing">Sign In</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>)
}


export default Header