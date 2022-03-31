import {
  Product,
  Category,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyValue,
  ProductVariationPropertyListValue,
} from "./redux-orm-entities";

import {
  CategoryType,
  ProductType,
  ProductImageType,
  ProductVariationType,
  ProductVariationPropertyType,
  ProductVariationPropertyValueType,
  ProductVariationPropertyListValueType,
} from "../types/Entities";

import { createStore, combineReducers } from "redux";
import { ORM, createReducer, createSelector } from "redux-orm";

import shopReducer from "./shop-reducer";

const schema = {
  Product,
  Category,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyValue,
  ProductVariationPropertyListValue,
};

type Schema = typeof schema;

export const orm: ORM<Schema> = new ORM<Schema>({
  stateSelector: (state: RootState) => state.orm,
});

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
  shop: shopReducer,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
const dbState = store.getState().orm;
export const session = orm.session(dbState);

export const passDataToSession = (array: any[], type: string): void => {
  array.map((item) => {
    if (type === "CategoryType")
      session.Category.create({ ...item } as CategoryType);
    if (type === "ProductType")
      session.Product.create({ ...item } as ProductType);
    if (type === "ProductImageType")
      session.ProductImage.create({ ...item } as ProductImageType);
    if (type === "ProductVariationType")
      session.ProductVariation.create({ ...item } as ProductVariationType);
    if (type === "ProductVariationPropertyType")
      session.ProductVariationProperty.create({
        ...item,
      } as ProductVariationPropertyType);
    if (type === "ProductVariationPropertyValueType")
      session.ProductVariationPropertyValue.create({
        ...item,
      } as ProductVariationPropertyValueType);
    if (type === "ProductVariationPropertyListValueType")
      session.ProductVariationPropertyListValue.create({
        ...item,
      } as ProductVariationPropertyListValueType);
  });
};
