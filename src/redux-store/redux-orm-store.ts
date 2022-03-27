import {
  Product,
  Category,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyValue,
  ProductVariationPropertyListValue,
} from "./redux-orm-entities";

import { createStore, combineReducers } from "redux";
import { ORM, createReducer, createSelector, ORMOpts } from "redux-orm";

import shopReducer from "./shop-reducer";

const schema = {
  Product,
   Category,
  // ProductImage,
  // ProductVariation,
  // ProductVariationProperty,
  // ProductVariationPropertyValue,
  // ProductVariationPropertyListValue,
};

type Schema = typeof schema;

export const orm: ORM<Schema> = new ORM<Schema>({
  stateSelector: (state) => state.orm,
});

orm.register(
  Product,
   Category,
  // ProductImage,
  // ProductVariation,
  // ProductVariationProperty,
  // ProductVariationPropertyValue,
  // ProductVariationPropertyListValue
);

const rootReducer = combineReducers({
  orm: createReducer(orm),
  shop: shopReducer,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export const session = orm.session(orm.getEmptyState());

export const productsSelector = createSelector(orm, session => session.Product.first());
