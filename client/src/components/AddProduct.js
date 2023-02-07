import { useState,useEffect } from "react"
import {useNavigate } from "react-router-dom"

export const AddProduct=()=>{
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const [error,setError]=useState(false)
    const navigate=useNavigate()

       
    const auth=localStorage.getItem('user')

    const addProduct=async(e)=>{
        console.log('name',name)
        console.log('not name',!name)
        if(!name||!price||!category||!company)
        {
            setError(true)
            return false
        }
       console.warn(name,price,category,company)
       const userId=JSON.parse(auth)._id
       let result= await fetch('http://localhost:5000/add',
       {
        method:'post',
        body:JSON.stringify({name,userId,price,category,company}),
        headers:{
          'Content-Type':'application/json'
        }
        })
       result=await result.json()
        console.warn(result)
        navigate('/')
        // localStorage.setItem("product",JSON.stringify(result))
    }
    return(
        <div className="register">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name"
             onChange={(e)=>setName(e.target.value)}/>
            {error && !name && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Price" 
            onChange={(e)=>setPrice(e.target.value)}/>
            {error&& !price && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Category" 
            onChange={(e)=>setCategory(e.target.value)}/>
            {error && !category && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Category</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Company" 
            onChange={(e)=>setCompany(e.target.value)}/>
            {error && !company && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Company</span>}
            <button className="appButton" type="button" onClick={addProduct}>Add Product</button>
        </div>
    )
}