import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreList } from "../Store/store-list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const { setCartItemsList } = useContext(StoreList)
  // begin---------------
  const [clientlist, setclientlist] = useState([]);
  const navigate = useNavigate();
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_C, REACT_APP_PROD_URL_C } = process.env;

  const url = `${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}`;
  const getClientlist = () => {
    fetch(url)
      .then((response) => response.json())
      .then((allClient) => setclientlist(allClient));
  };
  useEffect(() => {
    getClientlist();
  }, [true]);

  const addUser = (e) => {
    e.preventDefault();
    var result = clientlist.find(val => val.Email === userEmail.current.value)
    const goback = () => {
      toast.success(userEmail.current.value + " registered in successfully")
      setTimeout(() => {
        sessionStorage.status = true
        sessionStorage.email = userEmail.current.value
        navigate("/")
      }, 1000)
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail.current.value)) {
      toast.error("Enter valid email address(abc@po.in)");
    } else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/.test(userPassword.current.value)) {
      toast.error("Enter a strong password");
    } else if (result) {
      toast.error("Username or email is already registered");
    } else {
      const newCredential = {
        Name: userName.current.value,
        Email: userEmail.current.value,
        Password: userPassword.current.value,
        cartItem: [],
        wishListItem: [],
        total: 0,
        taxes: 0,
        estimatedTotal: 0
      }
      axios
        .post(url, newCredential)
        .then((response) => goback());
      setCartItemsList([])
      toast.success("Signed up successfully")
    }

  };
  // endshere------------------------
  return <div className="form-signup w-100 m-auto" style={{
    maxWidth: "500px",
    padding: "1rem"
  }}>
    <ToastContainer />
    <form onSubmit={(event) => addUser(event)}>
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

      <div className="form-floating mb-4">
        <input type="name" className="form-control" id="floatingInput" placeholder="name" style={{
          marginBottom: "-1px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px"
        }} ref={userName} />
        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-4">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" style={{
          marginBottom: "-1px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px"
        }} ref={userEmail} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-4">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" style={{
          marginBottom: "10px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px"
        }} ref={userPassword} />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-danger w-100 py-2" type="submit" >Sign in</button>
    </form>
  </div>
};
export default SignUp;