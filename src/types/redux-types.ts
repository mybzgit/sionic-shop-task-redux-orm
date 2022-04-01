import {
  ProductVariationPropertyListValueType,
  ProductVariationPropertyValueType,
} from "./Entities";

export type CartItemInfo = {
  product_id: number;
  product_variation_id: number;
  price: number;
  count: number;
};
export type OrderInfo = {
  id: number;
  date: string;
  name: string;
  phone: string;
  address: string;
  total: number;
  cartInfo: CartItemInfo[];
}
export type State = {
  searchValue: string;
  selectedCategory: number;
  cart: CartItemInfo[];
  total: number;
  ordersList: OrderInfo[];
};
export type Action = {
  type: ActionType;
  searchValuePayload?: string;
  selectedCategoryPayload?: number;
  cartItemPayload?: CartItemInfo;
  orderInfoPayload?: OrderInfo;
};
export enum ActionType {
  SET_SEARCH_VALUE,
  SET_SELECTED_CATEGORY,
  ADD_TO_CART,
  CHANGE_ITEM_COUNT,
  REMOVE_FROM_CART,
  SAVE_ORDER
}

export const getPropertyValueByType = (
  id: number,
  type: number,
  productVariationPropertyValues: ProductVariationPropertyValueType[],
  productVariationPropertyListValues: ProductVariationPropertyListValueType[]
) => {
  const pvpv = productVariationPropertyValues.find(
    (pvpv) => pvpv.product_variation_property_id === id
  );
  let value = "";
  if (type === 0) {
    value = pvpv!.value_string;
  }
  if (type === 1) {
    value = pvpv!.value_int.toString();
  }
  if (type === 2) {
    value = pvpv!.value_float.toString();
  }
  if (type === 3) {
    const listValue = productVariationPropertyListValues.find(
      (lv) =>
        lv.product_variation_property_id ===
          pvpv?.product_variation_property_id &&
        lv.id === pvpv?.product_variation_property_list_value_id
    );
    value = listValue!.title;
  }
  return value;
};
