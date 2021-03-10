import React from 'react'
import {API} from '../Config'

const ShowImage = ({item, url}) => (
    <div className="product-img" >
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{height:'400px', maxWidth:'100%'}}/>

    </div>
)

export default ShowImage