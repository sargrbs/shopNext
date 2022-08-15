import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import {v4 as uuidv4} from 'uuid';

async function getData({queryKey}){
  const aux = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAux/?aux=${aux}`)
  return result.data
}

export default function Aux() {
    const url = process.env.AXIOS_URL

    const [aux, setAux] = useState('cores')
    const [showAlert, setShowAlert] = useState(true)
    const [toastMessage, setToastMessage] = useState('')
    const [ToastTitle, setToastTitle] = useState('')
    const [success, setSuccess] = useState(true)
    const [error, setError] = useState(false)

    const {data, isFetching, refetch, isFetched} = useQuery(['aux', aux], getData, {refetchOnWindowFocus: false, enable: false})


    function searchItem(){
      refetch()
    }

    const { mutate: createAux, isLoading: mutLoading } = useMutation(
        async (data) => { return axios.post(`${url}createAux`, data) },
        {
        onSuccess: (res) => {
            console.log(res)
            setSuccess(true)
            setShowAlert(true)
            setToastMessage('res succ')
            setToastTitle('Auxiliares adicionado com sucesso')
        },
        onError: (err) => {
            console.log(err)
            setError(true)
            setToastMessage('errr res')
            setToastTitle('Erro ao adicionar Auxiliares')
            setShowAlert(true)
        },
        }
    )
    const createData = []

    function addAux(){
        data.dados?.map((aux, index) => {
            createData.push({
                id: uuidv4(),
                code: aux.codigo,
                name: aux.nome
            })
        })
        
        createAux(createData)
    }
    
    return (
        <>
            <Container>
                <ToastSuccess 
                    success={success}
                    alert={showAlert}
                    title={ToastTitle}
                    message={toastMessage}
                />
                <ToastError
                    error={error}
                    alert={showAlert}
                    title={ToastTitle}
                    message={toastMessage}
                />
                
                <Row>
                    <Col md='2'>
                        <Header/>
                    </Col>
                    
                    <Col md="10">
                        <Row>
                            <Col>
                                <Button variant="success" onClick={addAux}>Salvar</Button>
                            </Col>
                        </Row>
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
                        </Row>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}
