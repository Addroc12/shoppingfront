import Layout from '../core/Layout'
import React, {useState} from 'react'
import {signup} from '../auth'
import '../core/NavBar.css'
import {Link} from 'react-router-dom'
const Signup = () => {
    const [values , setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success:false
    })

    const {name,email,password,error,success} = values
   
    // it is a higher order function which means it returns a function
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})

    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:false})
       signup({name, email, password})
       .then(data => {
           if(data.error){
               setValues({...values, error:data.error, success:false})

           }else {
               setValues({
                   ...values,
                   name:'',
                   email:'',
                   password:'',
                   error:'',
                   success:true

               })
           }
       })
    }
    const signUpForm = () => (
        <form style={{marginTop:"50px",width:"200px"}}>
             <h1 style={{color:"pink",marginBottom:"20px"}}>Sign Up</h1>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input  onChange={handleChange("name")} type="text" className="form-control" value={name} />
                
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <div className="form-group c">
                <input onClick={clickSubmit} type="submit" style={{borderRadius:"20px"}} className="btn btn-primary form-control ml-2 b" />
            </div>
        </form>
    )
   
    const showError =() => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >{error}</div>
    )

    const showSuccess =() => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}} >{success} New Account is created , Please <Link to='/signin'>SignIn</Link></div>
    )

    return(
        <Layout title='Sign Up' description='Used For Sign' className="container col-md-4 offset-md-4">
            {showSuccess()}
            {showError()}
            <div className="row">
                
                <div className="col-8" style={{backgroundColor:"white",height:"460px",display:"flex",justifyContent:"center",width:"600px",borderRadius:"20px",marginTop:"50px"}}>
                   
                    {signUpForm()}
                </div>
                
                </div>
           
           
 
        </Layout>
    ) 
    
}

export default Signup