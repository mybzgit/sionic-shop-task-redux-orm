import React from "react";
import CartItem from "./CartItem";
import classes from "./CartItemList.module.css";

const CartItemList: React.FC = () => {
  return (
    <div className={classes.cart_list}>
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
};

export default CartItemList;
