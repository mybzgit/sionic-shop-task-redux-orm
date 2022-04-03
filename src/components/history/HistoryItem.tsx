import React, { useState } from 'react';
import { OrderInfo } from '../../types/shop-store-types';
import CartItemList from '../cart/CartItemList';
import classes from './HistoryItem.module.css';

type HistoryItemProps = {
    orderInfo: OrderInfo;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ orderInfo }) => {
    const [showDetails, setShowDetails] = useState(false);
    const itemsCount = orderInfo.cartInfo.reduce((total, item) => {
        return total + item.count;
    }, 0);
    const onShowDetailsClick = () => {
        setShowDetails((prevState) => !prevState);
    };

    return (
        <div className={classes.history_item}>
            <div className={classes.item_header}>
                <img alt="order" />
                <span className={classes.order_name}>
                    Заказ №{orderInfo.id}
                </span>
                <span className={classes.order_date}>{orderInfo.date}</span>
                <span onClick={onShowDetailsClick}>Подробнее</span>
                {showDetails && (
                    <CartItemList
                        cartData={orderInfo.cartInfo}
                        readonly={true}
                    />
                )}
            </div>
            <div className={classes.item_row}>
                <div className={classes.info_block}>
                    <span>Статус заказа</span>
                    <span>Оплачен/Завершен</span>
                </div>
                <div className={classes.info_block}>
                    <span>Номер заказа</span>
                    <span>{orderInfo.id}</span>
                </div>
            </div>
            <div className={classes.item_row}>
                <div className={classes.info_block}>
                    <span>Кол-во товаров</span>
                    <span>{itemsCount}</span>
                </div>
                <div className={classes.info_block}>
                    <span>Стоимость заказа</span>
                    <span>{orderInfo.total}</span>
                </div>
                <div className={classes.info_block}>
                    <span>Адрес доставки</span>
                    <span>{orderInfo.address}</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;
