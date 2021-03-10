import Layout from '../core/Layout'
import React, {useState} from 'react'
import {signin, authenicate, isAuthenticate } from '../auth'
import '../core/NavBar.css'
import {Link, Redirect} from 'react-router-dom'
const Signin = () => {
    const [values , setValues] = useState({
        email: 'adityaa@g.com',
        password: 'asaaaa5a',
        error: '',
        loading: false,
        redirectToReferrer:false
    })

    const {email,password,error,loading,redirectToReferrer} = values
    const {user} = isAuthenticate()
   
    // it is a higher order function which means it returns a function
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})

    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,err:false,loading:true})
       signin({email, password})
       .then(data => {
           if(data.err){
               setValues({...values, error:data.err, loading:false})

           }else {
              authenicate(
                  data , () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
           }
       })
    }
    const signUpForm = () => (
       
        <form style={{marginTop:"50px",width:"200px"}}>
             <h1 style={{color:"pink",marginBottom:"20px"}}>Sign In</h1>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <div className="form-group c">
           
                <button onClick={clickSubmit}  style={{borderRadius:"20px"}} type="submit" className="btn btn-primary form-control  b">Submit</button>
            </div>
        </form>
    )
   
    const showError =() => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >{error}</div>
    )

    const showLoading =() => (
        loading && (<div className="alert alert-info"><h2>Loading</h2></div>)
    )
    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1){
                return <Redirect to="/admin/Dashboard"/>
            }else{
                return <Redirect to="/" />
            }
        }
        if(isAuthenticate()){
            return <Redirect to="/" />
        }
           
    }

    return(
        <Layout title='SignIn' description='Used For Signin' className="container col-md-4 offset-md-4">
            {showLoading()}
            {showError()}
            <div className="row">
                
            <div className="col-8" style={{backgroundColor:"white",height:"400px",display:"flex",justifyContent:"center",width:"600px",borderRadius:"20px",marginTop:"100px"}}>
               
                {signUpForm()}
            </div>
            
            </div>
            {redirectUser()}
        
 
        </Layout>
    ) 
    
}

    

export default Signin