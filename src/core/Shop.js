import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts, getCategories, getFilteredProduct} from './ApiCor'
import Card from './Card'
import CheckBox from './CheckBox'
import {prices} from './FixedPrices'
import RadioBox from './RadioBox'
import './NavBar.css'


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {category :[], price:[]}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])
    
    const init = () => {
        getCategories().then(data => {
            if(data.err){
                setError(data.err)
            }else{
                setCategories(data) 
            } 
        })
    }

    
    const loadFilteredResults = (newFilters) => {
        //console.log(newFilterss)
        getFilteredProduct(skip, limit, newFilters)
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }
    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProduct(toSkip, limit, myFilters.filters)
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults,...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
               
                <button onClick={loadMore} className="btn  mb-5 b" style={{borderRadius:"20px"}}> load more</button>
            )
        )
    }
    useEffect(() => { 
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    },[])

    const handleFilters = (filters, filterBy) => {
        //console.log('shop',filters,filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters

        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy]=priceValues

        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for(let key in data){
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }


    return (
        <Layout title='Shop Page' description='Search and find device of your choice' className="container-fluid">
            <div className="row"   >
                <div className="col-3">
                <h4 className="header">Filter By Categories</h4>
                    <ul style={{listStyleType: "none"}}>
                        {CheckBox(categories, filters => handleFilters(filters,'category'))}
                    </ul>
                    <h4 className="header">Filter By Prices</h4>
                    <div style={{listStyleType: "none"}}>
                        {RadioBox(prices, filters => handleFilters(filters,'price'))}
                    </div>
                </div>
            <div className="col-9">
               <h2 className="mb-4 header">Products</h2>
               <div className="row"  style={{backgroundColor:"",textAlign:"center"}}>
                   {filteredResults.map((product, i) => (
                        <div key={i} className="col-4 mb-3" > <Card  key={i} product={product} /> </div>
                   ))}
               </div>
               {loadMoreButton()}
            </div>
            </div>
             
        </Layout>
    )

}


export default Shop