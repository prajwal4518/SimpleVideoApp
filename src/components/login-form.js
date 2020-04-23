import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({storeToken}) =>{
    const [name, setName] = useState("")

    const handleSubmit = async event =>{
        event.preventDefault()
        const result = await axios({
            method : "POST",
            url :"https://teal-lion-2508.twil.io/create-token",
            data:{
                identity: name,
            },
        })
        console.log(result);
        const jwt = result.data;
        storeToken(jwt);
    }

    return(
        <form onSubmit = {handleSubmit}>
            <label htmlFor="name">
                Display Name: <br />
                <input type="text" id="name" value={name} onChange = {e => setName(e.target.value)} />
            </label>
            <br />
            <button type="submit"> Join Video Chat</button>
        </form>
    )
}

export default LoginForm