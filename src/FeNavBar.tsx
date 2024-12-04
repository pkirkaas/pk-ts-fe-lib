/**
 * Example FE NavBar
 */

// NPM packages
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// PKLib Imports
import {GenObj, } from 'pk-ts-common-lib';

// Local imports
import {NavVals, isActive, RespNav, } from './react-utils/index.js';




export function MainNavbar(origNavVals:NavVals) {
  let navVals = {...origNavVals};

  /*
  return (
    <Navbar expand="md" variant="tabs" className="bg-body-tertiary pp-main-nav">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto" >
                {
      Object.entries(navVals).map(([key, val]) => (
                <Nav.Link  key={key} eventKey={val.path}  className={isActive(val.path) } href={val.path} >{val.label}</Nav.Link>
      ))
    }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  */
}

export default MainNavbar;
















