import { Route,Routes } from "react-router-dom"

import { HomeScreen } from "../screens/HomeScreen"
import { ProductDetails } from "../screens/ProductDetails"
import { CartScreen } from "../screens/CartScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ShippingScreen from "../screens/ShippingScreen"
import { PrivateRoute } from "../components/PrivateRoute"
import AdminRoute from "../components/AdminRoute"
import { PayementScreen } from "../screens/PayementScreen"
import PlaceOrderScreen from "../screens/PlaceOrderScreen"
import OrderScreen from "../screens/OrderScreen"
import ProfileScreen from "../screens/ProfileScreen"
import OrderListScreen from "../screens/admin/OrderListScreen"
import ProductListScreen from "../screens/admin/ProductListScreen"
import ProductEditScreen from "../screens/admin/ProductEditScreen"
import UserListScreen from "../screens/admin/UserListScreen"
import UserEditScreen from "../screens/admin/UserEditScreen"

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} ></Route>
        <Route path="/search/:keyword" element={<HomeScreen />} ></Route>
        <Route path="/page/:pageNumber" element={<HomeScreen />} ></Route>
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} ></Route>
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

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />}></Route>
          <Route path="/admin/productlist" element={<ProductListScreen />}></Route>
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />}></Route>
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}></Route>
          <Route path="/admin/userlist" element={<UserListScreen />}></Route>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />}></Route>

        </Route>
    </Routes>
  )
}
