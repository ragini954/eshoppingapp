import { useState,useEffect } from "react"
import {useNavigate, useParams } from "react-router-dom"

export const UpdateProduct=()=>{
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    const params=useParams()

    useEffect(()=>{
        getProductDetails()
    },[])

    const getProductDetails=async()=>{ 
        let result=await fetch(`http://localhost:5000/product/${params.id}`)
        result =await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct=async()=>{
        let result= await fetch(`http://localhost:5000/product/${params.id}`,
        {
         method:'put',
         body:JSON.stringify({name,price,category,company}),
         headers:{
             'Content-Type':'application/json'
         }
         })
        result=await result.json()
         // console.warn(result)
         navigate('/')  
    }

    return(
        <div className="register">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name"
             value={name}/>
            {error && !name && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Price" 
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error&& !price && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Category" 
            onChange={(e)=>setCategory(e.target.value)} value={category}/>
            {error && !category && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Category</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Company" 
            onChange={(e)=>setCompany(e.target.value)} value={company}/>
            {error && !company && <span style={{color:'red',marginTop:'-20px',display:'block',marginLeft:'25px'}}>Enter Valid Company</span>}
            <button className="appButton" type="button" onClick={updateProduct}>Update Product</button>
        </div>
    )
}