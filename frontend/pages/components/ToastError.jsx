import React, {useState} from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
import useToast from './HookToast'


export default function ToastError(){
    const {showToast, toastMessage, ToastTitle, success, error} = useToast()

   return (
        <>
            <ToastContainer className="p-3" position="top-end">
                <Toast className="d-inline-block m-1"
                    bg="danger"
                    onClose={() => showToast(null, null, false, false)}
                    show={error} delay={3000}
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