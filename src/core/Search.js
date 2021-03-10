import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import {getCategories, list} from './ApiCor'

const Search = () => {

    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched: false
    })
    const{categories,category,search,results,searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.err){
                console.log(data.err)
            }else{
                setData({...data, categories:data})
            }
        })
    }
    useEffect(() => {
        loadCategories()
    },[])
    const searchData = () => {
      //  console.log(search, category)
      if(search){
          list({search:search || undefined, category: category})
          .then(response => {
                if(response.error){
                    console.log(response.error)
                }else{
                    setData({...data, results:response, searched:true})
                }
          })
      }
    }
    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }
    const handleChange = name => event =>{
        setData({...data, [name]:event.target.value, searched:false})
    }
    const searchMesssage = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if(searched && results.length < 1) {
            return `No products found`
        }
    }

    const searchProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMesssage(searched, results)}
                </h2>
                <div className="row">
                 <div className="col-2"></div>
                 <div className="col-8">
                 <div className="row"> {results.map((product, i)=>(<div key={i} className="col-4 mb-3" ><Card key={i} product={product} /></div>))}  </div>
                 </div>
                
                <div className="col-2"></div>
                </div>
            </div>
            
            
        
        )
    }
    
    const searchForm = () => {
    return (
        <form onSubmit={searchSubmit} className="mt-3 mb-3">
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">All Category</option>
                            {categories.map((c,i) => (<option key={i} value={c._id}>{c.name}</option>))}
                        </select>
                    </div>
                    <input type='search' className="form-control" onChange={handleChange('search')} placeholder='Search by name' />
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text">Search</button>

                </div>
            </span>
        </form>
    )
    }

    return (
        <div className="row">
            <div className="container">
                {searchForm()}
                <div className="container-fluid mb-3">

                    {searchProducts(results)}
                </div>
            
            </div>
        </div>
    )
}

export default Search