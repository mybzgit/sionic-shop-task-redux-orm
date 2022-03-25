import { Reducer } from "redux";
import { State, Action, ActionType } from "../types/redux-types";

const initialState: State = {
  searchValue: "",
  currentRange: 10,
};

const shopReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  if (action.type === ActionType.SET_SEARCH_VALUE) {
    return {
      searchValue: action.searchValuePayload!,
      currentRange: state.currentRange,
    };
  }
  if (action.type === ActionType.LOAD_MORE) {
    return {
      searchValue: state.searchValue,
      currentRange: state.currentRange > 50 ? 50 : state.currentRange + 10,
    };
  }

  return state;
};

export default shopReducer;
