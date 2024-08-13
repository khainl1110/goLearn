import axios from "axios"
import { useEffect } from "react"

export default function App() {
    useEffect(() => {
        axios('http://127.0.0.1:8080/ping')
        .then(data => console.log(data))
    }, [])
    return (
        <div>
            <h1>Testing</h1>
        </div>
    )
}