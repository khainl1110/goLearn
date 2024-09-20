import { useContext, useEffect, useState } from "react";
import FormPost from "./FormPost";
import axios from "axios";
import CurrentUserContext from "../Context/CurrentUserContext";

export default function MainApp() {
    let [posts, setPosts] = useState([])
    let {userId, setUserId} = useContext(CurrentUserContext)
    let [reload, setReload] = useState(false)


    useEffect(() => {
        axios.get('http://127.0.0.1:8080/posts/findPostsByUser/' + userId)
        .then(data => {setPosts(data.data)
            console.log(data.data)
        })
    }, [reload])

    let reloadPosts = () => {
        setReload(!reload)
    }

    return (
        <div>
            <h2>Post it here</h2>
            <FormPost />
            <h3>Your past post</h3>
            <button onClick={reloadPosts}>Reload</button>
            
            {posts !== null ? posts.map(post => {
                return (
                    <div>
                        <h4>{post.content}</h4>
                    </div>
                )
            }) :<></>}
        </div>
    )
}