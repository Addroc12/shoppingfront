import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import './NavBar.css'
import {addItem, updateItem,removeItem, ddItem} from './CartHelpers'
import { updateLocale } from 'moment'

export const showViewButton = (showV) =>{
    return(
        showV && <button className="btn  mt-2 mb-2 mr-3 b" style={{marginRight:5}} style={{borderRadius:"20px"}}  >
            View Product
        </button>
    )
}


export const shouldRedirect = (redirect) => {
    if(redirect){
        return <Redirect to='/cart' />
    }
}



export const showStock = quantity => {
    return quantity > 0 ? (<span className="badge badge-primary badge-pill" style={{color:'green'}}>In Stock</span>) : (<span className="badge badge-primary badge-pill">Out Of Stock</span>)
}

  


const Card =({product, show=true,showV=true,cartUpdate=false, deleteProduct=false,setRun = f =>f, run = 'umdefined'}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
   
    

    const AddToCarts = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }
   
     const AddToCart = (show) => {
        return (   
            show && <button onClick={AddToCarts} style={{borderRadius:"20px"}} className="btn  mt-2 mb-2 b ">
                    Add to Cart
             </button>
        )
    } 
    
    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value)

        if(event.target.value >= 1) {
            updateItem(productId , event.target.value)
        }
    } 

    const showCartUpdateOption = cartUpdate => {
        return cartUpdate && <div>
            
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type='number' className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
            </div>
    }
    const deleteProductButton = deleteProduct => {
        return deleteProduct && (
            
            <button onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}className="btn btn-outline-danger mt-2 mb-2">
                    Delete Product
             </button>

             
        ) 
    }
  
    
    return(
       
            <div className="card" style={{display:'flex',alignItems:'center',borderRadius:"50px"}}>
                <div className="card-header">{product.name}</div>
                <div className="card-body" >
                    {shouldRedirect(redirect)}
                  
                 
                    <ShowImage item={product} url="products"/>
                   
                    <p>${product.price}</p>
                    <p>{showStock(product.quantity)}</p>
                    <Link to={`/product/${product._id}`}>
                       {showViewButton(showV)}
                    </Link>
                    {deleteProductButton(deleteProduct)}
                    {AddToCart(show)}
                    {showCartUpdateOption(cartUpdate)}
                  
                   
                </div>
            </div>
           

        
    )
}

export default Card