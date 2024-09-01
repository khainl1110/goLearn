import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { makeStyles, TextField } from "@mui/material";
import MainApp from "./MainApp";

const LoggedInContext = createContext();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showingLogIn, setShowingLogIn] = useState(true)
    // useEffect(() => {
    //     try {
    //         axios('http://127.0.0.1:8080/users/66ca38291928be1084eaf098')
    //         .then(data => console.log(data))
    //     } catch {
    //         console.log("Having error")
    //     }
    // }, [])

    return (
        <div>
            <LoggedInContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
                <h1>Welcome to e commerce app</h1>
                {
                    isLoggedIn ? 
                    <>
                        <MainApp />
                        <Button onClick={() => setIsLoggedIn(false)}>Log out </Button>
                    </>
                    :
                    <>
                        <h3>You are not logged in</h3>
                        <Button onClick = {() => setShowingLogIn(true)}>Log in</Button>
                        <Button onClick={() => setShowingLogIn(false)}>Sign up</Button>
                        {showingLogIn ? <LogIn /> : <SignUp />}
                    </>
                }
            
            
            </LoggedInContext.Provider>
        </div>
    )
}

function LogIn() {
    let {isLoggedIn, setIsLoggedIn} = useContext(LoggedInContext)
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

    let LogIn = async () => {
        axios.post('http://127.0.0.1:8080/users/logIn', {
            "name": userName,
            "password": password
        }).then(res => {return res.data})
        .then(data => {
            setIsLoggedIn(true)
        })
        .catch(err => alert("Wrong username and password"))
    }

    let inputs = [
        {
            label: 'Username',
            value: userName,
            onChange: (e) => setUserName(e.target.value)
        }, 
        {
            label: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value)
        }
    ]
    return(
        <div>
            <h2>Log in</h2>
            {
                inputs.map(input => {
                    return(
                        <>
                        <TextField label = {input.label} value = {input.value} onChange={input.onChange} size = "small" variant="standard"/>
                        <div></div>
                        </>
                    )
                })
            }
            <Button onClick={LogIn}>Submit</Button>
        </div>
    )
}

function SignUp() {
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [rePassword, setRePassword] = useState('')

    let SignUp = () => {
        axios.post('http://127.0.0.1:8080/users', {
            "name": userName,
            "password": password
        }).then(res => {return res.data})
        .then(data => {
            alert("Create new user completed")
        })
        .catch(err => alert("Error creating new user"))
    }

    let inputs = [
        {
            label: 'Username',
            value: userName,
            onChange: (e) => setUserName(e.target.value)
        },
        {
            label: 'Password',
            value: password,
            onChange: (e) => setPassword(e.target.value)
        },
        {
            label: 'Retype password',
            value: rePassword,
            onChange: (e) => setRePassword(e.target.value)
        }
    ]
    return(
        <div>
            <h2>Sign up</h2>

            {
                inputs.map(input => {
                    return(
                        <>
                            <TextField key = {input.label} label = {input.label} value = {input.value} onChange = {input.onChange} size = {"small"} variant="standard"/>
                            <div></div>
                        </>
                    )
                })
            }
            <Button onClick={SignUp}>Submit</Button>
            
        </div>
    )
}