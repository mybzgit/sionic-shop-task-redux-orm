import { Reducer } from "redux";
import { State, Action, ActionType } from "../types/shop-store-types";

const initialState: State = {
  searchValue: "",
  selectedCategory: -1,
  total: 0,
  cart: [],
  ordersList: [],
  currentRange: 8,
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
      currentRange: 8
    };
  }
  if (action.type === ActionType.ADD_TO_CART) {
    let itemToAdd = action.cartItemPayload!;
    let previousState = [...state.cart];
    let duplicate = previousState.find(
      (i) =>
        i.product_id == itemToAdd.product_id &&
        i.product_variation_id == itemToAdd.product_variation_id
    );
    const other = state.cart.filter(
      (i) =>
        i.product_id !== itemToAdd.product_id ||
        i.product_variation_id !== itemToAdd.product_variation_id
    );
    if (duplicate) {
      duplicate.count = duplicate.count + 1;
      return {
        ...state,
        total: state.total + itemToAdd.price,
        cart: previousState,
      };
    }
    return {
      ...state,
      total: state.total + itemToAdd.price,
      cart: [...previousState, itemToAdd],
    };
  }
  if (action.type === ActionType.CHANGE_ITEM_COUNT) {
    let itemToRemove = action.cartItemPayload!;
    let previousState = [...state.cart];
    let duplicate = previousState.find(
      (i) =>
        i.product_id == itemToRemove.product_id &&
        i.product_variation_id == itemToRemove.product_variation_id
    );
    if (duplicate!.count > 1) {
      duplicate!.count = duplicate!.count - 1;
      return {
        ...state,
        total: state.total - itemToRemove.price,
        cart: previousState,
      };
    } else {
      return {
        ...state,
        total: state.total - itemToRemove.price,
        cart: previousState.filter(
          (i) =>
            i.product_id !== itemToRemove.product_id ||
            i.product_variation_id !== itemToRemove.product_variation_id
        ),
      };
    }
  }
  if (action.type === ActionType.REMOVE_FROM_CART) {
    const itemToRemove = action.cartItemPayload!;
    const duplicate = state.cart.find(
      (i) =>
        i.product_id == itemToRemove.product_id &&
        i.product_variation_id == itemToRemove.product_variation_id
    );
    return {
      ...state,
      total: state.total - duplicate!.price * duplicate!.count,
      cart: state.cart.filter(
        (i) =>
          i.product_id !== itemToRemove.product_id ||
          i.product_variation_id !== itemToRemove.product_variation_id
      ),
    };
  }
  if (action.type === ActionType.SAVE_ORDER) {
    return {
      ...state,
      cart: [],
      total: 0,
      ordersList: [
        ...state.ordersList,
        { ...action.orderInfoPayload!, cartInfo: [...state.cart] },
      ],
    };
  }
  if (action.type === ActionType.CHANGE_CURRENT_RANGE) {
    return {
      ...state,
      currentRange: state.currentRange + 8,
    };
  }

  return state;
};

export default shopReducer;
