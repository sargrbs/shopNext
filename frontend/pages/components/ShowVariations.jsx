import React, {useState} from "react";
import {Modal, Button, Table} from 'react-bootstrap'

const ShowVariations = (props) => {

    const data = props.variations
    const productId = props.productId

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><span style={{color: "#444"}}>Variações</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table  responsive striped bordered hover >
                        <thead>
                           <tr> 
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Código ERP Web</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((variation, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{variation.name}</td>
                                        <td>{variation.productStock?.quantity}</td>
                                        <td>{variation.web_erp_code}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
            
            <Button variant="primary" onClick={handleShow}>
                Variações
            </Button>
    
        </>
    )
}


export default ShowVariations;
