import { useState,useEffect } from "react"
import {Link,useNavigate } from "react-router-dom"

export const ProductList=()=>{
    const [products,setProducts]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts=async()=>{
        let result=await fetch('http://localhost:5000/products',{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })
        result=await result.json()
        setProducts(result)
    }

    console.log('products',products)

    const deleteProduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete',
            headers:{
                authorization : JSON.parse(localStorage.getItem("token"))
            }
        })
    console.log(result)
      result=await result.json()
      console.log(result)
      
      if(result)
      {
            alert('Are u sure, u want to delete record !!')
            getProducts()
      }
    }

    const searchHandler=async(e)=>{
        let key=e.target.value
        console.log(key)
        if(key){
            let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }})
            console.log(result)
            result=await result.json()
            console.log(result)
            setProducts(result)
        }
        else
        {
            getProducts()
        }
    }

    return(<div className="product-list">
        <input type='text' placeholder='Search Product' onChange={searchHandler} className="search"/>
        <tr>
            <td>S.No.</td>
            <td>Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Company</td>
            <td>Delete/Update</td>
        </tr>
        {   
        products.length>0?products.map((x,index)=>{return <tr key={index}>
            <td>{index+1}</td>
            <td>{x.name}</td>
            <td>Rs. {x.price}</td>
            <td>{x.category}</td>
            <td>{x.company}</td>
            <button onClick={()=>deleteProduct(x._id)} style={{marginLeft:'10px',padding:'5px'}}>Delete</button>
            <Link to={'/update/'+x._id}>Update</Link>
        </tr>}):<h1>No Product Found</h1>}
    </div>)   
}
