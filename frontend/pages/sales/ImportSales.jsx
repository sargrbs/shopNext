import React, {useState} from 'react'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup, ToastContainer,
    Toast, Spinner} from 'react-bootstrap'
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

async function getOrders({queryKey}){
    const startDate  = queryKey[1]
    const endDate = queryKey[2]
    const name = queryKey[3]

    const { data } = await axios.get(`http://localhost:80/getOrderToShopApi/?start=${startDate}&end=${endDate}&name=${name}`);
    return data
}

export default function ImportSales() {
    const url = process.env.AXIOS_URL


    const {showToast} = useToast()

    const [name, setSearchname] = useState("")

    const [btnDisabled, setBtnDisabled] = useState(true)

    const [startDate, setStartDate] = useState(new Date(moment().subtract(1, 'days')))
    
    const [endDate, setEndDate] = useState(new Date())
    
    const [show, setShow] = useState(true)
            

    const onChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)

        if(start && end){
            setStartDateGet(moment(start).format('YYYY-MM-DDT00:00:00.000Z'))
            setEndDateget(moment(end).format('YYYY-MM-DDT00:00:00.000Z'))
        }
    }

    function filterByName(e){
        const name = e.target.value
        setSearchname(name)
    }

    const [startDateGet, setStartDateGet] = useState(moment(new Date()).subtract(2, 'days').format('YYYY-MM-DDT00:00:00.000Z'))
    
    const [endDateget, setEndDateget] = useState(moment(new Date()).format('YYYY-MM-DDT00:00:00.000Z'))
    
    const {data, refetch, isFetched, isLoading} = useQuery(['getOrders', startDateGet, endDateget, name], getOrders, {refetchOnWindowFocus: false, enable: false})
    
    const [arraySuccess, setArraySuccess] = useState([])

    const [arrayError, setArrayError] = useState([])

    const { mutate: create} = useMutation(
        async (data) => { return axios.post(`${url}createClient`, data) },
        {
            onSuccess: (res) => {
                setArraySuccess(res.data.msgSuccess)
                setArrayError(res.data.msgError)
                setShow(true)
                setBtnDisabled(false)
            },
            onError: (err) => {
                console.log(err, 'erro')
                showToast(`Erro ao adicionar cliente / ${err}`, 'Erro ao criar cliente', false, true)
            },
        }
    )
    const { mutate: createSale} = useMutation(
        async (data) => { return axios.post(`${url}createSale`, data) },
        {
            onSuccess: (res) => {
                setArraySuccess(res.data.msgSuccess)
                setArrayError(res.data.msgError)
                setShow(true)
                setBtnDisabled(false)
            },
            onError: (err) => {
                console.log(err, 'erro')
                showToast(`Erro ao adicionar cliente / ${err}`, 'Erro ao criar cliente', false, true)
            },
        }
    )

    const clients = []
    const sales = []
    async function getProductsInfo(code){
        const result = await axios.get(`${url}productByErpCode/${code}`)
        return result
    }
    if(isFetched){
        if(data){
            data.map(sale => {
                const verifyCpfCnpj = sale.cpf_cliente.length
                const name = sale.nome_cliente.split(' ', sale.nome_cliente.length)
                const fantasia = name.pop()
                clients.push({
                    nome: name.join(" "),
                    fantasia: fantasia,
                    tipo: 'C',
                    fisicaJuridica: verifyCpfCnpj > 11 ? 'J' : 'F',
                    cpfCnpj: sale.cpf_cliente,
                    // rg: sale.pedido.cliente.rg,
                    // Ie: sale.pedido.cliente.ie === null ? 'ISENTO' : sale.pedido.cliente.ie,
                    cep: sale.cep,
                    endereco: sale.endereco,
                    // numero: sale.pedido.transporte.enderecoEntrega.numero,
                    complemento: sale.complemento,
                    bairro: sale.bairro,
                    cidade: sale.cidade,
                    uf: sale.estado,
                    pais: "",
                    telefone1: sale.telefone_cliente,
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
                    // IndicadorIE: sale.pedido.cliente.ie === null ? 9 : 1,
    
                })  
            })
           
    
            data.map(sale => {
                const arrayProdutcs = []
                console.log(sale)
                if(sale.products){
                    
                    Promise.all(sale.products.map( async (p) => {
                        const data = await getProductsInfo(p.erp_code)
                        let cor = null
                        let tamanho = null
                        data.data.aux.map(a => {
                            if(a.group === 'cores'){
                                return(
                                    cor = a.code
                                )
                            }
                            if(a.group === 'tamanhos'){
                                return(
                                    tamanho = a.code
                                )
                            }
                        })
                        arrayProdutcs.push(
                            {
                                Codigo: data.data.code,
                                CodigoCor: cor,
                                CodigoTamanho: tamanho,
                                Quantidade: p.quantity,
                                PrecoUnitario: p.price,
                                DescontoUnitario: p.discount
                            }
                        )
                        
                    }))
                }
                
                const address = sale.endereco.split('-')
                sales.push({
                    
                    CpfCnpj: sale.cpf_cliente,
                    CodigoOperacao: "500",
                    CodigoCaixa: "1",
                    Data: sale.data_venda,
                    Produtos: arrayProdutcs,
                    Recebimentos: [
                        {
                        ValorParcelas: sale.valor_total,
                        valor: sale.valor_total,
                        CodigoAdministradora: null,
                        Vencimento: null,
                        Nsu: null,
                        QuantidadeParcelas: "1",
                        NumeroCartao: null,
                        Tipo: "CB"
                        }
                    ],
                    DadosEntrega: {
                    Valor: sale.valor_frete,
                    OpcoesFretePagoPor: "O",
                    PesoBruto: 0.0,
                    PesoLiquido: 0.0,
                    Volume: sale.volumes,
                    DataEntrega: null,
                    CnpjTransportadora: sale.transportadora.cnpj,
                    NaoSomarFreteTotalNota: true,
                    OutroEndereco: {
                        Cep: sale.cep,
                        Endereco: address[0],
                        Numero: address[1],
                        Complemento: sale.complemento,
                        Bairro: sale.bairro,
                        Cidade: sale.cidade,
                        Uf: sale.estado
                        }
                    }      
                })  
            })
        }
    }

    console.log(sales)

    function createClient(){
        create(clients)
    }

    function createSales(){
        createSale(sales)
    }
    return (
        <>
            <Container>
                {arraySuccess.length != 0 ? 
                     <ToastContainer className="p-3" position="top-end">
                       { arraySuccess.map((msg, index) => {
                            return(
                                <Toast
                                    key={index}
                                    bg="success"
                                    onClose={() => setShow(false)}
                                    show={show} delay={3000} autohide
                                    >
                                    <Toast.Header>
                                        <strong className="me-auto">Importado Com sucesso</strong>
                                    </Toast.Header>
                                    <Toast.Body>{msg}</Toast.Body>
                                </Toast>
                            )
                        })}
                    </ToastContainer>
                : null }

                {arrayError.length != 0 ?
                    <ToastContainer className="p-3" position="top-end">
                        {arrayError.map((msg, index) => {
                           return(
                                <Toast key={index}
                                    bg="danger"
                                    onClose={() => setShow(false)}
                                    show={show} delay={10000}
                                >
                                    <Toast.Header>
                                        <strong className="me-auto">Erro</strong>
                                    </Toast.Header>
                                    <Toast.Body>{msg}</Toast.Body>
                                </Toast>
                           )
                        
                        })}
                    </ToastContainer>
                : null }
                <ToastSuccess />
                <ToastError />
                <Row>
                    <Col md='12'>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Importar para o Shop 9</h2>
                        <Row style={{marginBottom: 10}}>
                            <Col md={4}>
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
                                        <Button onClick={refetch} >
                                            Buscar
                                        </Button>
                                    </InputGroup>
                                    </div>
                                </div>
                            </Col>

                            <Col md={3}>
                                <div className="filters">
                                    <InputGroup>
                                        <Form.Control
                                            id="searchName"
                                            type="text"
                                            placeholder="Nome do Cliente"
                                            onChange={filterByName}
                                            value={name}
                                        />
                                        <Button onClick={refetch} type="submit" id="button-addon2">
                                            Buscar
                                        </Button>
                                    </InputGroup>
                                </div>
                            </Col>

                            <Col md={5}>
                                <div className="">
                                    <div className="filters">
                                        <Button variant="success" onClick={createClient}>Enviar Cliente</Button>
                                        <Button variant="primary" onClick={createSales} disabled={btnDisabled}>Enviar Venda</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Table responsive striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Cliente</th>
                                    {/* <th>Produto</th> */}
                                    <th>Data Venda</th>
                                    {/* <th>Marketplace</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                { isLoading ?   <tr>
                                                    <td colSpan={5}>
                                                        <Spinner animation="border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </Spinner>
                                                    </td>
                                                </tr>  :
                                    !data ? <tr><td colSpan={5}><span>Nenhum pedido encontrado, tente outra data ou importe do Bling</span></td></tr> :
                                    data.map((order, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order.nome_cliente}</td>
                                            {/* <td>
                                                {order?.pedido.itens?.map((i, index) => {
                                                    let qtd = i.item.quantidade.split('.')
                                                    let total = qtd[0]
                                                    return(
                                                        <span key={index}>{total}un - {i?.item.descricao}</span>
                                                    )
                                                    })
                                                }
                                            </td> */}
                                            <td>{moment(order.data_venda).format("DD/MM/YYYY")}</td>
                                            {/* <td>{
                                                    order?.pedido.tipoIntegracao === 'Api' 
                                                    ? 
                                                        getSecondWord(order?.pedido.observacaointerna)
                                                    : 
                                                    order?.pedido.tipoIntegracao
                                                }
                                            </td> */}
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
