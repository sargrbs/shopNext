import React from 'react'
import axios from 'axios'
import {useQuery, useMutation} from '@tanstack/react-query'
import useToast from '../components/HookToast'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import LoadSpinner from '../components/LoadSpinner'
import { Formik } from 'formik';
import Header from '../modules/Header'
import * as Yup from 'yup';

export default function Company(){
    const url = process.env.AXIOS_URL

    const {showToast} = useToast()


    const { mutate: createCompnay, isLoading} = useMutation(
    async (data) => { return axios.post(`${url}createCompany`, data) },
    {
    onSuccess: (res) => {
        showToast(`Sucesso ao adicionar Empresa ${res.data.name}`, 'Empresa adicionada', true, false)
    },
    onError: (err) => {
        console.log(err)
        showToast(`Erro ao adicionar Empresa / Code: ${err.response.data.code}`, 'Erro ao adicionar', false, true)
    },
    }
  )
    
    const schema =
    Yup.object().shape({
      name: Yup.string().required('Preencha o Nome'),
      cnpj: Yup.string().required('Preencha o CNPJ'),
      serial: Yup.string().required('Preencha o número de Série'),
      branch_number: Yup.string().required('Preencha o número da Filial'),
    });

    const initialValues = { name: "", cnpj: "", serial:"", branch_number:""}

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
                    <Col md='12'>
                    <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Cadastrar Empresa</h2>

                    <Formik
                        validationSchema={schema}
                        onSubmit={createCompnay}
                        initialValues={initialValues}
                        enableReinitialize={true}
                        >

                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            handleReset,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (

                            <Form noValidate onSubmit={handleSubmit} id="form-tr">
                            <Row>
                                <Form.Group style={{marginBottom: 5}} as={Col} md="4" controlId="name">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        required
                                        name="name"
                                        type="text"
                                        placeholder="Nome"
                                        onChange={handleChange}
                                        value={values.name}
                                        className={touched.name && errors.name ? "error" : null}
                                    />
                                    {touched.name && errors.name ? (
                                        showToast(errors.name, 'Erro ao enviar', false, true)
                                    ) : null}
                                </Form.Group>

                                <Form.Group style={{marginBottom: 5}} as={Col} md="4" controlId="cnpj">
                                    <Form.Label>CNPJ</Form.Label>
                                    <Form.Control
                                        required
                                        name="cnpj"
                                        type="text"
                                        placeholder="CNPJ"
                                        onChange={handleChange}
                                        value={values.cnpj}
                                        className={touched.cnpj && errors.cnpj ? "error" : null}
                                    />
                                    {touched.cnpj && errors.cnpj ? (
                                        showToast(errors.cnpj, 'Erro ao enviar', false, true)
                                    ) : null}
                                </Form.Group>

                                <Form.Group style={{marginBottom: 5}} as={Col} md="4" controlId="serial">
                                    <Form.Label>Numero Série Shop9</Form.Label>
                                    <Form.Control
                                        required
                                        name="serial"
                                        type="text"
                                        placeholder="Numero Série Shop9"
                                        onChange={handleChange}
                                        value={values.serial}
                                        className={touched.serial && errors.serial ? "error" : null}
                                    />
                                    {touched.serial && errors.serial ? (
                                        showToast(errors.serial, 'Erro ao enviar', false, true)
                                    ) : null}
                                </Form.Group>
                            </Row>

                            <Row >
                                <Form.Group style={{marginBottom: 5}} as={Col} md="4" controlId="branch_number">
                                    <Form.Label>Filial</Form.Label>
                                    <Form.Control
                                        required
                                        name="branch_number"
                                        type="text"
                                        placeholder="Filial"
                                        onChange={handleChange}
                                        value={values.branch_number}
                                        className={touched.branch_number && errors.branch_number ? "error" : null}
                                    />
                                    {touched.branch_number && errors.branch_number ? (
                                        showToast(errors.branch_number, 'Erro ao enviar', false, true)
                                    ) : null}
                                </Form.Group>
                            </Row>

                            <div className='btn-forms mb-3'>
                                <Button md="3" type="submit" style={{marginRight: 5}}>Enviar</Button>
                                <Button className="btn btn-warning margin-left-btn" onClick={() => navigate(-1)}>Voltar</Button>                
                                <LoadSpinner load={isLoading} />
                            </div>
                            </Form>
                        )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </>
    )   
}