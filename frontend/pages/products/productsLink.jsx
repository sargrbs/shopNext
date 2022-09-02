import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Button, Form, DropdownButton, ButtonGroup, Dropdown, Badge } from 'react-bootstrap'
import Header from '../modules/Header'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import useToast from '../components/HookToast'

async function getData() {
    const url = process.env.AXIOS_URL
    const result = await axios.get(`${url}getProducts`)
    return result.data
}

export default function Aux() {
    const url = process.env.AXIOS_URL

    const { showToast } = useToast()

    const [displayInput, setDisplayInput] = useState('none')

    const { data, isFetching, refetch, isFetched } = useQuery(['getAllProducts'], getData, { refetchOnWindowFocus: false, enable: false })

    const queryClient = useQueryClient()

    const { mutate: update } = useMutation(
        async (data) => { return axios.put(`${url}${data.link}`, data) },
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries("getAllProducts")
                showToast(`Sucesso ao Atualizar  ${res.data.name}`, 'Sucesso ao Atualizar', true, false)
            },
            onError: (err) => {
                console.log(err, 'erro')
                showToast(`Erro ao Atualizar / ${err}`, 'Erro ao criar cliente', false, true)
            },
        }
    )

    async function updateProduct(e) {
        const link = e.currentTarget.getAttribute("data-link")
        const id = e.currentTarget.getAttribute("data-id")
        const value = document.getElementById(id).value

        update({ web_erp_code: value, link: link })
    }

    function showInput(e) {
        const id = e.currentTarget.getAttribute("data-id")
        document.getElementById(id).style.display = "block"
    }
    function handleBlur(e) {
        const id = e.currentTarget.getAttribute("data-id")
        document.getElementById(id).style.display = "none"
        console.log('teste')
    }
    return (
        <>
            <Container>
                <ToastSuccess />
                <ToastError />
                <Row>
                    <Col md='12'>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <h2 style={{ borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5 }}>Produtos Importados</h2>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Código Shop</th>
                                    <th>ERP Web</th>
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
                                                    {product.ProductVariations.length === 0 ?
                                                        <>
                                                            <td style={{ padding: 0 }} onClick={showInput} onBlur={handleBlur} data-id={`${product.id}`}>
                                                                {product.web_erp_code ?
                                                                    <span style={{ width: '100%', position: 'relative', display: 'inline-block' }} >
                                                                        <Badge bg="warning" text="dark">{product.web_erp_code}</Badge>
                                                                        <span id={product.id} style={{ display: 'none', margin: 5 }}>
                                                                            <Form.Control
                                                                                placeholder="Digite o Código do ERP Web"
                                                                                type="text" 
                                                                            />
                                                                            {/* <a onClick={handleBlur} data-id={product.id} style={{position: 'absolute', color: 'red',top: 0 , right: 5, cursor: 'pointer'}}>x</a> */}
                                                                                            
                                                                        </span>
                                                                    </span>
                                                                    :
                                                                    <Form.Control placeholder="Digite o Código do ERP Web" type="text" id={product.id} />
                                                                }
                                                            </td>
                                                            <td>
                                                                <Button onClick={updateProduct} data-link={`updateCodeProduct/${product.id}`} data-id={product.id}>Salvar</Button>
                                                            </td>
                                                        </>
                                                        :
                                                        <td colSpan={2}>
                                                            <Table responsive striped bordered hover variant="light">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Nome</th>
                                                                        <th>Código ERP Web</th>
                                                                        <th>Ação</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {product.ProductVariations.map((variation, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{variation.name}</td>
                                                                                <td style={{ padding: 0 }} onClick={showInput} onBlur={handleBlur} data-id={`${variation.id}`}>
                                                                                    {variation.web_erp_code ?
                                                                                        <span style={{ width: '100%', position: 'relative', display: 'inline-block' }} >
                                                                                            <Badge bg="warning" text="dark" >{variation.web_erp_code}</Badge>
                                                                                            <span id={variation.id} style={{ display: 'none', margin: 5 }} >
                                                                                                <Form.Control 
                                                                                                    placeholder="Digite o Código do ERP Web" 
                                                                                                    type="text" 
                                                                                                />
                                                                                                {/* <a onClick={handleBlur} data-id={`${variation.id}`} style={{position: 'absolute', color: 'red',top: 0 , right: 5, cursor: 'pointer'}}>x</a> */}
                
                                                                                            </span>
                                                                                        </span>
                                                                                        :
                                                                                        <Form.Control placeholder="Digite o Código do ERP Web" type="text" id={variation.id} />
                                                                                    }

                                                                                </td>
                                                                                <td>
                                                                                    <Button onClick={updateProduct} data-link={`updateCodeVariation/${variation.id}`} data-id={variation.id}>Salvar</Button>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </td>
                                                    }

                                                    {/* <td>{product.ProductVariations.length === 0 ? <h5><Badge bg="primary">Produto Simples</Badge></h5> : <ShowVariations productId={product.id} variations={product.ProductVariations} /> }</td> */}


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
