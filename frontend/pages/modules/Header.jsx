import {Nav, NavDropdown} from 'react-bootstrap';
export default function Header() {
  return (
    <>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>

        <NavDropdown title="Produtos" id="nav-dropdown">
          <NavDropdown.Item href="/products/">Importar do Shop 9</NavDropdown.Item>
          <NavDropdown.Item href="/products/product">Importar por código</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Auxiliares / Variações" id="nav-dropdown">
          <NavDropdown.Item href="/aux">Importar do Shop 9</NavDropdown.Item>
          <NavDropdown.Item href="/aux/showAll">Gerenciar Importados</NavDropdown.Item>
        </NavDropdown>

        {/* <Nav.Link href="/products/">Todos Produtos</Nav.Link>
        <Nav.Link href="/products/product">Filtrar por código</Nav.Link> */}
      </Nav>
    </>
  )
}
