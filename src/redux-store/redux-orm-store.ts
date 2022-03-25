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
import { ORM, createReducer } from "redux-orm";

import shopReducer from "./shop-reducer";

const orm = new ORM();
orm.register(
  Product,
  Category,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyValue,
  ProductVariationPropertyListValue
);

const rootReducer = combineReducers({
  orm: createReducer(orm),
  shop: shopReducer
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export const session = orm.session();

