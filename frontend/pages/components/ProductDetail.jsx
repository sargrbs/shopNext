import React, {useState} from 'react'
import {Modal, Button, Table} from 'react-bootstrap'

export default function ProductDetail(props) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () =>  setShow(true) 
   

   console.log(props.content)
    return (
        <>
           
            <Modal 
                show={show} 
                onHide={handleClose} 
                style={{color: "#444"}} 
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title >Detalhes do item {props.content.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Table responsive striped bordered hover>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>GTIN</th>
                            <td style={{textAlign: "center"}}>{props.content.gtin}</td>
                        </tr>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>Altura</th>
                            <td style={{textAlign: "center"}}>{props.content.height}</td>
                        </tr>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>Largura</th>
                            <td style={{textAlign: "center"}}>{props.content.width}</td>
                        </tr>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>Comprimento</th>
                            <td style={{textAlign: "center"}}>{props.content.length}</td>
                        </tr>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>Peso Liquido</th>
                            <td style={{textAlign: "center"}}>{props.content.nettWeight}</td>
                        </tr>
                        <tr>
                            <th style={{borderRight: "1px solid #000", width: "50%", textAlign: "center"}}>Peso Bruto</th>
                            <td style={{textAlign: "center"}}>{props.content.grossWeight}</td>
                        </tr>
                   </Table>
                </Modal.Body>
               
            </Modal>
            
            <Button variant="warning" onClick={handleShow}>
                Detalhes
            </Button>
        </>
    )
}