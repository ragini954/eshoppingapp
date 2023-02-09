import { useState,useEffect } from "react"

export const ProductList=()=>{
    const [products,setProducts]=useState([])

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts=async()=>{
        let result=await fetch('http://localhost:5000/products')
        result=await result.json()
        
        setProducts(result)
    }

    console.log('products',products)

    const deleteProduct=async(id)=>{
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete'
        })
      result=await result.json()
      console.log(result)
      if(result)
      {
            alert('Are u sure, u want to delete record !!')
            getProducts()
      }
    }
    
    return(<div className="product-list">
        <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Company</td>
        </tr>
        {   
        products.map((x,index)=>{return <tr key={index}>
            <td>{x.name}</td>
            <td>Rs. {x.price}</td>
            <td>{x.category}</td>
            <td>{x.company}</td>
            <button onClick={()=>deleteProduct(x._id)} style={{marginLeft:'10px'}}>Delete</button>
        </tr>})}
    </div>)
    //onClick={()=>deleteProduct(x._id)}
}