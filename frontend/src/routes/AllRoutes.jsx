import { Route,Routes } from "react-router-dom"

import { HomeScreen } from "../screens/HomeScreen"
import { ProductDetails } from "../screens/ProductDetails"
import { CartScreen } from "../screens/CartScreen"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} ></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>

    </Routes>
  )
}
