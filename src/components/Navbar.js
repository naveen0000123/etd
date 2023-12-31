import Badge from 'react-bootstrap/Badge'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {
  let data = useCart();
  
const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigator.reload();
    alert("Logout Successful");
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">DishDash</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken")) ? 
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
        </li> : null
        }
      </ul>
      <div className="d-flex">
        {(!localStorage.getItem("authToken")) ? <>
            <Link className="btn bg-white text-primary mx-1" to="/login">Login</Link>
            <Link className="btn bg-white text-primary mx-1" to="/signup">Signup</Link>
            </> : <>
            <Link className="btn bg-white text-primary mx-2"  to="/" onClick={()=>{setCartView(true)}}>
              My Cart
              <Badge pill bg="danger" className="mx-2">{data.length}</Badge>
            </Link>
            {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>  : null}
            <Link className="btn bg-white text-danger mx-2" to="/" onClick={handleLogout}>Logout</Link> 
            </>
          }
         
      </div>
    </div>
  </div>
</nav>
    </>
  )
}
