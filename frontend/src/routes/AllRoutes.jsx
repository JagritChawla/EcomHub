import { Route,Routes } from "react-router-dom"

import { HomeScreen } from "../screens/HomeScreen"
import { ProductDetails } from "../screens/ProductDetails"
import { CartScreen } from "../screens/CartScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ShippingScreen from "../screens/ShippingScreen"
import { PrivateRoute } from "../components/PrivateRoute"
import { PayementScreen } from "../screens/PayementScreen"
import PlaceOrderScreen from "../screens/PlaceOrderScreen"
import OrderScreen from "../screens/OrderScreen"
import ProfileScreen from "../screens/ProfileScreen"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} ></Route>
        <Route path="/products/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartScreen />}></Route>
        <Route path="/login" element={<LoginScreen />}></Route>
        <Route path="/register" element={<RegisterScreen />}></Route>

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingScreen />}></Route>
          <Route path="/payment" element={<PayementScreen />}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/profile" element={<ProfileScreen />}></Route>


        </Route>
    </Routes>
  )
}
