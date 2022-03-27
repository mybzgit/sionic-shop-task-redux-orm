import { Reducer } from "redux";
import { State, Action, ActionType } from "../types/redux-types";

const initialState: State = {
  searchValue: ""
};

const shopReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  if (action.type === ActionType.SET_SEARCH_VALUE) {
    return {
      searchValue: action.searchValuePayload!
    };
  }
 
  return state;
};

export default shopReducer;
