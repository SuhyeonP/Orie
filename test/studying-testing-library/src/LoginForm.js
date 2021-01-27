import React, { useState } from "react"

const LoginForm=({submitLogin=()=>{}})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();
        submitLogin()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>email
                <input type="email" placeholder="user@test.com" value={email} onChange={({target:{value}})=>setEmail(value)}/>
            </label>
            <label>pw
                <input type="password" value={password} onChange={({target:{value}})=>setPassword(value)}/>
            </label>
            <button disabled={!email||!password}>login</button>
        </form>
    )
}

export default LoginForm;