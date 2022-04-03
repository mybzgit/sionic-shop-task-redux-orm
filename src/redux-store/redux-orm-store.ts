import {
  Product,
  Category,
  ProductImage,
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyValue,
  ProductVariationPropertyListValue,
} from './redux-orm-entities';

import {
  CategoryType,
  ProductType,
  ProductImageType,
  ProductVariationType,
  ProductVariationPropertyType,
  ProductVariationPropertyValueType,
  ProductVariationPropertyListValueType,
} from '../types/entity-types';

import { createStore, combineReducers } from 'redux';
import { ORM, createReducer } from 'redux-orm';

import shopReducer from './shop-reducer';

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
export const session = orm.session(store.getState().orm);

export const passDataToSession = (array: any[], type: string): void => {
  array.map((item) => {
    if (type === 'CategoryType') {
      let newItem = { ...item } as CategoryType;
      if (!session.Category.idExists(newItem.id))
        session.Category.create(newItem);
    }
    if (type === 'ProductType') {
      let newItem = { ...item } as ProductType;
      if (!session.Product.idExists(newItem.id))
        session.Product.create(newItem);
    }
    if (type === 'ProductImageType') {
      let newItem = { ...item } as ProductImageType;
      if (!session.ProductImage.idExists(newItem.id))
        session.ProductImage.create(newItem);
    }
    if (type === 'ProductVariationType') {
      let newItem = { ...item } as ProductVariationType;
      if (!session.ProductVariation.idExists(newItem.id))
        session.ProductVariation.create(newItem);
    }
    if (type === 'ProductVariationPropertyType') {
      let newItem = { ...item } as ProductVariationPropertyType;
      if (!session.ProductVariationProperty.idExists(newItem.id))
        session.ProductVariationProperty.create(newItem);
    }
    if (type === 'ProductVariationPropertyValueType') {
      let newItem = { ...item } as ProductVariationPropertyValueType;
      if (!session.ProductVariationPropertyValue.idExists(newItem.id))
        session.ProductVariationPropertyValue.create(newItem);
    }
    if (type === 'ProductVariationPropertyListValueType') {
      let newItem = { ...item } as ProductVariationPropertyListValueType;
      if (!session.ProductVariationPropertyListValue.idExists(newItem.id))
        session.ProductVariationPropertyListValue.create(newItem);
    }
  });
};
