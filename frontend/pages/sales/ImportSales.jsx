import React, {useState} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import useToast from '../components/HookToast'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
registerLocale('pt-BR', ptBR)
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'

import {v4 as uuidv4} from 'uuid'

async function getData({queryKey}){
    const startDate  = queryKey[1]
    const endDate = queryKey[2]
    const searchNumber = queryKey[3]
    const { data } = await axios.get(`https://apioms.herokuapp.com/importOrders/?&start=${startDate}&end=${endDate}&number=${searchNumber}`);
            
    return data
}
// async function getOrders({queryKey}){
//     const startDate  = queryKey[1]
//     const endDate = queryKey[2]

//     const { data } = await axios.get(`http://localhost:80/getOrdersToshop/?start=${startDate}&end=${endDate}`);
            
//     return data
// }

export default function ImportSales() {
    const url = process.env.AXIOS_URL
    const {showToast} = useToast()

    const [searchNumber, setSearchNumber] = useState("")
    const [startDate, setStartDate] = useState(new Date(moment().subtract(1, 'days')))
    const [endDate, setEndDate] = useState(new Date())
    
    const onChange = (dates) => {
        const [start, end] = dates
        console.log(dates)
        setStartDate(start)
        setEndDate(end)
        setStartDateGet(moment(start).format('YYYY-MM-DDT00:00:00.000Z'))
        setEndDateget(moment(end).format('YYYY-MM-DDT00:00:00.000Z'))
        
    }

    function filterByNumber(e){
        const number = e.target.value
        setSearchNumber(number)
    }

    const [startDateGet, setStartDateGet] = useState(moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDT00:00:00.000Z'))
    
    const [endDateget, setEndDateget] = useState(moment(new Date()).format('YYYY-MM-DDT00:00:00.000Z'))
    
    // const {data, refetch, isFetched} = useQuery(['getOrders', startDateGet, endDateget], getOrders)

    const {data: dataBling, isFetching, isLoading, refetch, isFetched: Fetchedbling} = useQuery(['getSales', moment(startDateGet).format("DD/MM/YYYY"), moment(endDateget).format("DD/MM/YYYY"), searchNumber], getData, {refetchOnWindowFocus: false, enable: false})
   


    const { mutate: create} = useMutation(
        async (data) => { return axios.post(`${url}createClient`, data) },
        {
            onSuccess: (res) => {
                showToast(`Sucesso ao adicionar cliente`, 'Cliente adicionado', true, false)
            },
            onError: (err) => {
                console.log(err)
                showToast(`Erro ao adicionar cliente / ${err}`, 'Erro ao criar cliente', false, true)
            },
        }
    )

    const clients = []
    if(Fetchedbling){
        dataBling.orders.map(sale => {
            console.log(sale, 'teste')
            const verifyCpfCnpj = sale.pedido.cliente.cnpj.length
            const name = sale.pedido.cliente.nome.split(' ', sale.pedido.cliente.nome.length)
            const fantasia = name.pop()
            clients.push({
                nome: name.join(" "),
                fantasia: fantasia,
                tipo: 'C',
                fisicaJuridica: verifyCpfCnpj > 11 ? 'J' : 'F',
                cpfCnpj: sale.pedido.cliente.cnpj,
                rg: sale.pedido.cliente.rg,
                Ie: sale.pedido.cliente.ie === null ? 'ISENTO' : sale.pedido.cliente.ie,
                cep: sale.pedido.cliente.cep,
                endereco: sale.pedido.transporte.enderecoEntrega.endereco,
                numero: sale.pedido.transporte.enderecoEntrega.numero,
                complemento: sale.pedido.transporte.enderecoEntrega.complemento,
                bairro: sale.pedido.transporte.enderecoEntrega.bairro,
                cidade: sale.pedido.transporte.enderecoEntrega.cidade,
                uf: sale.pedido.transporte.enderecoEntrega.uf,
                pais: "",
                telefone1: sale.pedido.cliente.fone,
                telefone2: null,
                fax: null,
                entregaCep: null,
                entregaEndereco: null,
                entregaNumero: null,
                entregaComplemento: null,
                entregaBairro: null,
                entregaCidade: null,
                entregaUf: null,
                entregaPais: null,
                entregaPontoRef1: null,
                entregaPontoRef2: null,
                faturamentoCep: null,
                faturamentoEndereco: null,
                faturamentoNumero: null,
                faturamentoComplemento: null,
                faturamentoBairro: null,
                faturamentoCidade: null,
                faturamentoUf: null,
                faturamentoPais: null,
                faturamentoPontoRef1: null,
                faturamentoPontoRef2: null,
                UrlContatos: null,
                IndicadorIE: sale.pedido.cliente.ie === null ? 9 : 1,

            })  
        })
        console.log(clients, 'objetc')
    }

    function createClient(){
        create(clients)
    }
   
    function refetchFunction(){
        refetch()
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
                        <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Importar vendas para o Shop 9</h2>
                        <Row>
                            <Col md={5}>
                                <div className="filters">
                                    <div className="date">
                                    <InputGroup>
                                        <DatePicker
                                            className="form-control"
                                            selected={startDate}
                                            onChange={onChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            locale="pt-BR"
                                            dateFormat="dd/MM/yyyy"
                                            selectsRange
                                        />
                                        <Button onClick={refetchFunction} >
                                            Buscar por Data
                                        </Button>
                                    </InputGroup>
                                    </div>
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="filters">
                                    <InputGroup>
                                        <Form.Control
                                            id="searchNumber"
                                            type="number"
                                            placeholder="Nº do pedido"
                                            onChange={filterByNumber}
                                            value={searchNumber}
                                        />
                                        <Button onClick={refetchFunction} type="submit" id="button-addon2">
                                            Buscar por Nº
                                        </Button>
                                    </InputGroup>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className="">
                                    <div className="filters">
                                        <Button variant="success">Salvar Pedidos</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Cliente</th>
                                    <th>Produto</th>
                                    <th>Data Venda</th>
                                    <th>Marketplace</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* { isLoading ? <tr><td colSpan={5}><span>load</span></td></tr>  :
                                    !data ? <tr><td colSpan={5}><span>Importe os pedidos</span></td></tr> :
                                    data?.orders.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order?.pedido.cliente?.nome}</td>
                                            <td>
                                                {order?.pedido.itens?.map((i, index) => {
                                                    let qtd = i.item.quantidade.split('.')
                                                    let total = qtd[0]
                                                    return(
                                                        <span key={index}>{total}un - {i?.item.descricao}</span>
                                                    )
                                                    })
                                                }
                                            </td>
                                            <td>{moment(order?.pedido.data).format("DD/MM/YYYY")}</td>
                                            <td>{
                                                    order?.pedido.tipoIntegracao === 'Api' 
                                                    ? 
                                                        getSecondWord(order?.pedido.observacaointerna)
                                                    : 
                                                    order?.pedido.tipoIntegracao
                                                }
                                            </td>
                                        </tr>
                                    )
                                })} */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
