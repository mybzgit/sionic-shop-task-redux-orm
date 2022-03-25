import React, { Fragment } from "react";
import HistoryItem from "../components/history/HistoryItem";
import Title from "../components/navigation/Title";
import classes from "./OrderHistory.module.css";

const OrderHistory: React.FC = () => {
  return (
    <Fragment>
      <Title text="История заказов" />
      <br />
      <HistoryItem />
    </Fragment>
  );
};

export default OrderHistory;
