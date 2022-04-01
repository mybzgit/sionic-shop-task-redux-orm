import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { session } from "../../redux-store/redux-orm-store";
import {
  getPropertyValueByType,
  ProductImageType,
  ProductVariationPropertyListValueType,
  ProductVariationPropertyType,
  ProductVariationPropertyValueType,
} from "../../types/Entities";
import {
  Action,
  ActionType,
  CartItemInfo,
} from "../../types/shop-store-types";
import ProductImage from "../products/ProductImage";
import classes from "./CartItem.module.css";

type CartItemProps = {
  cartItemData: CartItemInfo;
};

const CartItem: React.FC<CartItemProps> = ({ cartItemData }) => {
  const productName = (session.Product.withId(cartItemData.product_id) as any)
    .name;

  const productVariation = session.ProductVariation.withId(
    cartItemData.product_variation_id
  );
  const productVariationPropertyValues: ProductVariationPropertyValueType[] = (
    productVariation as any
  ).productVariationPropertyValues
    .all()
    .toRefArray() as ProductVariationPropertyValueType[];

  const productVariationProperties: ProductVariationPropertyType[] =
    session.ProductVariationProperty.all().toRefArray() as ProductVariationPropertyType[];
  const productVariationPropertyListValues: ProductVariationPropertyListValueType[] =
    session.ProductVariationPropertyListValue.all().toRefArray() as ProductVariationPropertyListValueType[];

  const productImages = (
    session.Product.withId(cartItemData.product_id) as any
  ).images
    .all()
    .toRefArray() as ProductImageType[];

  const dispatch = useDispatch();

  const onRemoveItemHandler = () => {
    const action: Action = {
      type: ActionType.REMOVE_FROM_CART,
      cartItemPayload: { ...cartItemData },
    };
    dispatch(action);
  };

  const onItemCountChanged: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCount(+event.target.value);
    let action: Action = {
      type: ActionType.CHANGE_ITEM_COUNT,
      cartItemPayload: { ...cartItemData },
    };
    console.log(event.target.value, cartItemData.count);
    if (+event.target.value > cartItemData.count) {
      action.type = ActionType.ADD_TO_CART;
    }
    dispatch(action);
  };

  const [count, setCount] = useState(cartItemData.count);

  return (
    <div className={classes.item}>
      <ProductImage product_images={productImages} />
      <span className={classes.product_title}>{productName}</span>

      <input
        id={cartItemData.product_id + "_" + cartItemData.product_variation_id}
        type="number"
        min="1"
        max="5"
        value={count}
        onChange={onItemCountChanged}
      ></input>

      {productVariationProperties.length > 0 &&
        productVariationPropertyValues.length > 0 &&
        productVariationPropertyListValues.length > 0 &&
        productVariationProperties.map((pvp) => {
          return (
            <span className={classes.product_variation} key={pvp.id}>
              <b>{pvp.name}:</b>{" "}
              {getPropertyValueByType(
                pvp.id,
                pvp.type,
                productVariationPropertyValues,
                productVariationPropertyListValues
              )}
            </span>
          );
        })}

      <span className={classes.total_price}>
        {cartItemData.price * cartItemData.count} &#8381; 
      </span>
      <span className={classes.price}>({cartItemData.count}x{cartItemData.price} &#8381;)</span>
      <button type="button" onClick={onRemoveItemHandler}>
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
