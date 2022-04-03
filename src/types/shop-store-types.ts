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
};
export type State = {
    searchValue: string;
    selectedCategory: number;
    cart: CartItemInfo[];
    total: number;
    ordersList: OrderInfo[];
    currentRange: number;
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
    SAVE_ORDER,
    CHANGE_CURRENT_RANGE,
    RESET_CURRENT_RANGE,
}
