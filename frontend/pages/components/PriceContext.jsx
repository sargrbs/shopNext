import { createContext, useState, useContext } from "react"

export const PriceContext = createContext({});

export const PriceProvider = ({ children }) => {
    // const [showAlert, setShowAlert] = useState(false)
    const [itemPrice, setItemPrice] = useState()


    const functionPrice = (price) => {
       
        setItemPrice(price)
    }

    return (
        <PriceContext.Provider
            value={{ functionPrice, itemPrice}}
        >
            {children}
        </PriceContext.Provider>
    )
}



const usePrice = () => {
    const context = useContext(PriceContext)

    return context
}

export default usePrice