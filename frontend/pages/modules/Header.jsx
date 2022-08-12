import Nav from 'react-bootstrap/Nav';
export default function Header() {
  return (
    <>
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/products/">Todos Produtos</Nav.Link>
        <Nav.Link href="/products/product">Filtrar por código</Nav.Link>
      </Nav>
    </>
  )
}
