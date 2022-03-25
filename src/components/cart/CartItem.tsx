import React from "react";
import classes from "./CartItem.module.css";

const CartItem: React.FC = () => {
  return (
    <div className={classes.item}>
      <img alt="product-image" />
      <span className={classes.product_title}>
        Длинное название товара в одну строчку
      </span>
      <input type="number" min="1" max="5" />

      <div className={classes.price_info}>
        <span className={classes.current_price}>от 350 000 &#8381;</span>
        <span className={classes.previous_price}>450 000 &#8381;</span>
      </div>
      <button type="button">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
