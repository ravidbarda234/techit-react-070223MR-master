import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import { useState } from "react";
import PageNotFound from "./components/PageNotFound";
import NewProduct from "./components/NewProduct";
import UpdateProduct from "./components/UpdateProduct";
import Cart from "./components/Cart";

function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  return (
    <div className="App">
      <ToastContainer theme="dark" />
      <Router>
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="/" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/register"
            element={<Register setUserInfo={setUserInfo} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products userInfo={userInfo} />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
