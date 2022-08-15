import { createContext, useState } from "react"
import ToastSuccess from './ToastSuccess'
import ToastError from './ToastError'

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    // const [showAlert, setShowAlert] = useState(false)
    const [toastMessage, setToastMessage] = useState()
    const [ToastTitle, setToastTitle] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)


    const showToast = (message, title, success, error) => {
       
        setToastMessage(message)
        setToastTitle(title)
        setSuccess(success)
        setError(error)
    }

  return (
    <ToastContext.Provider
      value={{ showToast, toastMessage,
        ToastTitle,
        success,
        error, }}
    >
      {children}
    </ToastContext.Provider>
  )
}
