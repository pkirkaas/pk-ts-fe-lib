/**
 * Example FE NavBar
 */
export function MainNavbar(origNavVals) {
    let navVals = { ...origNavVals };
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
//# sourceMappingURL=FeNavBar.jsx.map