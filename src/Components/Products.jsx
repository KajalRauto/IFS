import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [categories, setCategories] = useState([]);

  const getDet = () => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((allDet) => setCategories(allDet));
  };

  useEffect(() => {
    getDet();
  }, [true]);

  return (
    <div className="container products my-4">
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

