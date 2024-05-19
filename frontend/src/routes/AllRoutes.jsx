import { Route,Routes } from "react-router-dom"

import { HomeScreen } from "../screens/HomeScreen"
import { ProductDetails } from "../screens/ProductDetails"
import { CartScreen } from "../screens/CartScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} ></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>
    </Routes>
  )
}
