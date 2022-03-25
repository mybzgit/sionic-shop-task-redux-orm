import React from "react";
import classes from "./OrderInfo.module.css";

const OrderInfo: React.FC = () => {
  return (
    <div className={classes.order_info}>
      <span>Стоимость товаров:</span>
      <span>200 584 &#8381;</span>
      <span>Стоимость доставки:</span>
      <span>200 &#8381;</span>
      <span>Итого:</span>
      <span><b>200 784 &#8381;</b></span>
    </div>
  );
};

export default OrderInfo;
