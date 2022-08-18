import {Nav, NavDropdown, Navbar, Container} from 'react-bootstrap';
export default function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" style={{marginBottom: 20}}>
        <Container>
          <Navbar.Brand href="/" >
            API SHOP 9 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="collapse-navbar-nav" />
          <Navbar.Collapse id="collapse-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Produtos" id="nav-dropdown-products">
                <NavDropdown.Item href="/products/show/">Gerenciar Todos</NavDropdown.Item>
                <NavDropdown.Item href="/products/show/showBycode">Pesquisar por código</NavDropdown.Item>
                <NavDropdown.Divider />
                  <NavDropdown.Item href="/products/">Importar em Massa</NavDropdown.Item>
                  <NavDropdown.Item href="/products/product">Importar por código</NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Auxiliares" id="nav-dropdown-aux">
                  <NavDropdown.Item href="/aux/showAll">Gerenciar Todos</NavDropdown.Item>
                <NavDropdown.Divider />
                  <NavDropdown.Item href="/aux">Importar do Shop 9</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  )
}
