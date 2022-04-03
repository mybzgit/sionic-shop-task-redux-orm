import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import HistoryItem from '../components/history/HistoryItem';
import Title from '../components/navigation/Title';
import { RootState } from '../redux-store/redux-orm-store';
import classes from './OrderHistory.module.css';

const OrderHistory: React.FC = () => {
  const orderHistoryList = useSelector(
    (state: RootState) => state.shop.ordersList
  );

  const ordersNoFound = orderHistoryList.length === 0 && (
    <span>Вы не сделали ни одного заказа</span>
  );

  return (
    <Fragment>
      <Title text="История заказов" />
      <br />
      <div className={classes.history_list}>
        {ordersNoFound}
        {orderHistoryList.length > 0 &&
          orderHistoryList.map((item) => {
            return <HistoryItem key={item.id} orderInfo={item} />;
          })}
      </div>
    </Fragment>
  );
};

export default OrderHistory;
