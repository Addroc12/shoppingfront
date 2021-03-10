import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from './ApiCor'
import Card from './Card'
import Search from './Search'
import {getCart,ddItem} from './CartHelpers'
import { Link } from 'react-router-dom'
import CheckOut from './CheckOut'


const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false);
 
    
  
    
    useEffect(() => {
        console.log('MAX DEPTH ...');
        setItems(getCart());
      }, [run]);

    

    

    const showItems = items => {
        console.log(items);
        return (
            <div style={{margin:'auto'}}>
                <h2 className="header">Your cart has {`${items.length}`} </h2>
                <hr/>
                <div className="row" style={{margin:"auto"}}>
                    {items.map((product, i) => (<div className="col-7" style={{textAlign:"center",marginBottom:"20px"}}><Card key={i} product={product} show={false} cartUpdate={true} deleteProduct={true}  setRun={setRun} run={run} /></div>)) }
                </div>
            </div>
        )
    }

    const noItem = () => {
        return (
        <h2 className="header">your cart is empty <br/> <Link to='/shop'>Continue shoping</Link></h2>
        )
    }

    return (
        <Layout title='Shopping cart' description='manage ur cart items' className="container-fluid">
           
        <div className='row' style={{marginBottom:"400px"}}>
            <div className='col-6' style={{textAlign:'center'}}>
                    {items.length > 0 ? showItems(items) : noItem() }
            </div>
            <div className='col-6'>
                  <CheckOut products={items} setRun={setRun} run={run} />
            </div>
        </div>
       

        </Layout>
    )
}
export default Cart
