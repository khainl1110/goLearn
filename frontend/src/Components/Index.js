import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Button from '@mui/material/Button';

const LogInContext = createContext();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    useEffect(() => {
        try {
            axios('http://127.0.0.1:8080/items/66c5ffcae2136b147d5ede5e')
            .then(data => console.log(data))
        } catch {
            console.log("Having error")
        }
    }, [])
    return (
        <div>
            <LogInContext.Provider value = {[isLoggedIn, setIsLoggedIn]}>
                <h1>Welcome to e commerce app</h1>
                {
                    isLoggedIn ? <Button> LoggedIn</Button> :
                    <Button> Sign in</Button>
                }
            </LogInContext.Provider>
        </div>
    )
}