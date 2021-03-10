import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts,read,listRelated} from './ApiCor'
import Card , {showStock,shouldRedirect} from './Card'
import ShowImage from './ShowImage'
import moment from 'moment'
import {addItem} from './CartHelpers'
import {Link, Redirect} from 'react-router-dom'

import {API} from '../Config'




const Product = (props, show=true) => {

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError]= useState(false)
    const [redirect, setRedirect] = useState(false)    
    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                // fetch related prouct
                listRelated(data._id)
                .then(data => {
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                      
                    }
                })
            }
        })
    }
    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[props])
    const AddToCarts = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }
     const AddToCart = (show) => {
        return (   
            show && <button onClick={AddToCarts} className="btn  mt-2 mb-2 b" style={{borderRadius:"40px",padding:"10px"}}>
                   <span>Add to Cart</span>
             </button>
        )
    } 
     const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to='/cart' />
        }
    }     

    return (
        <Layout title={product && product.name} description=" " className="container-fluid" >
         {shouldRedirect(redirect)}
        <div className="row" style={{marginTop:"50px"}}>

            <div className="col-4"><div style={{backgroundColor:"white",display:"flex",justifyContent:"center",borderRadius:"40px"}}> <img src={`${API}/products/photo/${props.match.params.productId}`} alt="name" className="mb-3" style={{height:'700px', maxWidth:'100%',marginTop:"10px"}}/></div></div>
            <div className="col-8" style={{backgroundColor:"white",borderRadius:"40px"}}> 
            <h2 className="headers" style={{marginBottom:"30px",marginTop:"40px"}}>Descriptions</h2>
            <h3 className="headers" style={{marginBottom:"30px"}}>{product.description}</h3>
            <h2 className="headers" style={{marginBottom:"30px"}}>Brand {product.category && product.category.name}</h2>
            {/* <h3>{product.description}</h3> */}
            <h4 className="headers" style={{marginBottom:"30px"}}>Added On {moment(product.createdAt).fromNow()}</h4>
            <h2 className="headers" style={{marginBottom:"30px"}}>Price ${product.price}</h2>
            <h2>{showStock(product.quantity)}</h2>
            {AddToCart(show)}
            </div>
        </div>
       
       
          <div className="row">

              <div className="col-12" style={{}}>
                 <h2>Related product</h2>
                 <div className="row">
                 {relatedProduct.map((p,i) => (
                     <div className="col-3" style={{marginBottom:"30px",textAlign:"center"}} >
                         <Card key={i} product={p}/>
                     </div>
                 ))}
                 </div>
              </div>

          </div>
        </Layout>
    )

}

export default Product