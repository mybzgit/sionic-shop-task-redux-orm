import Title from "../components/navigation/Title";
import classes from "./Order.module.css";
import OrderForm from "../components/order/OrderForm";
import OrderInfo from "../components/order/OrderInfo";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/redux-orm-store";

const Order: React.FC = () => {
  const total = useSelector((state: RootState) => state.shop.total);
  return (
    <div className={classes.container}>
      <div className={classes.order_details}>
        <Title text="Доставка" />
        <OrderForm total={total} />
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
