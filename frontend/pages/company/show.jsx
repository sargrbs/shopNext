import React, {useState} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import useToast from '../components/HookToast'
import AlertDelete from '../components/AlertDelete'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'


async function getData(){
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}companyFindAll`)
  return result.data
}

export default function CompanyShow() {
  const url = process.env.AXIOS_URL
  
  const urlDelete = `${url}deleteCompay`

  const {showToast} = useToast()

  const {data, isFetching} = useQuery(['company'], getData, {refetchOnWindowFocus: false,})  

  return (
    <>
      <ToastSuccess/>
      <ToastError />
     <Container>
      <Row>
        <Col md='12'>
            <Header/>
        </Col>
      </Row>
      <Row>
          <Col md="12">
            <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Empresa</h2>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>CNPJ</th> 
                  <th>Serial</th> 
                  <th>Filial</th> 
                  <th>Excluir</th> 
                </tr>
              </thead>
              <tbody>
                {isFetching ? <tr><td colSpan={34}>Loading</td></tr> :
                data === null ? <tr><td colSpan={34}>{data?.mensagem}</td></tr> :
                  data?.map((company, index) => {

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{company.name}</td> 
                        <td>{company.cnpj}</td> 
                        <td>{company.serial}</td> 
                        <td>{company.branch_number}</td> 
                        <td>
                          <AlertDelete 
                            item={`${company.name}`} 
                            url={urlDelete} 
                            id={company.id} 
                            queryInvalidate='company'
                          />
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
