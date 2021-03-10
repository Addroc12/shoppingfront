import NavBar from './NavBar'
import '../Styles.css'

const Layout = ({title='Title', description='Description', className, children}) =>
{
    return (
    <div>
        <NavBar/>
        <div className='jumbotron' style={{textAlign:"center"}}>
            <h1 style={{paddingTop:"100px"}}>{title}</h1>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>
        <div className="row end" style={{height:"300px",margin:"0px",marginTop:"100px"}}>
            <div className="col-2"></div>
            <div className="col-8" style={{textAlign:"center"}}><h1 className="headers">About Us</h1> <h5 className="header">“It is only when they go wrong that machines remind you how powerful they are.”</h5></div>

            <div className="col-2"></div>            
        </div>
    </div>    
    )
}

export default Layout