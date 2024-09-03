import { Stack, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import CurrentUserContext from "../Context/CurrentUserContext";
import axios from "axios";

export default function FormPost() {
    let [content, setContent] = useState('')
    let {userId, setUserId} = useContext(CurrentUserContext)

    let handleChange = (e) => {
        setContent(e.target.value)
    }

    let makeNewPost = () => {
        console.log(userId)
        /*
            axios.post('http://127.0.0.1:8080/users/logIn', {
            "name": userName,
            "password": password
        }).then(res => {return res.data})
        .then(data => {
            setIsLoggedIn(true)
        })
        .catch(err => alert("Wrong username and password"))
        */
        axios.post('http://127.0.0.1:8080/posts', {
            "userId": userId,
            "content": content
        }).then(data => {return data.data})
        .then(data => console.log(data))
    }

    return (
        <div>
            <Stack width={500}>
                <TextField value={content} onChange={handleChange}/>
                <div>
                    <Button onClick={makeNewPost}>Submit</Button>
                    <Button>Another test</Button>
                </div>
            </Stack>
        </div>
    )
}