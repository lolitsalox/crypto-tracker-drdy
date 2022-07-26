import React, { useState, createContext, useContext, useEffect } from 'react'

const Crypto = createContext()

function CryptoContext({children}) {

    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    // Anytime the currency changes, it will set the symbol accordingly 
    useEffect(() => {
        switch (currency) {
            case "USD":
                setSymbol("$")
                break
            case "ILS":
                setSymbol("₪")
                break
            case "EUR":
                setSymbol("€")
                break;
            case "RUB":
                setSymbol("₽")
                break;
            default:
                break;
        }
    }, [currency])

    return <Crypto.Provider value={{currency, symbol, setCurrency}}>{children}</Crypto.Provider>

}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto)
}