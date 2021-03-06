import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getProducts } from './ApiCor'
import Card from './Card'
import Search from './Search'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsByArrival()
        loadProductsBySell()

    }, [])

    return (
        <Layout title='Home Page' description='Node React App' className="container-fluid">
            <Search />




            <div className="container" style={{ backgroundColor: "", textAlign: "center" }}>


                <h2 className="mb-4 header">New Arrival</h2>

                <div className="row" >
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">  {productsByArrival.map((product, i) => (<div key={i} className="col-4 mb-3" ><Card key={i} product={product} /></div>))}</div>
                    </div>
                    <div className="col-1"></div>
                </div>


                <hr />
                <h2 className="mb-4 header">Best Sellers</h2>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="row">  {productsBySell.map((product, i) => (<div key={i} className="col-4 mb-3" ><Card key={i} product={product} /></div>))}</div>
                    </div>
                    <div className="col-1"></div>

                </div>
            </div>
        </Layout>
    )
}
export default Home
