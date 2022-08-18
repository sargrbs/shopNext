import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Modal, Button, Table, Form} from 'react-bootstrap'
import {useQuery} from '@tanstack/react-query'
import usePrice from './PriceContext'

async function getData({queryKey}){
  const code = queryKey[1]
  const url = process.env.AXIOS_URL
  const result = await axios.get(`${url}getByUrl/?url=${code}`)

  return result
}


export default function GetPriceItem(props) {

    const code = props.url
    const {data, isFetching, isFetched} = useQuery(['itemUrl', code], getData)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const {functionPrice} = usePrice()

    const [checked, setChecked] = useState();

    function handleChange(e){
        const target = e.target.getAttribute("data-id")
        setChecked(Number(target))
        functionPrice(e.target.value)
    }
  
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><span style={{color: "#444"}}>Tabelas de Preço</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table  responsive striped bordered hover >
                        <thead>
                           <tr> 
                                <th>Tabela</th>
                                <th>Preço</th>
                                <th>Promoção</th>
                                <th>Selecione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetched ? 
                                data.data.result.dados.precos.map((preco, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{preco.tabela}</td>
                                            <td>{preco.preco}</td>
                                            <td>{preco.promocional ? "Sim" : "Não"}</td>
                                            <td><Form.Check 
                                                    type="checkbox" 
                                                    id={index} 
                                                    checked={checked === index ? true : false} 
                                                    value={preco.preco} 
                                                    onChange={handleChange}  
                                                    data-id={index}
                                                    aria-label={preco.preco} 
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            
                            : null}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            
            <Button variant="primary" onClick={handleShow}>
                Ver Tabelas
            </Button>
        </>
    )
}