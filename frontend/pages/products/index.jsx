import React, {useState} from 'react'
import styles from '../../styles/products/Products.module.css'
import axios from 'axios'
import {Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import Header from '../modules/Header'
import {useQuery, useMutation} from '@tanstack/react-query'
import GetPriceItem from '../components/GetPriceItem'
import AuxName from '../components/AuxName'
import createManyItens from './components/createManyItens'
import useToast from '../components/HookToast'
import ToastSuccess from '../components/ToastSuccess'
import ToastError from '../components/ToastError'


async function getData({queryKey}){
  const page = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getProducts/${page}`)
  return result.data
}

export default function Products() {
  const url = process.env.AXIOS_URL
  
  const {showToast} = useToast()

  const [page, setPage] = useState(1)

  const {data, isFetching} = useQuery(['products', page], getData, {refetchOnWindowFocus: false,})

  function nextPage(){
    let p = page + 1

    setPage(p)
  }
  function previousPage(){
    let p = page - 1

    setPage(p)
  }

  const { mutate: create} = useMutation(
    async (data) => { return axios.post(`${url}createManyProducts`, data) },
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

  const createMany = []

  //Create array with products to save
  async function saveProducts(){
    await Promise.all(data.dados?.map( async (p, index) => {
      const product = await createManyItens({code: p.codigo, type: p.tipo})
      createMany.push(product)
    }))
    create({createMany})
    console.log(createMany)
  }

  const arrayProducts = []

  function handleSelect(e){
    const datacode = e.target.getAttribute("data-code")
    const datatype = e.target.getAttribute("data-type")

    const product = {code: datacode, type: datatype}

    arrayProducts.push(product)
  }

  console.log(arrayProducts)
  

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
            <h2 style={{borderBottom: "2px solid rgb(89, 44, 44)", paddingBottom: 5}}>Produtos</h2>
            <Button variant="warning" onClick={previousPage} disabled={page === 1 ? true : false}>Anterior</Button>{' '}
            <Button onClick={nextPage} disabled={data?.tipo === 'FIM_DE_PAGINA' ? true : false}>Próximo</Button>{' '}
            <Button variant="success" onClick={saveProducts}>Importar Produtos</Button>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Selecionar</th>
                  <th>nome</th> 
                  <th>codigo</th> 
                  <th>codigoBarras</th> 
                  <th>codigoClasse</th> 
                  <th>codigoFabricante</th> 
                  <th>codigoFamilia</th> 
                  <th>codigoGrupo</th> 
                  <th>codigoMoeda</th> 
                  <th>codigoSubclasse</th> 
                  <th>codigoUnidadeVenda</th> 
                  <th>comprimento</th> 
                  <th>estoqueAtual</th> 
                  <th>inativo</th> 
                  <th>largura</th> 
                  <th>altura</th> 
                  <th>nomeSite</th>
                  <th>ordem</th>
                  <th>tipo</th> 
                  <th>urlDetalhe</th> 
                  <th>urlEstoqueDetalhe</th> 
                  <th>urlFotos</th>
                  <th>urlPromocoes</th>
                  <th>urlTabelaPreco</th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? <tr><td colSpan={34}>Loading</td></tr> :
                data.dados === null ? <tr><td colSpan={34}>{data?.mensagem}</td></tr> :
                  data.dados?.map((product, index) => {

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td> 
                        <td>
                          <Form.Check  
                            data-code={product.codigo} 
                            data-type={product.tipo} 
                            aria-label={product.codigo} 
                            onChange={handleSelect} 
                          />
                        </td>
                        <td>{product.nome}</td> 
                        <td>{product.codigo}</td> 
                        <td>{product.codigoBarras}</td> 
                        <td><AuxName group="classes" code={product.codigoClasse} queryName={`classe${product.codigoClasse}`}/></td> 
                        <td><AuxName group="fabricantes" code={product.codigoFabricante} queryName={`fabricantes${product.codigoFabricante}`}/></td> 
                        <td><AuxName group="familias" code={product.codigoFamilia} queryName={`familia${product.codigoFamilia}`}/></td> 
                        <td><AuxName group="grupos" code={product.codigoGrupo} queryName={`grupo${product.codigoGrupo}`}/></td> 
                        <td><AuxName group="moedas" code={product.codigoMoeda} queryName={`moeda${product.codigoMoeda}`}/></td>
                        <td><AuxName group="subclasses" code={product.codigoSubclasse} queryName={`subclasse${product.codigoSubclasse}`}/></td> 
                        <td><AuxName group="unidades_venda" code={product.codigoUnidadeVenda} queryName={`unidadevenda${product.codigoUnidadeVenda}`}/></td> 
                        <td>{product.comprimento}</td> 
                        <td>{product.estoqueAtual}</td> 
                        <td>{product.inativo}</td> 
                        <td>{product.largura}</td> 
                        <td>{product.altura}</td> 
                        <td>{product.nomeSite}</td>
                        <td>{product.ordem}</td>
                        <td>{product.tipo}</td> 
                        <td>{product.urlDetalhe}</td> 
                        <td>{product.urlEstoqueDetalhe}</td> 
                        <td>{product.urlFotos}</td>
                        <td>{product.urlPromocoes}</td>
                        <td><GetPriceItem url={product.urlTabelaPreco}/></td>
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
