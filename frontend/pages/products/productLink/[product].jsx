import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Container, Row, Col, Table, Button, Form, Modal, Badge } from 'react-bootstrap'
import Header from '../../modules/Header'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ToastSuccess from '../../components/ToastSuccess'
import ToastError from '../../components/ToastError'
import useToast from '../../components/HookToast'

async function getData({queryKey}) {
    const id = queryKey[1]
    const url = process.env.AXIOS_URL
    const result = await axios.get(`${url}findOne/${id}`)
    return result.data
}

export default function productLink() {
    const queryClient = useQueryClient()
    
    const url = process.env.AXIOS_URL

    const router = useRouter()

    const { product } = router.query

    const { showToast } = useToast()

    const [show, setShow] = useState(false)

    const [erpCode, setErpCode] = useState(null)

    const [erpId, setErpId] = useState(null)

    const handleClose = () => setShow(false)

    const handleShow = (e) =>  {
        setErpCode(e.currentTarget.getAttribute("data-code"))
        setErpId(e.currentTarget.getAttribute("data-id"))
        setShow(true) 
    }

    const { data, isFetching, refetch, isFetched } = useQuery(['getProduct', product], getData, { refetchOnWindowFocus: false, enable: false })
    
    const { mutate: update } = useMutation(
       
        async (data) => { return axios.post(`${url}${data.link}`, data) },
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries('getProduct')
                console.log(res)
                showToast(`Sucesso ao Adicionar código ${res.data.erp_code}`, 'Sucesso ao Adicionar', true, false)
                
            },
            onError: (err) => {
                console.log(err, 'erro')
                showToast(`Erro ao Adicionar / ${err}`, 'Erro ao criar cliente', false, true)
            },
        }
    )

    async function updateProduct(e) {
        const link = e.currentTarget.getAttribute("data-link")
        const id = e.currentTarget.getAttribute("data-id")
        const value = document.getElementById(id).value

        update({ web_erp_code: value, link: link, productId: id })
    }

    const { mutate: deleteItem } = useMutation(
        async () => {
          return await axios.delete(`${url}deleteLink/${erpId}`)
        },
        {
          onSuccess: (res) => {
            showToast(`Sucesso ao deletar item`, 'Item Excluido', true, false)
            queryClient.invalidateQueries('getProduct')
            setShow(false)
          },
          onError: (err) => {
            console.log('error')

            showToast(`Erro ao deletar item / ${err}`, 'Erro ao Excluir', false, true)
          },
        }
      )

    return (
        
        isFetched ? 
            <>
            <Modal 
                show={show} 
                onHide={handleClose} 
                style={{color: "#444"}} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title >Deletar código ERP {erpCode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão do item??
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteItem}>
                        Sim !!! Deletar
                    </Button>
                </Modal.Footer>
               
            </Modal>
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
                        <h2 style={{ borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5 }}>Produto:  { data.name }</h2>
                        <Button variant="warning" onClick={() => router.back()} style={{marginBottom: 5}}>Voltar</Button>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Código Shop</th>
                                    <th>ERP Web</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                   
                                    <tr>
                                        <td>{data.name}</td>
                                        <td>{data.code_default}</td>
                                        {data.ProductVariations.length === 0 ?
                                            <>
                                                <td style={{ padding: 5 }}>
                                                    
                                                    { 
                                                        data.Producterplink.map((link, index) => 
                                                            {
                                                                return (
                                                                    <Badge style={{margin: 5}} key={index} bg="dark" text="light">
                                                                        <Badge onClick={handleShow} data-id={link.id} data-code={link.erp_code} bg="danger" text="light" style={{cursor: 'pointer'}}>X</Badge>  
                                                                        {link.erp_code}
                                                                    </Badge>
                                                                )
                                                            }
                                                        )
                                                    }

                                                    <Form.Control placeholder="Digite o Código do ERP Web" type="text" id={data.id} />
                                                </td>
                                                <td>
                                                    <Button onClick={updateProduct} data-link={`createLink`} data-id={data.id}>Salvar</Button>
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
                                                        {data.ProductVariations.map((variation, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{variation.name}</td>
                                                                    <td style={{ padding: 5 }}>
                                                                        
                                                                        { variation.Producterplink.map((link, index) => 
                                                                            {
                                                                                return (
                                                                                    <Badge style={{margin: 5}} key={index} bg="dark" text="light"><Badge onClick={handleShow} data-id={link.id} data-code={link.erp_code} bg="danger" text="light" style={{cursor: 'pointer'}}>X</Badge>  {link.erp_code}</Badge>
                                                                                )
                                                                            }
                                                                        )}
                                                                        <Form.Control placeholder="Digite o Código do ERP Web" type="text" id={variation.id} />
                                                                        
                                                                    </td>
                                                                    <td>
                                                                        <Button onClick={updateProduct} data-link={`createLinkVariation`} data-id={variation.id}>Salvar</Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </td>
                                        }

                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            </>
        : null 
        
    )
}
