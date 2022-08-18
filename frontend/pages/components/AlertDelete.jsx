import React, {useState} from 'react'
import axios from 'axios'
import {Modal, Button} from 'react-bootstrap'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import useToast from '../components/HookToast'

export default function AlertDelete(props) {

    const [show, setShow] = useState(false);
    const {showToast} = useToast()
    const item = props.item

    const handleClose = () => setShow(false);
    const handleShow = () =>  setShow(true) 
   
    const queryClient = useQueryClient()

    const { mutate: deleteItem } = useMutation(
        async () => {
          return await axios.delete(`${props.url}/${props.id}`)
        },
        {
          onSuccess: (res) => {
            showToast(`Sucesso ao deletar item ${item}`, 'Item Excluido', true, false)
            queryClient.invalidateQueries(props.queryInvalidate)
          },
          onError: (err) => {
            console.log('error')

            showToast(`Erro ao deletar item ${item} / ${err}`, 'Erro ao Excluir', false, true)
          },
        }
      )
     
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
            
            <Button variant="danger" onClick={handleShow} style={props.color ? {color: `#${props.color}`} : null} className={props.class ? props.class : null}>
                Deletar
            </Button>
        </>
    )
}