import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CartItemList from "../components/cart/CartItemList";
import Title from "../components/navigation/Title";
import classes from "./Cart.module.css";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const onCreateOrder = () => {
    navigate("/order");
  };

  return (
    <Fragment>
      <Title text="Корзина" />
      <br />
      <div className={classes.container}>
        <div className={classes.list_header}>
          <span>Name of order</span>
          <div className={classes.info}>
            <span>Стоимость корзины:</span>
            <span className={classes.total}>
              <b>1 123 123 &#8381;</b>
            </span>
          </div>
          <button type="button" onClick={onCreateOrder}>
            Оформить
          </button>
        </div>
        <CartItemList />
      </div>
    </Fragment>
  );
};

export default Cart;
