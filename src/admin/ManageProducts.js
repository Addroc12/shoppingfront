import Layout from '../core/Layout'
import React, { useState, useEffect } from 'react'
import {isAuthenticate } from '../auth'
import '../core/NavBar.css'
import {createProduct,getCategories} from './ApiAdmin'
import { Link } from 'react-router-dom'
import {getProduct,getProducts,deleteProduct,updateProduct} from './ApiAdmin'


const ManageProducts = () => {

     const [products, setProducts] = useState([])
     const { user: { _id, name, email, role } } = isAuthenticate()

     const token = isAuthenticate().token

     const loadProducts = () => {
         getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
         })
     }

     const destroy = (productId )=> {
         console.log(_id)
        deleteProduct(productId,_id, token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                loadProducts()
            }
        })
     }

     useEffect(() => {
        loadProducts()
     },[])





    return (
        <Layout title="Manage products" description='Performe CURD on Products'>

        <div className='row'>
         <div className="col-12">
             <h2 className="text-center">Total {products.length} </h2>
                <hr></hr>
                <ul className="list-group">
                     {products.map((p,i) => (
                         <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{p.name}</strong>
                            <Link to={`/admin/product/update/${p._id}`}>
                                <button className="badge badge-warning badge-pill" style={{color:'green'}}>Update</button>
                            </Link>
                            <button onClick={() => destroy(p._id)} className="badge badge-danger badge-pill" style={{color:'red',border:"1px"}}> Delete </button>
                         </li>
                     ))}
                </ul>
         </div>
        </div>
    </Layout>
    )
}

export default ManageProducts