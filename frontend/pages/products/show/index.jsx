import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, DropdownButton, ButtonGroup, Dropdown,Badge} from 'react-bootstrap'
import Header from '../../modules/Header'
import {useQuery} from '@tanstack/react-query'
import ToastSuccess from '../../components/ToastSuccess'
import ToastError from '../../components/ToastError'
import useToast from '../../components/HookToast'
import TooltipOverlay from '../../components/TooltipOverlay'
import ShowVariations from '../../components/ShowVariations'
import NumberFormat from 'react-number-format';
import ProductDetail from '../../components/ProductDetail'
import AlertDelete from '../../components/AlertDelete'

async function getData(){
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getProducts`)
  return result.data
}

export default function Aux() {
    const url = process.env.AXIOS_URL

    const urlDelete = `${url}deleteProduct`

    const {showToast} = useToast()

    const {data, isFetching, refetch, isFetched} = useQuery(['getAllProducts'], getData, {refetchOnWindowFocus: false, enable: false})

    console.log(data)

    const currencyFormatter = (formatted_value) => {
        // Set to 0,00 when "" and divide by 100 to start by the cents when start typing
        if (!Number(formatted_value)) return "R$ 0,00";
        const br = { style: "currency", currency: "BRL" };
    
        const value = new Intl.NumberFormat("pt-BR", br).format(formatted_value / 100)
    
        return value
      }

    return (
        <>
            <Container>
                <ToastSuccess />
                <ToastError />
                <Row>
                    <Col md='12'>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Produtos Importados</h2>
                        <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Código Shop</th>
                                <th>ERP Web</th>
                                <th>Preço</th>
                                <th>Classes</th>
                                <th>Variações</th>
                                <th>Estoque</th>
                                <th>Detalhes</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? <tr><td colSpan={34}>Loading</td></tr> :
                            data.length === 0 ? <tr><td colSpan={34}>Nenhum produto importado</td></tr> :
                            data?.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.code_default}</td>
                                    <td>{product.web_erp_code}</td>
                                    <td>
                                        <NumberFormat
                                            displayType="text"
                                            laceholder="R$0,00"
                                            value={parseFloat(product.price).toFixed(2)}
                                            format={currencyFormatter}
                                            prefix={"R$ "}
                                            allowEmptyFormatting
                                            decimalSeparator=","
                                            thousandSeparator="."
                                            decimalScale={2}
                                        />
                                    </td>
                                    <td>{product.auxs.map((item, index) => {
                                        return(<Badge bg="dark" key={index}><Badge bg="warning" text="dark">{item.aux.group_name}</Badge><Badge key={index}>{item.aux.name}</Badge></Badge>)
                                    })}</td>
                                    <td>{product.ProductVariations.length === 0 ? <h5><Badge bg="primary">Produto Simples</Badge></h5> : <ShowVariations productId={product.id} variations={product.ProductVariations} /> }</td>
                                    <td>
                                        <TooltipOverlay 
                                            tooltipContent={product.ProductVariations.length === 0 ? "Total" : "Soma de todas Variações" }
                                            placement="left"
                                            content={product.ProductStock?.map(product => Number(product.quantity)).reduce((prev, curr) => prev + curr, 0)}
                                        /> 
                                    </td>
                                    <td>
                                        <ProductDetail content={product}/>
                                    </td>
                                    <td>
                                        <DropdownButton as={ButtonGroup} title="Ação" id="bg-nested-dropdown">
                                            <Dropdown.Item href='products/edit'>Editar</Dropdown.Item>
                                            <AlertDelete 
                                                item={`${product.name}`} 
                                                url={urlDelete} 
                                                id={product.id} 
                                                queryInvalidate='getAllProducts'
                                                class='dropdown-item'
                                                color='ff3636'
                                            />
                                        </DropdownButton>
                                    </td>
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
