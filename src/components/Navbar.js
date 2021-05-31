import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <Link className="navbar-brand" to="/">
        Toko
      </Link>
      <Link to="/cart" className="navbar-brand">
        <ShoppingCartIcon />
      </Link>
    </nav>
  );
}
