import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery} from '@tanstack/react-query'

async function getData({queryKey}){
  const aux = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAux/?aux=${aux}`)
  return result.data
}

export default function Aux() {
 
  const [aux, setAux] = useState('cores')

  const {data, isFetching, refetch, isFetched} = useQuery(['aux', aux], getData, {refetchOnWindowFocus: false, enable: false})

  

  function searchItem(){
      refetch()
  }
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
