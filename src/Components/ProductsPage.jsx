import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StoreList } from "../Store/store-list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsPage() {
  const { setCartItemsList, setWishListItemsList } = useContext(StoreList),
    [requiredData, setRequiredData] = useState([]),
    [allOfferProducts, setAllOfferProducts] = useState([]),
    [userDetails, setUserDetails] = useState([]),
    [wishlistItems, setWishlistItems] = useState([]);

  let user = [],
    details = [];
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_C, REACT_APP_PROD_URL_C, REACT_APP_DEV_URL_D, REACT_APP_PROD_URL_D } = process.env;

  const urlDet = `${devEnv ? REACT_APP_DEV_URL_D : REACT_APP_PROD_URL_D}`;
  const urlUsers = `${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}`;

  const getDet = () => {
    fetch(urlDet)
      .then((response) => response.json())
      .then((allDet) => saveProductsList(allDet));
  };

  const getUsers = () => {
    fetch(urlUsers)
      .then((response) => response.json())
      .then((allDet) => saveUserDetails(allDet));
  };

  useEffect(() => {
    getUsers();
    getDet();
  }, []);

  const location = useLocation();
  const saveUserDetails = (allDet) => {
    user = allDet
    setUserDetails(allDet)
  };
  const listOfWishlistedItems = (cuser, cdetails) => {
    const loggedInUser = cuser.find((val) => val.Email === sessionStorage.email),
      wishListedItems = loggedInUser.wishListItem;
    for (let i = 0; i < cdetails.length; i++) {
      for (let j = 0; j < wishListedItems.length; j++) {
        if (cdetails[i].id == wishListedItems[j].id) {
          cdetails[i].wishlist = true
        }
      }
    }
    details = cdetails;
    setRequiredData(cdetails);
  };
  const saveProductsList = (allDet) => {


    if (location.state == "Offers") {
      details = allDet.filter((item) => item.offeredPrice !== "NA")
      setRequiredData(allDet.filter((item) => item.offeredPrice !== "NA"));
    } else {
      details = allDet.filter((item) => item.category == location.state)
      setRequiredData(allDet.filter((item) => item.category == location.state));
    }
    setAllOfferProducts(allDet);
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      listOfWishlistedItems(user, details);
    }
  };

  const filterProducts = (selectedVal) => {
    details = allOfferProducts.filter((item) => item.offeredPrice !== "NA" && item.category == selectedVal)
    setRequiredData(allOfferProducts.filter((item) => item.offeredPrice !== "NA" && item.category == selectedVal))
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      listOfWishlistedItems(user, details);
    }
  };
  const addToCart = (item) => {
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      const concernedUser = userDetails.find((val) => val.Email === sessionStorage.email);
      const existingCartItems = concernedUser.cartItem;
      if (existingCartItems.length > 0) {
        const existingItemIndex = concernedUser.cartItem.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
          concernedUser.cartItem[existingItemIndex].count++;
        } else {
          item.count = 1;
          concernedUser.cartItem.push(item);
        }

      } else {
        item.count = 1;
        concernedUser.cartItem = [item];
      }
      toast('1 Item got added to cart');
      concernedUser.total += item.price;
      concernedUser.taxes = (0.18 * concernedUser.total).toFixed(2);
      concernedUser.taxes = (concernedUser.taxes.indexOf('.') !== -1 && concernedUser.taxes.split('.')[1].length === 1) ? concernedUser.taxes + '0' : concernedUser.taxes;
      concernedUser.estimatedTotal = String(concernedUser.total + Number(concernedUser.taxes) + 2000);
      concernedUser.estimatedTotal = (concernedUser.estimatedTotal.indexOf('.') !== -1 && concernedUser.estimatedTotal.split('.')[1].length === 1) ? concernedUser.estimatedTotal + '0' : concernedUser.estimatedTotal;

      axios
        .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${concernedUser.id}`, concernedUser)
        .then((response) => setCartItemsList(response.data.cartItem))
    } else {
      toast('Please SignUp /  Login');
    }
  }
  const addToWishlist = (item, data) => {

    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      const concernedUser = userDetails.find((val) => val.Email === sessionStorage.email);
      const existingWishListItems = concernedUser.wishListItem;
      if (existingWishListItems.length > 0) {
        const existingItemIndex = concernedUser.wishListItem.findIndex(wishListItem => wishListItem.id === item.id);

        if (existingItemIndex !== -1) {
          console.log("it is already wishlisted")
        } else {
          concernedUser.wishListItem.push(item);
        }

      } else {
        concernedUser.wishListItem.push(item);
      }
      const newData = data.map(dataItem => {
        if (dataItem.id === item.id) {
          return { ...dataItem, wishlist: true };
        }
        return dataItem;
      });
      setRequiredData(newData)

      axios
        .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${concernedUser.id}`, concernedUser)
    } else {
      toast("Please SignUp /  Login")
    }
  };
  const removeFromWishlist = (item, data) => {
    const concernedUser = userDetails.find((val) => val.Email === sessionStorage.email);
    const existingItemIndex = concernedUser.wishListItem.findIndex(wishListItem => wishListItem.id === item.id);
    concernedUser.wishListItem.splice(existingItemIndex, 1);
    const newData = data.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, wishlist: false };
      }
      return dataItem;
    });
    setRequiredData(newData)
    axios
      .put(`${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}/${concernedUser.id}`, concernedUser)
  };
  return <div className="container productsPage my-4">
    <ToastContainer />
    {
      location.state === "Offers" &&
      <div className="filterSection text-center">
        <button type="button" className="btn btn-outline-dark me-3" onClick={(e) => filterProducts(e.target.innerText)}>Bed</button>
        <button type="button" className="btn btn-outline-dark me-3" onClick={(e) => filterProducts(e.target.innerText)}>Sofa</button>
        <button type="button" className="btn btn-outline-dark me-3" onClick={(e) => filterProducts(e.target.innerText)}>Table</button>
        <button type="button" className="btn btn-outline-dark me-3" onClick={(e) => filterProducts(e.target.innerText)}>Chair</button>
      </div>
    }
    <div className="products my-4">
      <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5" >
        {
          requiredData.map((item) => {
            return (
              < div className="col-lg-3 mb-4" key={item.id}>
                <div className="card">
                  <img src={require("../Resources/" + item.image)} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Rs. {item.price}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-danger" onClick={() => addToCart(item)}>Add to cart</button>
                    {item.wishlist ?
                      <button className="btn" onClick={() => removeFromWishlist(item, requiredData)}>
                        <img src={require("../Resources/heart.jpg")} alt="..." style={{ width: "30px" }} />
                      </button>
                      :
                      <button className="btn" onClick={() => addToWishlist(item, requiredData)}>
                        <img src={require("../Resources/wishlist.png")} alt="..." style={{ width: "30px" }} />
                      </button>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </div >
};
export default ProductsPage;