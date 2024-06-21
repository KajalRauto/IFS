import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [categories, setCategories] = useState([]);
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL_CA, REACT_APP_PROD_URL_CA } = process.env;

  const url = `${devEnv ? REACT_APP_DEV_URL_CA : REACT_APP_PROD_URL_CA}`;
  const getDet = () => {
    fetch(url)
      .then((response) => response.json())
      .then((allDet) => setCategories(allDet));
  };

  useEffect(() => {
    getDet();
  }, [true]);

  return (
    <div className="container products my-4">
      <h1 className="pb-4 text-center">Products</h1>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5">
        {categories.map((item, index) => {
          return (
            <Link to="/products" state={item.variety} key={index} style={{ textDecoration: "none" }}>
              <div className="col mb-4">
                <div className="card" style={{ border: "none", cursor: "pointer", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                  <img src={require("../Resources/" + item.image)} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">{item.variety}</h5>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div >
  )
};
export default Products;

