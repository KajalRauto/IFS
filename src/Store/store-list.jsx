import { createContext, useState } from "react";

export const StoreList = createContext({
  cartItemsList: [],
  setCartItemsList: () => { }
})

const StoreListProvider = ({ children }) => {
  const [cartItemsList, setCartItemsList] = useState([])
  const [wishListItemsList, setWishListItemsList] = useState([])

  return (
    < StoreList.Provider value={{ cartItemsList, setCartItemsList, wishListItemsList, setWishListItemsList }}>
      {children}
    </StoreList.Provider >
  )
}
export default StoreListProvider;