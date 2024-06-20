import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { StoreList } from "../Store/store-list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wishlist() {
  const { setCartItemsList } = useContext(StoreList)
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_C, REACT_APP_PROD_URL_C } = process.env;
  const url = `${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}`;

  const getUsers = () => {
    console.log(wishlistItems, "check it here")
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      fetch(url)
        .then((response) => response.json())
        .then((allDet) => {
          const concernedUser = allDet.find(item => item.Email == sessionStorage.email)
          setUserDetails(concernedUser)
          setWishlistItems(concernedUser.wishListItem)
        }
        )
    }
  };
  useEffect(() => {
    getUsers();
    console.log("hi i m inside cart useeffect")
  }, []);
  const moveToCart = (item) => {
    const existingCartItems = userDetails.cartItem;
    if (existingCartItems.length > 0) {
      console.log("102", "item.id")
      const existingItemIndex = userDetails.cartItem.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        userDetails.cartItem[existingItemIndex].count++;
        console.log("103")
      } else {
        console.log("104")
        item.count = 1;
        userDetails.cartItem.push(item);
      }
    } else {
      item.count = 1;
      userDetails.cartItem = [item];
    }
    const selectedItemIndex = userDetails.wishListItem.findIndex(wishListItem => wishListItem.id === item.id);
    userDetails.wishListItem.splice(selectedItemIndex, 1);
    console.log("106")
    userDetails.total += item.price;
    userDetails.taxes = Number(0.18 * userDetails.total).toFixed(2);
    userDetails.estimatedTotal = userDetails.total + userDetails.taxes
    console.log(userDetails.total, "total added")
    toast("1 item got added")

    axios
      .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${userDetails.id}`, userDetails)
      .then((response) => setCartItemsList(response.data.cartItem))
  }
  const removeFromWishlist = (item) => {
    const existingItemIndex = userDetails.wishListItem.findIndex(wishListItem => wishListItem.id === item.id);
    userDetails.wishListItem.splice(existingItemIndex, 1);
    axios
      .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${userDetails.id}`, userDetails)
      .then((response) => setWishlistItems(response.data.wishListItem))
  };
  return <div className="d-flex align-items-center py-4 bg-body-tertiary">
    <ToastContainer />
    <div className="container cart my-4">
      <h5 className="mb-4">Wishlisted Items</h5>
      {wishlistItems.length > 0 ?
        <div className="cartContainer bg-light p-4">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5">
            {wishlistItems.map((item) => {
              return (
                < div className="col-lg-3 mb-4" key={item.id}>
                  <div className="card">
                    <img src={require("../Resources/" + item.image)} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">Rs. {item.price}</p>
                      <button className="btn btn-danger" onClick={() => moveToCart(item)}>Move to cart</button>
                      <button className="btn" onClick={() => removeFromWishlist(item)}>
                        <img src={require("../Resources/heart.jpg")} alt="..." style={{ width: "30px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div> :
        <div className="noCartContainer bg-light p-4">
          <div className="row-row-cols-1 row-cols-sm-2 d-flex align-items-center">
            <div className="col">
              <h6>Your Wishlist is empty</h6>
              <p>Fill it up and enjoy the deal on time.</p>
            </div>
            <div className="col text-left text-sm-end">
              <Link className="btn btn-danger me-3" to="/">Continue Shopping</Link>
            </div>
          </div>
        </div>
      }
    </div>
  </div >
}
export default Wishlist;