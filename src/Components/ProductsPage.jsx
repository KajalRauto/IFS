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

  const getDet = () => {
    console.log("hi kajal here")
    fetch("http://localhost:8080/details")
      .then((response) => response.json())
      .then((allDet) => saveProductsList(allDet));
  };

  const getUsers = () => {
    fetch("http://localhost:8080/clients")
      .then((response) => response.json())
      .then((allDet) => saveUserDetails(allDet));
  };

  useEffect(() => {
    getUsers();
    getDet();
    console.log("inside first useefeect");
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
    console.log(details, "inside listofwishlisteditems")
    setRequiredData(cdetails);
  };
  const saveProductsList = (allDet) => {

    console.log("inside second use effect", allDet, userDetails);

    if (location.state == "Offers") {
      details = allDet.filter((item) => item.offeredPrice !== "NA")
      console.log(details, "inside saveproducts list1")
      setRequiredData(allDet.filter((item) => item.offeredPrice !== "NA"));
    } else {
      details = allDet.filter((item) => item.category == location.state)
      console.log(details, "inside saveproducts list2")
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
    console.log(details, "details inside addtocart")
    console.log(sessionStorage.email, "10000")
    console.log("100")
    if (sessionStorage.email !== "" && sessionStorage.email !== undefined && sessionStorage.email !== "undefined") {
      console.log("101")
      const concernedUser = userDetails.find((val) => val.Email === sessionStorage.email);
      console.log("7");
      console.log(sessionStorage.email, "hi", concernedUser, "concernedUser");
      const existingCartItems = concernedUser.cartItem;
      if (existingCartItems.length > 0) {
        console.log("102", "item.id")
        const existingItemIndex = concernedUser.cartItem.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
          concernedUser.cartItem[existingItemIndex].count++;
          console.log("103")
        } else {
          console.log("104")
          item.count = 1;
          concernedUser.cartItem.push(item);
        }

      } else {
        console.log("105")
        item.count = 1;
        concernedUser.cartItem = [item];
      }
      toast('1 Item got added to cart');
      console.log("106")
      concernedUser.total += item.price;
      console.log(concernedUser.total, "total added")
      axios
        .put(`http://localhost:8080/clients/${concernedUser.id}`, concernedUser)
        .then((response) => setCartItemsList(response.data.cartItem))
    } else {
      toast('Please SignUp /  Login');
      console.log("alert message please login / sign in")
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
          console.log("it got wishlisted")
          concernedUser.wishListItem.push(item);
        }

      } else {
        console.log("the first itemthat got wishlisted")
        concernedUser.wishListItem.push(item);
      }
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].id == item.id) {
      //     data[i].wishlist = true
      //   }
      // }
      const newData = data.map(dataItem => {
        if (dataItem.id === item.id) {
          return { ...dataItem, wishlist: true };
        }
        return dataItem;
      });
      console.log(newData, "details inside add to wishlist");
      setRequiredData(newData)
      axios
        .put(`http://localhost:8080/clients/${concernedUser.id}`, concernedUser)
      // .then((response) => setRequiredData(details))
    } else {
      toast("Please SignUp /  Login")
      console.log("alert message please login / sign in")
    }
  };
  const removeFromWishlist = (item, data) => {
    console.log(data, "inside remove from wishlist")
    const concernedUser = userDetails.find((val) => val.Email === sessionStorage.email);
    const existingItemIndex = concernedUser.wishListItem.findIndex(wishListItem => wishListItem.id === item.id);
    concernedUser.wishListItem.splice(existingItemIndex, 1);
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].id == item.id) {
    //     data[i].wishlist = false
    //   }
    // }
    const newData = data.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, wishlist: false };
      }
      return dataItem;
    });
    console.log(newData, "details inside remove from wishlist");
    setRequiredData(newData)
    axios
      .put(`http://localhost:8080/clients/${concernedUser.id}`, concernedUser)
    // .then((response) => setRequiredData(details))
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