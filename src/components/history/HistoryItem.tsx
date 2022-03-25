import React from "react";
import classes from "./HistoryItem.module.css";

const HistoryItem: React.FC = () => {
  return (
    <div className={classes.history_item}>
      <div className={classes.item_header}>
        <img alt="order" />
        <span className={classes.order_name}>OrderName</span>
        <span className={classes.order_date}>25.03.2022</span>
        <a href="">Подробнее</a>
      </div>
      <div className={classes.item_row}>
        <div className={classes.info_block}>
          <span>Статус заказа</span>
          <span>Оплачен/Завершен</span>
        </div>
        <div className={classes.info_block}>
          <span>Номер заказа</span>
          <span>#123-321</span>
        </div>
      </div>
      <div className={classes.item_row}>
        <div className={classes.info_block}>
          <span>Кол-во товаров</span>
          <span>4 шт.</span>
        </div>
        <div className={classes.info_block}>
          <span>Стоимость заказа</span>
          <span>250 000 &#8381;</span>
        </div>
        <div className={classes.info_block}>
          <span>Адрес доставки</span>
          <span>Адрес</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
