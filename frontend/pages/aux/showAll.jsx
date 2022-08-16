import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup, Spinner} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import AlertDelete from '../components/AlertDelete'

async function getData(){
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getAllAux`)

  return result
}

export default function Aux() {
    const url = process.env.AXIOS_URL
    const urlDelete = `${url}deleteAux`

    const {data, isFetching, isFetched} = useQuery(['showAllaux'], getData, {refetchOnWindowFocus: false})
    
    console.log(data)
    return (
        <>
            <ToastSuccess/>
            <ToastError/>
            <Container>
                <Row>
                    <Col md='2'>
                        <Header/>
                    </Col>

                    <Col md="10">
                        <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Grupo</th>
                                <th>Código</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? <tr><td colSpan={34}><Spinner animation="border" variant="primary" /></td></tr> :
                            data.data.length === 0 ? <tr><td colSpan={34}>Nenhum dado Encontrado</td></tr> :
                                data.data?.map((aux, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{aux.name}</td>
                                        <td>{aux.group_name}</td>
                                        <td>{aux.code}</td>
                                        <td>
                                            <AlertDelete 
                                                item={`${aux.name}`} 
                                                url={urlDelete} 
                                                id={aux.id} 
                                                queryInvalidate='showAllaux' 
                                            />
                                        </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
