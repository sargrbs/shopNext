import React, {useState} from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'


export default function ToastSuccess(props){
    const [showAlert, setShowAlert] = useState(props.success)

   return (
    <>
        {props.success ?
            <ToastContainer className="p-3" position="top-end">
                <Toast className="d-inline-block m-1"
                bg="success"
                onClose={() => setShowAlert(false)}
                show={showAlert} delay={3000} autohide
                >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{props.title}</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            : null
        }
    </>
   )
}