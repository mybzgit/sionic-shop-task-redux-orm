import { Reducer } from "redux";
import { State, Action, ActionType } from "../types/redux-types";

const initialState: State = {
  searchValue: "",
  selectedCategory: -1,
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
 
  return state;
};

export default shopReducer;
