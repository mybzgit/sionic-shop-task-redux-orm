import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import HistoryItem from "../components/history/HistoryItem";
import Title from "../components/navigation/Title";
import { RootState } from "../redux-store/redux-orm-store";
import classes from "./OrderHistory.module.css";

const OrderHistory: React.FC = () => {

  const orderHistoryList = useSelector((state: RootState) => state.shop.ordersList);

  return (
    <Fragment>
      <Title text="История заказов" />
      <br />
      {orderHistoryList.length === 0 && <span>Вы не сделали ни одного заказа</span>}
      {orderHistoryList.length > 0 && orderHistoryList.map(oh => {
        return <HistoryItem key={oh.id} orderInfo={oh} />
      })}
    </Fragment>
  );
};

export default OrderHistory;
