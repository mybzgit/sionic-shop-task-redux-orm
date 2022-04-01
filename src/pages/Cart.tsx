import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemList from "../components/cart/CartItemList";
import Title from "../components/navigation/Title";
import { RootState } from "../redux-store/redux-orm-store";
import classes from "./Cart.module.css";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const onCreateOrder = () => {
    navigate("/order");
  };

  const cartData = useSelector((state: RootState) => state.shop.cart);
  let totalPrice = 0;

  if (cartData.length > 0) {
    totalPrice = cartData.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  }

  return (
    <Fragment>
      <Title text="Корзина" />
      <br />
      {cartData.length === 0 && <span>Вы не выбрали ни одного товара</span>}
      {cartData.length > 0 && (
        <div className={classes.container}>
          <div className={classes.list_header}>
            <span>Name of order</span>
            <div className={classes.info}>
              <span>Стоимость корзины:</span>
              <span className={classes.total}>
                <b>{totalPrice} &#8381;</b>
              </span>
            </div>
            <button type="button" onClick={onCreateOrder}>
              Оформить
            </button>
          </div>
          <CartItemList cartData={cartData} />
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
