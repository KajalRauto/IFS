import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { StoreList } from "../Store/store-list"

function Header() {
  const { setCartItemsList } = useContext(StoreList)
  var [status, setStatus] = useState("undefined")

  useEffect(() => {
    setStatus(sessionStorage.status)
  }, [sessionStorage.status])

  const remove = () => {
    setStatus(undefined)
    sessionStorage.status = undefined;
    sessionStorage.email = undefined;
    setCartItemsList([])
  }
  const navigate = useNavigate();
  return <>
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
            <img src={require("../Resources/logo3.png")} className="card-img-top" alt="..." />
          </a>
        </div>

        <div className="col-md-6 text-end">
          <div className="d-flex align-items-center justify-content-end">
            <Link className="btn me-3" to="/wishlist">
              <img src={require("../Resources/wishlist.png")} alt="..." style={{ width: "30px" }} />
            </Link>
            <Link className="btn me-3" to="/cart">
              <img src={require("../Resources/cart.png")} alt="..." style={{ width: "30px" }} />
            </Link>
            {(status === "undefined" || status === undefined) ? (
              <>
                <div className="dropdown">
                  <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={require("../Resources/signin.png")} alt="..." style={{ width: "30px" }} />
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="btn Logo" to="/signup">Sign Up</Link></li>
                    <li><Link className="btn Logo" to="/login">Log In</Link></li>
                  </ul>
                </div>
              </>
            ) : (
              <Link className="btn Logo" to="/" onClick={remove}>
                <img src={require("../Resources/signOut.png")} className="card-img-top" alt="..." style={{ width: "30px" }} />
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  </>
};
export default Header;