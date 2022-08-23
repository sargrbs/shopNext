import React from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
import useToast from './HookToast'

export default function ToastSuccess(){
    const {showToast, toastMessage, ToastTitle, success, error} = useToast()
    return (
    <>
        <ToastContainer className="p-3" position="top-end">
            <Toast className="d-inline-block m-1"
            bg="success"
            onClose={() => showToast(null, null, false, false)}
            show={success} delay={3000} autohide
            >
            <Toast.Header>
                <strong className="me-auto">{ToastTitle}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
   )
}