import { useContext, useEffect } from "react";
import AboutUs from "./AboutUs";
import Home from "./Home";
import Products from "./Products";
import { StoreList } from "../Store/store-list";

function HomePage() {
  return <div>
    <Home />
    <Products />
    <AboutUs />
  </div>
}
export default HomePage;