import React from 'react'
import {useNavigate } from "react-router-dom"

export const Login = () => {
    const [email,setEmail]=React.useState('')
    const [password,setPassword]=React.useState('')
    const navigate=useNavigate()
    React.useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        } 
    })
    
    const collectData=async(e)=>{
      e.preventDefault();
         console.warn("email","password",email,password)
           let result= await fetch('http://localhost:5000/login',
           {
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
            })
           result=await result.json()
           console.warn(result) 
           if(result.name){
            navigate('/')
            localStorage.setItem("user",JSON.stringify(result))
           }
           else{
            alert('Please Enter the correct details !!')
           }
        }
     
  return (
    <form>
            <h1>Login</h1>
            <input className="inputBox" type="text" placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)} />

            <input className="inputBox" type="password" placeholder="Enter Password" 
            onChange={(e)=>setPassword(e.target.value)}/>

            <button onClick={collectData} className="appButton">Login</button>
    </form>
  )
}
