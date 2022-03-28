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
import { ORM, createReducer, createSelector } from "redux-orm";

import shopReducer from "./shop-reducer";
import axios from "axios";

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
const dbState = store.getState().orm;
export const session = orm.mutableSession(dbState);

export type RootState = ReturnType<typeof store.getState>;

(() => {
  axios
  .get<ProductVariationProperty[]>("https://test2.sionic.ru/api/ProductVariationProperties")
  
  .then((response) => {
    if (response.data.length) {
      response.data.forEach((pvp) => {
        session.ProductVariationProperty.create({ ...pvp });
      });
    }
  });
})();

(() => {
  axios
  .get<ProductVariationPropertyListValue[]>("https://test2.sionic.ru/api/ProductVariationPropertyListValues")
  
  .then((response) => {
    if (response.data.length) {
      response.data.forEach((pvplv) => {
        session.ProductVariationPropertyListValue.create({ ...pvplv });
      });
    }
  });
})();

//const emptyDBState = orm.getEmptyState();

// export const productCountSelector = createSelector(
//   orm,
//   (state: RootState) => state.orm,
//   (session) => {
//     return session.Product.all()
//       .toModelArray()
//       .map((pr) => {
//         const { ref } = pr;
//         return {
//           ...ref,
//         };
//       });
//   }
// );
