import Layout from '../core/Layout'
import React, { useState } from 'react'
import {signin, authenicate, isAuthenticate } from '../auth'
import '../core/NavBar.css'
import {createCategory} from './ApiAdmin'
import { Link } from 'react-router-dom'

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [sucess, setSuccess] = useState('')

    // destructure user and tokrn from localstorage

    const {user , token} = isAuthenticate()
    
    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make rqst to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.err){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
            }
        })

    }

    const newCategoryForm = () => {
        return(
        <form onSubmit={clickSubmit}>
            <div className='from-group'>
                <label className='text-muted'>Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
                <button className="btn btn-outline-primary" > Create Category</button>
            </div>
        </form>
        )
    }
    const showSuccess = () => {
        if(sucess){
            return <h3 className="text-success">{name} is created</h3>
        }
    }
    const showError = () => {
        if(error){
            return <h3 className="text-danger">{name} Should be unique</h3>
        }
    }

    const goBack = () => 
        <div className='mt-5'>
            <Link to='/admin/dashboard' className='text-warning'>Back to Dashboad</Link>
        </div>
    
     
    return (
        <Layout title="Add a new Category" description={`Good Day ${user.name}`}>

            <div className='row'>
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>

            </div>
            

        </Layout>
    ) 
}

export default AddCategory