import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreList } from "../Store/store-list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { setCartItemsList } = useContext(StoreList)



  //begin
  // const setCartItems = (allDet) => {
  //   if (sessionStorage.status) {
  //     const concernedUser = allDet.find((val) => val.Email === sessionStorage.email);
  //     console.log(sessionStorage.email, concernedUser, "checking")
  //     // setCartItemsList(concernedUser.cartItem);
  //   }
  // };
  //endshere
  const userEmail = useRef();
  const userPassword = useRef();

  const [clientlist, setclientlist] = useState([]);
  const navigate = useNavigate();
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_C, REACT_APP_PROD_URL_C } = process.env;

  const url = `${devEnv ? REACT_APP_DEV_URL_C : REACT_APP_PROD_URL_C}`;

  const getClientlist = () => {
    console.log("inside login effect call")
    fetch(url)
      .then((response) => response.json())
      .then((allClient) => setclientlist(allClient));
  };
  useEffect(() => {
    getClientlist();
    console.log("hi i am inside login effect")
  }, [true]);

  const goback = () => {
    console.log(userEmail.current.value + " logged in successfully")
    toast.success(userEmail.current.value + " logged in successfully")
    setTimeout(() => {
      sessionStorage.status = true
      sessionStorage.email = userEmail.current.value
      navigate("/")
    }, 1000)
  }

  const verifyUser = (e) => {
    e.preventDefault();
    const verified = clientlist.find((val) => val.Email === userEmail.current.value && val.Password == userPassword.current.value)

    if (verified) {
      console.log("inside last if")
      console.log(verified.cartItem, "kajal check here")
      setCartItemsList(verified.cartItem)
      goback()
    } else {
      toast.error("Email and Password does not match")
      console.log("not verified")
    }
  }

  return <div className="form-signin w-100 m-auto" style={{
    maxWidth: "500px",
    padding: "1rem"
  }}>
    <ToastContainer />
    <form onSubmit={(event) => verifyUser(event)}>
      <h1 className="h3 mb-3 fw-normal">Please log in</h1>

      <div className="form-floating mb-4">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" fdprocessedid="gwqkic" style={{
          marginBottom: "-1px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px"
        }} ref={userEmail} />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-4">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" fdprocessedid="7sau3s" style={{
          marginBottom: "10px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px"
        }} ref={userPassword} />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="btn btn-danger w-100 py-2" type="submit" fdprocessedid="d6z06">Sign in</button>
    </form>
  </div>
};
export default Login;