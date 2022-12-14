import React, {useState, useEffect} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form, InputGroup} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import GetPriceItem from '../components/GetPriceItem'
import AuxName from '../components/AuxName'
import {v4 as uuidv4} from 'uuid'
import useToast from '../components/HookToast'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'
import usePrice from '../components/PriceContext'

async function getData({queryKey}){
  const code = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getProduct/${code}`)

  return result
}

export default function Products() {
    const url = process.env.AXIOS_URL

    const {itemPrice} = usePrice()
    
    const {showToast} = useToast()

    const [code, setCode] = useState("")
    
    const {data, isFetching, refetch, isFetched} = useQuery(['product', code], getData, {refetchOnWindowFocus: false, enabled: false})
    

    function searchItem(){
        refetch()
    }

    const { mutate: create} = useMutation(
        async (data) => { return axios.post(`${url}createProduct`, data) },
        {
        onSuccess: (res) => {
            showToast(`Sucesso ao adicionar Produto ${res.data.name}`, 'Produto adicionado', true, false)
        },
        onError: (err) => {
            console.log(err)
            showToast(`Erro ao adicionar produto / Code: ${err.response.data.code}`, 'Erro ao Importar', false, true)
        },
        }
    )

    async function getAuxId(code, group){
        const getId = await axios.get(`${url}getAuxId/?code=${code}&group=${group}`)
        return getId.data.id
    }

    async function getAuxName(code, group){
        const getId = await axios.get(`${url}getAuxId/?code=${code}&group=${group}`)

        return getId.data.name
    }
    
    async function createProduct(){
        const productId = uuidv4()
            
        const variations = await Promise.all(data.data.grid.dados.lista?.map( async (product, index)  => 
               
            {
                let colorName = await getAuxName(product.codigoCor, 'cores')
                let weightName = await getAuxName(product.codigoTamanho, 'tamanhos')
                let variationName = colorName + '-' + weightName
                let coresId =  await getAuxId(product.codigoCor, 'cores')
                let tamanhosId =  await getAuxId(product.codigoTamanho, 'tamanhos')
            
                return {
                    id:  uuidv4(),
                    name:  variationName,
                    code: product.codigoCompleto,
                    productStock:{
                        create: {
                            id: uuidv4(),
                            quantity: product.estoqueAtual,
                            product: {
                                connect: {id: productId}
                            }
                        }
                    },
                    auxs: {
                        create: [
                        {
                            assignedBy: colorName + '-' + weightName,
                            assignedAt: new Date(),
                            aux: {
                                connect: {id: coresId},
                                
                            }
                        },
                        {
                            assignedBy: weightName + '-' + colorName,
                            assignedAt: new Date(),
                            aux:{
                                connect: {id: tamanhosId},
                            }
                        }
                    ]
                    
                    },
                }
            }
        ))
        const product = {
            createProduct: {
                id: productId,
                code_default: Number(data.data.productDetail?.dados.codigo),
                name: data.data.productDetail?.dados.nome,
                type: data.data.productDetail?.dados.tipo,
                gtin: data.data.productDetail?.dados.codigoBarras,
                nettWeight: data.data.productDetail?.dados.pesoLiquido,
                grossWeight: data.data.productDetail?.dados.pesoBruto,
                height: data.data.productDetail?.dados.altura,
                width: data.data.productDetail?.dados.largura,
                length: data.data.productDetail?.dados.comprimento,
                currentsupply: data.data.productDetail?.dados.estoqueAtual,
                detailurl:  data.data.productDetail?.dados.urlDetalhe,
                urldetailstock: data.data.productDetail?.dados.urlEstoqueDetalhe,
                urlpricetable: data.data.productDetail?.dados.urlTabelaPreco,
                urloffers: data.data.productDetail?.dados.urlPromocoes,
                urlpics: data.data.productDetail?.dados.urlFotos,
                price: itemPrice,
                auxs: {
                    create: [
                        {
                            assignedBy: data.data.productDetail?.dados.nome,
                            assignedAt: new Date(),
                            aux:{
                                connect:
                                    {id: await getAuxId(data.data.productDetail?.dados.codigoClasse, 'classes')},
                                
                            }
                        },
                        {
                            assignedBy: data.data.productDetail?.dados.nome,
                            assignedAt: new Date(),
                            aux:{
                                connect:
                                    {id: await getAuxId(data.data.productDetail?.dados.codigoFabricante, 'fabricantes')},
                                
                            }
                        }
                    ]
                    
                },
                ProductVariations: {
                    create: variations
                }
            }
        }
        create(product)
    }

    async function createProductSingle(){

        const totalStock = data.data.product?.dados.estoqueFiliais?.map(filial => Number(filial.estoqueAtual)).reduce((prev, curr) => prev + curr, 0)
        
        const product = {
            createProduct: {
                id: uuidv4(),
                code_default: Number(data.data.productDetail?.dados.codigo),
                name: data.data.productDetail?.dados.nome,
                type: data.data.productDetail?.dados.tipo,
                gtin: data.data.productDetail?.dados.codigoBarras,
                nettWeight: data.data.productDetail?.dados.pesoLiquido,
                grossWeight: data.data.productDetail?.dados.pesoBruto,
                height: data.data.productDetail?.dados.altura,
                width: data.data.productDetail?.dados.largura,
                length: data.data.productDetail?.dados.comprimento,
                currentsupply: data.data.productDetail?.dados.estoqueAtual,
                detailurl:  data.data.productDetail?.dados.urlDetalhe,
                urldetailstock: data.data.productDetail?.dados.urlEstoqueDetalhe,
                urlpricetable: data.data.productDetail?.dados.urlTabelaPreco,
                urloffers: data.data.productDetail?.dados.urlPromocoes,
                urlpics: data.data.productDetail?.dados.urlFotos,
                price: itemPrice,
                auxs: {
                    create: [
                        {
                            assignedBy: data.data.productDetail?.dados.nome,
                            assignedAt: new Date(),
                            aux:{
                                connect:
                                    {id: await getAuxId(data.data.productDetail?.dados.codigoClasse, 'classes')},
                                
                            }
                        },
                        {
                            assignedBy: data.data.productDetail?.dados.nome,
                            assignedAt: new Date(),
                            aux:{
                                connect:
                                    {id: await getAuxId(data.data.productDetail?.dados.codigoFabricante, 'fabricantes')},
                                
                            }
                        }
                    ]
                },
                ProductStock: {
                    create:{
                        id: uuidv4(),
                        quantity: totalStock
                    }
                }

            }
        }
        console.log(product)
        create(product)
    }
    return (
        <>
            <ToastSuccess/>
            <ToastError />
            <Row>
                <Col md='12'>
                    <Header/>
                </Col>
            </Row>
            <Container>
                <Row>
                    <Col md="12">
                        <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Importar Produto do Shop 9</h2>

                        <Row>
                            <Col md="5">
                                <InputGroup style={{marginBottom: 10}}>
                                    <Form.Control
                                        type="text"
                                        id="inputCode"
                                        onChange={(e) => setCode(e.target.value)}
                                        value={code}
                                        placeholder="Digite o c??digo do produto"
                                    />
                                    <Button onClick={searchItem}variant="outline-primary" id="searchButton">
                                        Buscar
                                    </Button>
                                </InputGroup>
                            </Col>
                            <Col md="7">
                                {!isFetched ? null :
                                <Button onClick={data.data.grid?.dados === null ? createProductSingle : createProduct }>Salvar Produto</Button>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Detalhes</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>nome</th> 
                                            <th>codigo</th> 
                                            <th>codigoBarras</th> 
                                            <th>TabelaPreco</th> 
                                            <th>codigoClasse</th> 
                                            <th>codigoFabricante</th> 
                                            <th>codigoUnidadeVenda</th>
                                            <th>inativo</th>
                                            <th>nomeSite</th> 
                                            <th>ordem</th> 
                                            <th>tipo</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                            data.data.productDetail?.dados === null ? <tr><td colSpan={34}>{data.data.productDetail?.mensagem}</td></tr> :
                                        
                                            <tr>
                                                <td>{data.data.productDetail?.dados.nome}</td> 
                                                <td>{data.data.productDetail?.dados.codigo}</td> 
                                                <td>{data.data.productDetail?.dados.codigoBarras}</td> 
                                                <td><GetPriceItem url={data.data.productDetail?.dados.urlTabelaPreco}/></td>
                                                <td><AuxName group="classes" code={data.data.productDetail?.dados.codigoClasse} queryName={`classe${data.data.productDetail?.dados.codigoClasse}`}/></td> 
                                                <td><AuxName group="fabricantes" code={data.data.productDetail?.dados.codigoFabricante} queryName={`fabricante${data.data.productDetail?.dados.codigoFabricante}`} /> </td> 
                                                <td><AuxName group="unidades_venda" code={data.data.productDetail?.dados.codigoUnidadeVenda} queryName={`unidade${data.data.productDetail?.dados.codigoUnidadeVenda}`}/></td>
                                                <td>{data.data.productDetail?.dados.inativo}</td>
                                                <td>{data.data.productDetail?.dados.nomeSite}</td>
                                                <td>{data.data.productDetail?.dados.ordem}</td>
                                                <td>{data.data.productDetail?.dados.tipo}</td>
                                            </tr>
                                        
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Estoque</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>codigo</th>
                                            <th>tipoEstoque</th>
                                            <th>urlDetalhe</th>
                                            <th>estoqueFiliais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                        data.data.product?.dados === null ? <tr><td colSpan={34}>{data.data.product?.mensagem}</td></tr> :
                                        
                                            <tr>
                                                <td>{data.data.product?.dados.codigo}</td>
                                                <td>{data.data.product?.dados.tipoEstoque}</td>
                                                <td>{data.data.product?.dados.urlDetalhe}</td>
                                                <td><ul>{data.data.product?.dados.estoqueFiliais?.map((filial, index) => {
                                                    return (
                                                        <li key={index} style={{borderBottom: '1px solid #fff', marginBottom: 5}}>
                                                            <span>Filial: {filial.codigoFilial}</span>{" - "}
                                                            <span>Estoque: {filial.estoqueAtual}</span>
                                                        </li>
                                                    )
                                                })}</ul></td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>Estoque Produto Grade</h3>
                                <Table responsive striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>codigoCompleto</th>
                                            <th>codigoCor</th>
                                            <th>codigoTamanho</th>
                                            <th>codigoFilial</th>
                                            <th>estoqueAtual</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!isFetched ? <tr><td colSpan={34}>Loading</td></tr> :
                                        data.data.grid?.dados === null ? <tr><td colSpan={34}>{data.data.grid.mensagem}</td></tr> :
                                        data.data.grid.dados.lista?.map((product, index) => {
                                            return (
                                        
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.codigoCompleto}</td>
                                                    <td><AuxName group="cores" code={product.codigoCor} queryName={`cor${product.codigoCor}`}/></td>
                                                    <td><AuxName group="tamanhos" code={product.codigoTamanho} queryName={`tam${product.codigoTamanho}`}/></td>
                                                    <td>{product.codigoFilial}</td>
                                                    <td>{product.estoqueAtual}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
