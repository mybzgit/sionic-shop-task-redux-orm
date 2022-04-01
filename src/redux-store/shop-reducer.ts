import { Reducer } from "redux";
import { State, Action, ActionType } from "../types/redux-types";

const initialState: State = {
  searchValue: "",
  selectedCategory: -1,
  total: 0,
  cart: [],
  ordersList: []
};

const shopReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  if (action.type === ActionType.SET_SEARCH_VALUE) {
    return {
      ...state,
      searchValue: action.searchValuePayload!,
    };
  }
  if (action.type === ActionType.SET_SELECTED_CATEGORY) {
    return {
      ...state,
      selectedCategory: action.selectedCategoryPayload!,
    };
  }
  if (action.type === ActionType.ADD_TO_CART) {
    return {
      ...state,
      total: state.total + action.cartItemPayload!.price,
      cart: [...state.cart, action.cartItemPayload!],
    };
  }
  if (action.type === ActionType.REMOVE_FROM_CART) {
    const itemToRemove = action.cartItemPayload!;
    return {
      ...state,
      total: state.total - itemToRemove.price,
      cart: state.cart.filter(
        (i) =>
          i.product_id !== itemToRemove.product_id || i.product_variation_id !== itemToRemove.product_variation_id
      ),
    };
  }
  if (action.type === ActionType.SAVE_ORDER) {
    return {
      ...state,
      cart: [],
      total: 0,
      ordersList: [...state.ordersList, { ...action.orderInfoPayload!, cartInfo: [...state.cart] } ]
    };
  }

  return state;
};

export default shopReducer;
