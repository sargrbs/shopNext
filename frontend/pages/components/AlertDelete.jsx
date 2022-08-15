import React, {useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ToastError from './ToastError'
import ToastSuccess from './ToastSuccess'

export default function AlertDelete(props) {

    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState('')
    const [ToastTitle, setToastTitle] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function deleteItem(){

    // }
    const queryClient = useQueryClient()

    const { mutate: deleteItem } = useMutation(
        async () => {
          return await axios.delete(`${props.url}/${props.id}`)
        },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries(props.queryInvalidate)
            setSuccess(true)
            setToastTitle('Item Excluido')
            setToastMessage(`Sucesso ao deletar item ${props.item}`)
          },
          onError: (err) => {
            setError(true)
            setToastTitle('Erro ao Excluir')
            setToastMessage(err)
          },
        }
      )

    
    return (
        <>
            <ToastSuccess 
                success={success}
                alert={success}
                title={ToastTitle}
                message={toastMessage}
            />
            <ToastError
                error={error}
                alert={error}
                title={ToastTitle}
                message={toastMessage}
            />
            <Modal show={show} onHide={handleClose} style={{color: "#444"}}>
                <Modal.Header closeButton>
                    <Modal.Title >Deletar item {props.item}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão do item??
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deleteItem}>
                        Sim !!! Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <Button variant="danger" onClick={handleShow}>
                Deletar
            </Button>
        </>
    )
}