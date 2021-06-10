import React from "react";
import "./stylesheet.css";
import Banner from "./banner";
import CartView from "./cartView";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isActive = useSelector((state) => state.active.shoppingCart);

  return (
    <main>
      <CartView />
      <div className={`blur ${isActive ? "active" : ""}`} />
      <Banner />
      <div className="fullscreen">{children}</div>
    </main>
  );
};

export default Layout;
