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

import { createStore, combineReducers, compose } from "redux";
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

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, composeEnhancers());
export type RootState = ReturnType<typeof store.getState>;
const dbState = store.getState().orm;
export const session = orm.session(dbState);

export const passDataToSession = (array: any[], type: string): void => {
  array.map((item) => {
    if (type === "CategoryType") {
      let newItem = { ...item } as CategoryType;
      if (!session.Category.idExists(newItem)) session.Category.create(newItem);
    }
    if (type === "ProductType")
    {
      let newItem = { ...item } as ProductType;
      if (!session.Product.idExists(newItem)) session.Product.create(newItem);
    }
    if (type === "ProductImageType")
    {
      let newItem = { ...item } as ProductImageType;
      if (!session.ProductImage.idExists(newItem)) session.ProductImage.create(newItem);
    }
    if (type === "ProductVariationType")
    {
      let newItem = { ...item } as ProductVariationType;
      if (!session.ProductVariation.idExists(newItem)) session.ProductVariation.create(newItem);
    }
    if (type === "ProductVariationPropertyType")
    {
      let newItem = { ...item } as ProductVariationPropertyType;
      if (!session.ProductVariationProperty.idExists(newItem)) session.ProductVariationProperty.create(newItem);
    }
    if (type === "ProductVariationPropertyValueType")
    {
      let newItem = { ...item } as ProductVariationPropertyValueType;
      if (!session.ProductVariationPropertyValue.idExists(newItem)) session.ProductVariationPropertyValue.create(newItem);
    }
    if (type === "ProductVariationPropertyListValueType")
    {
      let newItem = { ...item } as ProductVariationPropertyListValueType;
      if (!session.ProductVariationPropertyListValue.idExists(newItem)) session.ProductVariationPropertyListValue.create(newItem);
    }
  });
};
