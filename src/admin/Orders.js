import Layout from '../core/Layout'
import React, { useState, useEffect } from 'react'
import {isAuthenticate } from '../auth'
import '../core/NavBar.css'
import moment from 'moment'
import {createProduct,getCategories,listOrders,getStatusValues,updateOrderStatus} from './ApiAdmin'
import { Link } from 'react-router-dom'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [stateValues, setStatusValues] = useState([])
    const {user, token} = isAuthenticate()
    
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }
    const loadStatusValue = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValue()
    }, [])

    const showOrdersLength = () => {

        if(orders.length > 0) {
            return(
                <h1 className="text-danger display-2">Total Orders{orders.length}</h1>
            )
        } else {
            return <h1 className="text-danger">No Orders</h1>
        }
   
    }

    const showInput = (key, value) => {
        return (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="" >{key}</div>
               <input type="text" value={value} className="form-control" readOnly />
            </div>
        </div>
        )    
    }
    const handleStatusChange = (e, orderId) => {
       return (
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            console.log('this is we getting'+ data)
            if(data.error){
                    console.log('Status update failed ')
            } else {
                loadOrders()
            }
        })
       )
    }

    const showStatus = (o) => {
        return (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status} </h3>
            <select className="form-control" onChange={(e) =>handleStatusChange(e, o._id)}>

                <option>Update Status</option>
                {stateValues.map((status, index) => (<option key={index} value={status}> {status} </option>))}
            </select>
        </div>
        )
    } 

    return (
        <Layout title="orders" description={`Good Day ${user.name}, ypu can manage`}>

            <div className='row'>
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return(
                            <div className='mt-5' key={oIndex} style={{borderBottom:'5px solid indigo'}}>
                                    <h2 className="mb-5">
                                        <span className="bg-primary">Order ID: {o._id}</span>
                                    </h2>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            {showStatus(o)}
                                        </li>
                                        <li className="list-group-item">
                                            Transaction ID: {o.transaction_id}
                                        </li>
                                        <li className="list-group-item">
                                           Total Amount: ${o.amount}
                                        </li>
                                        <li className="list-group-item">
                                            Ordered by: {o.user.name}
                                        </li>
                                        <li className="list-group-item">
                                            Ordered On: {moment(o.createdAt).fromNow()}
                                        </li>
                                        <li className="list-group-item">
                                            Delivery address: {o.address}
                                        </li>

                                    </ul>

                                    <h3 className="mt-4 mb-4 font-italic">
                                        Total products in the order: {o.products.length}
                                    </h3>


                                    {o.products.map ((p, pIndex) => (
                                        <div className="mb-4" key={pIndex} style={{padding: '20px', border:'1px solid indigo' }}>
                                            {showInput('Product name', p.name)}
                                            {showInput('Product price', p.price)}
                                            {showInput('Product count', p.count)}
                                            {showInput('Product Id', p._id)}
                                        </div>
                                    ))}
                            </div>
                        )
                    })}
                </div>

            </div>
            

        </Layout>
    ) 
}

export default Orders