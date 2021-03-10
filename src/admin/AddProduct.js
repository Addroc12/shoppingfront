import Layout from '../core/Layout'
import React, { useState, useEffect } from 'react'
import {isAuthenticate } from '../auth'
import '../core/NavBar.css'
import {createProduct,getCategories} from './ApiAdmin'
import { Link } from 'react-router-dom'

const AddProduct = () => {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    })
    const {user , token} = isAuthenticate()
    const {
        name,
        description,
        price,
        categories ,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values, categories:data, formData:new FormData()})
            }
        })
    }

    //runs when there is a change in state
    useEffect(() => {
       init()
    },[])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    }
  
    const clickSubmit = (event) => {
        event.preventDefault() 
        setValues({...values,error:'',loading:true})

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }else {
                setValues({
                    ...values,name:'',description:'',photo:'',price:'',quantity:'',loading:false,createdProduct:data.name
                })
            }
        })
    }

    const newPostForm = () => {
        return(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Form</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type="file" name='photo' accept="image/*"  multiple />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')}  type="text" className="form-control" value={name}/>
            </div>
 
            <div className="form-group">
                <label className="">Description</label>
                <input onChange={handleChange('description')}  type="text"  className="form-control" value={description}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')}  type="number"  className="form-control" value={price}/>
            </div>

            <div className="form-control">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')}  type="text"  className="form-control" >
                    <option value="">Please Select</option>
                    {categories && categories.map((c , i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select> 
            </div>
 
            <div className="form-control">
                <label className="text-muted">quantity</label>
                <input onChange={handleChange('quantity')}  type="number" className="form-control" value={quantity}/>
            </div>

            <div className="form-control">
                <label className="text-muted">shipping</label>
                <select onChange={handleChange('shipping')}  type="text" className="form-control">
                    <option value="">Please Select</option>
                    <option value="0">No</option>
                    <option value="1">yes</option>
                </select>
            </div>
            
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
        )
    }

    const showError = () => {
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    }

    const showSuccess = () => {
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}><h2>{`${createProduct}`} is created</h2></div>
        
    }
    const showLoading = () => {
        loading && (<div className="alert alert-success" style={{display: createdProduct ? '' : 'none'}}><h2>loading</h2></div>)
    }

    return (
        <Layout title="Add a new Product" description={`Good Day ${user.name}`}>

        <div className='row'>
            <div className="col-md-8 offset-md-2">
              {showLoading()}
              {showSuccess()}
              {showError()}
              {newPostForm()}
            </div>

        </div>
    </Layout>
    )
}

export default AddProduct