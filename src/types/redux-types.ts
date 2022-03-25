export type State = {
  searchValue: string;
  currentRange: number;
};
export type Action = {
  type: ActionType;
  searchValuePayload?: string;
};
export enum ActionType {
  SET_SEARCH_VALUE,
  LOAD_MORE
}
