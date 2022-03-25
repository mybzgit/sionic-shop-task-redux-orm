import React from "react";
import OrderInfo from "../components/order/OrderInfo";
import Title from "../components/navigation/Title";
import classes from "./Order.module.css";

const Order: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.order_details}>
        <Title text="Доставка" />
        <form>
          <label htmlFor="date">Когда доставить?</label>
          <div className={classes.date_time}>
            <input id="date" type="date" placeholder="Выберете дату"></input>
            <input id="time" type="time" placeholder="Выберете время"></input>
          </div>

          <label htmlFor="location">Когда доставить?</label>
          <input
            id="location"
            type="text"
            placeholder="Выберете адрес доставки"
          ></input>

          <label htmlFor="userName">Имя</label>
          <input id="userName" type="text"></input>
          <label htmlFor="phone">Телефон</label>
          <input id="phone" type="text"></input>
        </form>
      </div>
      <div className={classes.info}>
        <OrderInfo />
        <button className={classes.order_button} type="submit">
          Сделать заказ
        </button>
      </div>
    </div>
  );
};

export default Order;
