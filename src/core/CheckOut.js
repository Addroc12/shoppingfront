import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts, getBraintreeClienttoken, processPayment,createOrder} from './ApiCor'
import {emptyCart} from './CartHelpers'
import Card from './Card'
import Search from './Search'
import {isAuthenticate} from '../auth'
import { Link } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";


const CheckOut = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticate() && isAuthenticate().user._id
    const token = isAuthenticate() && isAuthenticate().token

    
    const  getToken = (userId,token) => {
            getBraintreeClienttoken(userId,token).then(data => {
             
                if(data.error){
                    setData({...data, error:data.error})
                }else {
                    
                    setData({ clientToken: data.clientToken})
                }
            })
    }

    useEffect(() => {  
        getToken(userId,token)
    },[])

    const handleAddress = event => {
        setData({...data, address:event.target.value})
    }


    const getTotal = () => {
        return(
            products.reduce((currentValue, nextValue) =>{
                return currentValue + nextValue.count * nextValue.price
            }, 0)
        )
    }

    const showCheckout = () => {
        return (
           <div> {isAuthenticate() ? (
                <div> {showDropIn()} </div>
                ) : (
                    <Link to='/signin'><button className="btn btn-primary">Sign in to checkout</button></Link>
                ) }
            
        </div>)
    }


    let diliveryAddress = data.address

    const buy = () => {
        setData({loading : true})
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()

        let nonce 

        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            //console.log(data)
            nonce = data.nonce
            // //  once you have nonce (card type, card number) send nonce as payment method nonce 
            // // and also total to be charged 
            // console.log('send nonce and total to process', nonce, getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: diliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => {
        return (
            //on blur means u click anywhere on page on blur will run
        <div onBlur={() => setData({...data, error:''})}>
            {data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="form-group mb-3">
                            <label className="text-muted">Delivery address:</label>
                            <textarea 
                                onChange={handleAddress}
                                className="form-control"
                                value={data.address}
                                placeholder="Type your delivery address here ..."
                            />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                            
                        }} onInstance = {instance => (data.instance = instance)} />
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                    </div>
            ): null }
        </div>
        )
    }
    
    const showError = error => {

        return(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
        )
    }

    const showSuccess = success => {

        return(
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
           Thanks ur payment was successfull
        </div>
        )
    }

        const showLoading = (loading) => {
            return(
            loading && <h2>Loading.....</h2>
            )
        }
    
    return (
            <div>
                <h2 className="header">Total: ${getTotal()}</h2>
                {showLoading(data.loading)}
                {showSuccess(data.success)}
                {showError(data.error)}
                {showCheckout()}       
            </div>
        )

}

export default CheckOut