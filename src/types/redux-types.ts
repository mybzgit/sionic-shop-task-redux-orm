export type State = {
  searchValue: string;
  selectedCategory: number;
};
export type Action = {
  type: ActionType;
  searchValuePayload?: string;
  selectedCategoryPayload?: number;
};
export enum ActionType {
  SET_SEARCH_VALUE,
  SET_SELECTED_CATEGORY,
}
