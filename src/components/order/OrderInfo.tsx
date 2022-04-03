import React from 'react';
import classes from './OrderInfo.module.css';

type OrderInfoProps = {
    total: number;
};

const OrderInfo: React.FC<OrderInfoProps> = ({ total }) => {
    const deliveryPrice = 200;
    return (
        <div className={classes.order_info}>
            <span>Стоимость товаров:</span>
            <span>{total} &#8381;</span>
            <span>Стоимость доставки:</span>
            <span>{deliveryPrice} &#8381;</span>
            <span>Итого:</span>
            <span>
                <b>{total + deliveryPrice} &#8381;</b>
            </span>
        </div>
    );
};

export default OrderInfo;
