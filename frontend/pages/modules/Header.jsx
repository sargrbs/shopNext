import {Nav, NavDropdown} from 'react-bootstrap';
export default function Header() {
  return (
    <>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>

        <NavDropdown title="Produtos" id="nav-dropdown">
          <NavDropdown.Item href="/products/">Todos Produtos</NavDropdown.Item>
          <NavDropdown.Item href="/products/product">Filtrar por código</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/aux">Auxiliares / Variações</Nav.Link>
        {/* <Nav.Link href="/products/">Todos Produtos</Nav.Link>
        <Nav.Link href="/products/product">Filtrar por código</Nav.Link> */}
      </Nav>
    </>
  )
}
