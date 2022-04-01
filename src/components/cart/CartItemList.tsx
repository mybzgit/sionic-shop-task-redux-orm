import React from "react";
import { CartItemInfo } from "../../types/shop-store-types";
import CartItem from "./CartItem";
import classes from "./CartItemList.module.css";

type CartItemListProps = {
  cartData: CartItemInfo[];
}

const CartItemList: React.FC<CartItemListProps> = ({cartData}) => {
  return (
    <div className={classes.cart_list}>
      {cartData.length > 0 && cartData.map(i => {
        const key = i.product_id.toString() + i.product_variation_id.toString();
        return <CartItem key={key} cartItemData={i} />
      })}
    </div>
  );
};

export default CartItemList;
