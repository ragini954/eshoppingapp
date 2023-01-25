import { useState,useEffect } from "react"
import {useNavigate } from "react-router-dom"

export const SignUp=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth)
    {
        navigate('/')
    } 
})

    const collectData=async(e)=>{
    //    console.warn(name,email,password)
       let result= await fetch('http://localhost:5000/register',
       {
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        }
        })
       result=await result.json()
        // console.warn(result)
        navigate('/')
        localStorage.setItem("user",JSON.stringify(result))
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
             onChange={(e)=>setName(e.target.value)}/>

            <input className="inputBox" type="text" placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)}/>

            <input className="inputBox" type="password" placeholder="Enter Password" 
            onChange={(e)=>setPassword(e.target.value)}/>

            <button className="appButton" type="button" onClick={collectData}>SignUp</button>
        </div>
    )
}