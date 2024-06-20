import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Cart() {
  const [cartItemsList, setCartItemsList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_C, REACT_APP_PROD_URL_C } = process.env;

  const url = `${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}`;
  const getUsers = () => {
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      fetch(url)
        .then((response) => response.json())
        .then((allDet) => {
          const concernedUser = allDet.find(item => item.Email == sessionStorage.email)
          setUserDetails(concernedUser)
          setCartItemsList(concernedUser.cartItem)
        }
        )
    }
  };
  useEffect(() => {
    getUsers();
  }, [true]);

  const incrementFunc = (item) => {
    const existingItemIndex = userDetails.cartItem.findIndex(cartItem => cartItem.id === item.id);
    userDetails.cartItem[existingItemIndex].count++;
    userDetails.total += item.price;
    userDetails.taxes = (0.18 * userDetails.total).toFixed(2);
    userDetails.taxes = (userDetails.taxes.indexOf('.') !== -1 && userDetails.taxes.split('.')[1].length === 1) ? userDetails.taxes + '0' : userDetails.taxes;
    userDetails.estimatedTotal = String(userDetails.total + Number(userDetails.taxes) + 2000);
    userDetails.estimatedTotal = (userDetails.estimatedTotal.indexOf('.') !== -1 && userDetails.estimatedTotal.split('.')[1].length === 1) ? userDetails.estimatedTotal + '0' : userDetails.estimatedTotal;
    axios
      .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${userDetails.id}`, userDetails)
      .then((response) => setCartItemsList(response.data.cartItem))
  };
  const decrementFunc = (item) => {
    const existingItemIndex = userDetails.cartItem.findIndex(cartItem => cartItem.id === item.id);
    if (userDetails.cartItem[existingItemIndex].count == 1) {
      userDetails.cartItem.splice(existingItemIndex, 1);
    } else {
      userDetails.cartItem[existingItemIndex].count--;
    }
    userDetails.total -= item.price;
    userDetails.taxes = (0.18 * userDetails.total).toFixed(2);
    userDetails.taxes = (userDetails.taxes.indexOf('.') !== -1 && userDetails.taxes.split('.')[1].length === 1) ? userDetails.taxes + '0' : userDetails.taxes;
    userDetails.estimatedTotal = String(userDetails.total + userDetails.taxes + 2000);
    userDetails.estimatedTotal = Number((userDetails.estimatedTotal.indexOf('.') !== -1 && userDetails.estimatedTotal.split('.')[1].length === 1) ? userDetails.estimatedTotal + '0' : userDetails.estimatedTotal);
    axios
      .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${userDetails.id}`, userDetails)
      .then((response) => setCartItemsList(response.data.cartItem))
  };
  return <div className="d-flex align-items-center py-4 bg-body-tertiary">
    <div className="container cart my-4">
      <h5 className="mb-4">Shopping Cart</h5>
      {cartItemsList.length > 0 ?
        <div className="cartContainer bg-light p-4">
          <div className="row row-cols-1 row-cols-sm-2">
            < div className="col addedProducts" >
              {cartItemsList.map((item) => {
                return (
                  <div className="card mb-3" style={{ maxWidth: "540px" }} key={item.id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={require("../Resources/" + item.image)} className="img-fluid rounded-start" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.description}</p>
                          <div className="card-text d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <button className="decrement" onClick={() => { decrementFunc(item) }} style={{ marginRight: '5px', padding: '5px 10px', fontSize: '1.2em', border: '1px solid #ccc', borderRadius: '3px', backgroundColor: '#f0f0f0' }}>-</button>
                              <p style={{ margin: '0 10px' }}>{item.count}</p>
                              <button className="increment" onClick={() => incrementFunc(item)} style={{ marginLeft: '5px', padding: '5px 10px', fontSize: '1.2em', border: '1px solid #ccc', borderRadius: '3px', backgroundColor: '#f0f0f0' }}> +</button>
                            </div>
                            <p className="cost" style={{ marginLeft: 'auto', fontSize: '1.1em', fontWeight: 'bold' }}>Rs.{item.price * item.count}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="col details my-4">
              <h6>Cart Subtotal</h6>
              <div className="row">
                <div className="col">Subtotal</div>
                <div className="col text-end">Rs. {userDetails.total}</div>
              </div>
              <div className="row">
                <div className="col">Shipping</div>
                <div className="col text-end">Rs.2000</div>
              </div>
              <div className="row">
                <div className="col">Taxes</div>
                <div className="col text-end">Rs. {userDetails.taxes}</div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col text-end">Rs. {userDetails.estimatedTotal}</div>
              </div>
              <button type="button" className="btn btn-danger w-100">Check Out</button>
            </div>
          </div>
        </div> :
        <div className="noCartContainer bg-light p-4">
          <div className="row-row-cols-1 row-cols-sm-2 d-flex align-items-center">
            <div className="col">
              <h6>Your shopping cart is empty</h6>
              <p>Fill it up and enjoy free shipping on orders above Rs.XXX</p>
            </div>
            <div className="col text-left text-sm-end">
              <Link className="btn btn-danger me-3" to="/">Continue Shopping</Link>
            </div>
          </div>
        </div>
      }
    </div>
  </div >
};
export default Cart;