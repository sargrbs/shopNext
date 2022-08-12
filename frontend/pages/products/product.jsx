import React, {useState, useEffect} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery} from '@tanstack/react-query'
import GetPriceItem from '../components/GetPriceItem'

async function getData({queryKey}){
  const code = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getProduct/${code}`)

  return result
}

export default function Products() {
 
    const [code, setCode] = useState("")
    const {data, isFetching, refetch, isFetched} = useQuery(['product', code], getData, {refetchOnWindowFocus: false, enabled: false})
    

    function searchItem(){
        refetch()
    }
    
    console.log(data, isFetched)
    return (
        <>
            <Container>
                <Row>
                    <Col md='2'>
                        <Header/>
                    </Col>
                    
                    <Col md="10">
                        <Row>
                            <Col md="5">
                                <InputGroup style={{marginBottom: 10}}>
                                    <Form.Control
                                        type="text"
                                        id="inputCode"
                                        onChange={(e) => setCode(e.target.value)}
                                        value={code}
                                        placeholder="Digite o código do produto"
                                    />
                                    <Button onClick={searchItem}variant="outline-primary" id="searchButton">
                                        Buscar
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Detalhes</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>nome</th> 
                                            <th>codigo</th> 
                                            <th>codigoBarras</th> 
                                            <th>codigoClasse</th> 
                                            {/* <th>codigoFabricante</th> 
                                            <th>codigoFamilia</th> 
                                            <th>codigoGrupo</th> 
                                            <th>codigoMoeda</th> 
                                            <th>codigoPesquisa1</th> 
                                            <th>codigoPesquisa2</th> 
                                            <th>codigoPesquisa3</th> 
                                            <th>codigoSubclasse</th>  */}
                                            <th>codigoUnidadeVenda</th> 
                                            <th>comprimento</th> 
                                            {/* <th>estoqueAtual</th>  */}
                                            <th>inativo</th> 
                                            <th>largura</th> 
                                            <th>altura</th> 
                                            <th>nomeSite</th> 
                                            {/* <th>observacao1</th> 
                                            <th>observacao2</th> 
                                            <th>observacao3</th>  */}
                                            <th>ordem</th> 
                                            <th>pesoBruto</th>
                                            <th>pesoLiquido</th>
                                            <th>tipo</th> 
                                            {/* <th>urlPromocoes</th> */}
                                            <th>TabelaPreco</th> 
                                            {/* <th>webObs1</th> 
                                            <th>webObs2</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                        data.data.productDetail?.dados === null ? <tr><td colSpan={34}>{data.data.productDetail?.dados.mensagem}</td></tr> :
                                        
                                            <tr>
                                                <td>{data.data.productDetail?.dados.nome}</td> 
                                                <td>{data.data.productDetail?.dados.codigo}</td> 
                                                <td>{data.data.productDetail?.dados.codigoBarras}</td> 
                                                <td>{data.data.productDetail?.dados.codigoClasse}</td> 
                                                {/* <td>{data.data.productDetail?.dados.codigoFabricante}</td> 
                                                <td>{data.data.productDetail?.dados.codigoFamilia}</td> 
                                                <td>{data.data.productDetail?.dados.codigoGrupo}</td> 
                                                <td>{data.data.productDetail?.dados.codigoMoeda}</td> 
                                                <td>{data.data.productDetail?.dados.codigoPesquisa1}</td> 
                                                <td>{data.data.productDetail?.dados.codigoPesquisa2}</td> 
                                                <td>{data.data.productDetail?.dados.codigoPesquisa3}</td> 
                                                <td>{data.data.productDetail?.dados.codigoSubclasse}</td>  */}
                                                <td>{data.data.productDetail?.dados.codigoUnidadeVenda}</td> 
                                                <td>{data.data.productDetail?.dados.comprimento}</td> 
                                                {/* <td>{data.data.productDetail?.dados.estoqueAtual}</td>  */}
                                                <td>{data.data.productDetail?.dados.inativo}</td> 
                                                <td>{data.data.productDetail?.dados.largura}</td> 
                                                <td>{data.data.productDetail?.dados.altura}</td> 
                                                <td>{data.data.productDetail?.dados.nomeSite}</td> 
                                                {/* <td>{data.data.productDetail?.dados.observacao1}</td> 
                                                <td>{data.data.productDetail?.dados.observacao2}</td> 
                                                <td>{data.data.productDetail?.dados.observacao3}</td>  */}
                                                <td>{data.data.productDetail?.dados.ordem}</td> 
                                                <td>{data.data.productDetail?.dados.pesoBruto}</td>
                                                <td>{data.data.productDetail?.dados.pesoLiquido}</td>
                                                <td>{data.data.productDetail?.dados.tipo}</td>
                                                {/* <td>{data.data.productDetail?.dados.urlPromocoes}</td> */}
                                                <td><GetPriceItem url={data.data.productDetail?.dados.urlTabelaPreco}/></td> 
                                                {/* <td>{data.data.productDetail?.dados.webObs1}</td> 
                                                <td>{data.data.productDetail?.dados.webObs2}</td> */}
                                            </tr>
                                        
                                        }
                                    </tbody>
                                    </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Estoque Produto Simples</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>codigo</th>
                                            <th>tipoEstoque</th>
                                            <th>urlDetalhe</th>
                                            <th>estoqueFiliais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                        data.data.product?.dados === null ? <tr><td colSpan={34}>{data?.mensagem}</td></tr> :
                                        
                                            <tr>
                                                <td>{data.data.product?.dados.codigo}</td>
                                                <td>{data.data.product?.dados.tipoEstoque}</td>
                                                <td>{data.data.product?.dados.urlDetalhe}</td>
                                                <td><ul>{data.data.product?.dados.estoqueFiliais?.map((filial, index) => {
                                                    return (
                                                        <li key={index} style={{borderBottom: '1px solid #fff', marginBottom: 5}}>
                                                            <span>Filial: {filial.codigoFilial}</span>{" - "}
                                                            <span>Estoque: {filial.estoqueAtual}</span>
                                                        </li>
                                                    )
                                                })}</ul></td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Estoque Produto Grade</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>codigoCompleto</th>
                                            <th>codigoCor</th>
                                            <th>codigoTamanho</th>
                                            <th>codigoFilial</th>
                                            <th>estoqueAtual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                        data.data.grid?.dados === null ? <tr><td colSpan={34}>{data.data.grid.mensagem}</td></tr> :
                                        data.data.grid.dados.lista?.map((product, index) => {
                                            return (
                                        
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.codigoCompleto}</td>
                                                    <td>{product.codigoCor}</td>
                                                    <td>{product.codigoTamanho}</td>
                                                    <td>{product.codigoFilial}</td>
                                                    <td>{product.estoqueAtual}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
