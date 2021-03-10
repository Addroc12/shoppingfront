import React,{Fragment} from 'react'
import {Link , withRouter} from 'react-router-dom'
import {signOut , isAuthenticate} from '../auth'
import './NavBar.css'
import {itemTotal} from './CartHelpers'

// link is like <a> tag .. we are using Link because we dont want to reload the each time we click the link
//withRouter is used to access the porps history like paths home , sigin etc

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    } else {
        return{color : '#ffffff'}
    }
}

const NavBar = ({history}) => {
        
       return (
       <div className="contaiiner" >
                <ul className=" nav-tabs  nav navbar-right ull">
                
                    <li className="nav-item">
                        <Link className="nav-link s" style={isActive(history,"/")} to="/" >Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link s" style={isActive(history,"/shop")} to="/shop" >Shop</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link s" style={isActive(history,"/cart")} to="/cart" >Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                    </li>
                
                    {!isAuthenticate() && (
                        <Fragment>
                             <li className="nav-item">
                        <Link className="nav-link s"  style={isActive(history,'/signup')} to="/signup" >Signup</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link s" style={isActive(history,'/signin')} to="/signin" >Signin</Link>
                    </li>
                        </Fragment>
                    )}
                    
                   {isAuthenticate() && (
                       <Fragment>
                            <li className="nav-item">
                        <span className="nav-link s" style={{cursor:'pointer' , color: '#ffffff'}} onClick={() => signOut(() =>{
                            history.push("/")
                        })} >SignOut</span>
                    </li>
                       </Fragment>
                   )}
                   
                   {isAuthenticate() && isAuthenticate().user.role === 0 && (
                        <li className="nav-item">
                            <Link className="nav-link s" style={isActive(history,'/user/Dashboad')} to="/user/Dashboard" >Dashboad</Link>
                        </li>
                   )}

                    {isAuthenticate() && isAuthenticate().user.role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link s" style={isActive(history,'/admin/Dashboad')} to="/admin/Dashboard" >Dashboad</Link>
                        </li>
                   )}
                
                </ul>
        </div>
        
        )
}

export default withRouter(NavBar) 
