import React, { FormEvent, FormEventHandler, useRef, useState } from "react";
import OrderInfo from "../components/order/OrderInfo";
import Title from "../components/navigation/Title";
import classes from "./Order.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store/redux-orm-store";
import { Action, ActionType } from "../types/redux-types";
import { useNavigate } from "react-router-dom";

const Order: React.FC = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const cartInfo = useSelector((state: RootState) => state.shop.cart);
  const total = useSelector((state: RootState) => state.shop.total);

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      dateRef.current?.value &&
      timeRef.current?.value &&
      addressRef.current?.value &&
      nameRef.current?.value &&
      phoneRef.current?.value
    ) {
      const action: Action = {
        type: ActionType.SAVE_ORDER,
        orderInfoPayload: {
          id: Math.random(),
          date: dateRef.current?.value + "_" + timeRef.current?.value,
          name: nameRef.current?.value,
          phone: phoneRef.current?.value,
          address: addressRef.current?.value,
          total: total,
          cartInfo: [...cartInfo],
        },
      };
      dispatch(action);
      setError('');
      event.currentTarget.reset();
      navigate('/history');
    }
    else {
      setError('Заполните все поля формы');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.order_details}>
        <Title text="Доставка" />
        <span className={classes.error}>{error}</span>
        <form id="orderForm" onSubmit={onSubmitForm}>
          <label htmlFor="date">Когда доставить?</label>
          <div className={classes.date_time}>
            <input
              ref={dateRef}
              id="date"
              type="date"
              placeholder="Выберете дату"
            ></input>
            <input
              ref={timeRef}
              id="time"
              type="time"
              placeholder="Выберете время"
            ></input>
          </div>

          <label htmlFor="address">Куда доставить?</label>
          <input
            ref={addressRef}
            id="address"
            type="text"
            placeholder="Выберете адрес доставки"
          ></input>

          <label htmlFor="userName">Имя</label>
          <input ref={nameRef} id="userName" type="text"></input>
          <label htmlFor="phone">Телефон</label>
          <input ref={phoneRef} id="phone" type="text"></input>
        </form>
      </div>
      <div className={classes.info}>
        <OrderInfo total={total} />
        <button className={classes.order_button} form="orderForm" type="submit">
          Сделать заказ
        </button>
      </div>
    </div>
  );
};

export default Order;
