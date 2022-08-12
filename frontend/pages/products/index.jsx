import React, {useState} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery} from '@tanstack/react-query'

async function getData({queryKey}){
  const page = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getProducts/${page}`)
  return result.data
}

export default function Products() {
 
  const [page, setPage] = useState(1)
  const {data, isFetching} = useQuery(['products', page], getData, {refetchOnWindowFocus: false,})

  function nextPage(){
    let p = page + 1

    setPage(p)
  }
  function previousPage(){
    let p = page - 1

    setPage(p)
  }
  return (
    <>
     <Container>
      <Row>
          <Col md='2'>
            <Header/>
          </Col>
          
          <Col md="10">
            <Button variant="warning" onClick={previousPage} disabled={page === 1 ? true : false}>Anterior</Button>{' '}
            <Button onClick={nextPage} disabled={data?.tipo === 'FIM_DE_PAGINA' ? true : false}>Próximo</Button>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Selecionar</th>
                  <th>nome</th> 
                  <th>codigo</th> 
                  <th>codigoBarras</th> 
                  <th>codigoClasse</th> 
                  <th>codigoFabricante</th> 
                  <th>codigoFamilia</th> 
                  <th>codigoGrupo</th> 
                  <th>codigoMoeda</th> 
                  <th>codigoPesquisa1</th> 
                  <th>codigoPesquisa2</th> 
                  <th>codigoPesquisa3</th> 
                  <th>codigoSubclasse</th> 
                  <th>codigoUnidadeVenda</th> 
                  <th>comprimento</th> 
                  <th>estoqueAtual</th> 
                  <th>inativo</th> 
                  <th>largura</th> 
                  <th>altura</th> 
                  <th>nomeSite</th> 
                  <th>observacao1</th> 
                  <th>observacao2</th> 
                  <th>observacao3</th> 
                  <th>ordem</th> 
                  <th>pesoBruto</th>
                  <th>pesoLiquido</th>
                  <th>precos</th>
                  <th>tipo</th> 
                  <th>urlDetalhe</th> 
                  <th>urlEstoqueDetalhe</th> 
                  <th>urlFotos</th>
                  <th>urlPromocoes</th>
                  <th>urlTabelaPreco</th> 
                  <th>webObs1</th> 
                  <th>webObs2</th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? <tr><td colSpan={34}>Loading</td></tr> :
                data.dados === null ? <tr><td colSpan={34}>{data?.mensagem}</td></tr> :
                  data.dados?.map((product, index) => {
                   return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><Form.Check aria-label={product.codigo} /></td>
                        <td>{product.nome}</td> 
                        <td>{product.codigo}</td> 
                        <td>{product.codigoBarras}</td> 
                        <td>{product.codigoClasse}</td> 
                        <td>{product.codigoFabricante}</td> 
                        <td>{product.codigoFamilia}</td> 
                        <td>{product.codigoGrupo}</td> 
                        <td>{product.codigoMoeda}</td> 
                        <td>{product.codigoPesquisa1}</td> 
                        <td>{product.codigoPesquisa2}</td> 
                        <td>{product.codigoPesquisa3}</td> 
                        <td>{product.codigoSubclasse}</td> 
                        <td>{product.codigoUnidadeVenda}</td> 
                        <td>{product.comprimento}</td> 
                        <td>{product.estoqueAtual}</td> 
                        <td>{product.inativo}</td> 
                        <td>{product.largura}</td> 
                        <td>{product.altura}</td> 
                        <td>{product.nomeSite}</td> 
                        <td>{product.observacao1}</td> 
                        <td>{product.observacao2}</td> 
                        <td>{product.observacao3}</td> 
                        <td>{product.ordem}</td> 
                        <td>{product.pesoBruto}</td>
                        <td>{product.pesoLiquido}</td>
                        <td>{product.precos?.map((preco, index) => {
                          return (
                            <div key={index}>
                              <span>{preco.tabela}</span>
                              <span>{preco.preco}</span>
                              <span>{preco.promocional}</span>
                            </div>
                          )
                        })}</td>
                        <td>{product.tipo}</td> 
                        <td>{product.urlDetalhe}</td> 
                        <td>{product.urlEstoqueDetalhe}</td> 
                        <td>{product.urlFotos}</td>
                        <td>{product.urlPromocoes}</td>
                        <td>{product.urlTabelaPreco}</td> 
                        <td>{product.webObs1}</td> 
                        <td>{product.webObs2}</td>
                      </tr>
                   )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
     </Container>
    </>
  )
}
