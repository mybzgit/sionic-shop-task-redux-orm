export type State = {
  searchValue: string;
};
export type Action = {
  type: ActionType;
  searchValuePayload?: string;
};
export enum ActionType {
  SET_SEARCH_VALUE
}
