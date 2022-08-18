import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import useToast from '../components/HookToast'

import {v4 as uuidv4} from 'uuid';

async function getData({queryKey}){
  const aux = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAux/?aux=${aux}`)
  return result.data
}

export default function Aux() {
    const url = process.env.AXIOS_URL

    const [aux, setAux] = useState()
    const {showToast} = useToast()

    const {data, isFetching, refetch, isFetched} = useQuery(['aux', aux], getData, {refetchOnWindowFocus: false, enable: false})


    function searchItem(){
      refetch()
    }

    const { mutate: createAux} = useMutation(
        async (data) => { return axios.post(`${url}createAux`, data) },
        {
        onSuccess: (res) => {
            showToast(`Sucesso ao adicionar Auxiliares`, 'Itens adicionados', true, false)
        },
        onError: (err) => {
            console.log(err)
            showToast(`Erro ao adicionar Auxiliares / ${err}`, 'Erro ao Importar', false, true)
        },
        }
    )
    const createData = []

    function addAux(){
        const group_name = aux
        data.dados?.map((aux, index) => {
            createData.push({
                id: uuidv4(),
                code: aux.codigo,
                name: aux.nome,
                group_name: group_name
            })
        })
        
        createAux(createData)
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
                        <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Importar Auxiliares do Shop 9</h2>
                        <Row>
                            <Col md="5">
                                <InputGroup style={{marginBottom: 10}}>
                                    <Form.Control
                                        type="text"
                                        id="inputaux"
                                        onChange={(e) => setAux(e.target.value)}
                                        value={aux}
                                        placeholder="Digite o nome do Aux / Variação"
                                    />
                                    <Button onClick={searchItem}variant="outline-primary" id="searchButton">
                                        Buscar
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col md="7">
                                <Button variant="success" onClick={addAux}>Salvar Itens</Button>
                            </Col>
                        </Row>
                        {isFetched ? 
                            <Table responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Código</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? <tr><td colSpan={34}>Loading</td></tr> :
                                    data.dados === null ? <tr><td colSpan={34}>{data?.mensagem}</td></tr> :
                                    data.dados?.map((aux, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{aux.nome}</td>
                                            <td>{aux.codigo}</td>
                                        </tr>
                                    )
                                    })}
                                </tbody>
                            </Table>
                        : null}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
