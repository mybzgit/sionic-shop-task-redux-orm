import axios from "axios";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { passDataToSession, session } from "../../redux-store/redux-orm-store";
import {
  CategoryType,
  ProductVariationPropertyListValueType,
  ProductVariationPropertyType,
} from "../../types/Entities";
import { Action, ActionType } from "../../types/shop-store-types";
import classes from "./CategoryList.module.css";

const CategoryList: React.FC = React.memo(() => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (session.Category.count() === 0) {
      axios
        .get<CategoryType[]>("https://test2.sionic.ru/api/Categories")
        .then((response) => {
          if (response.data.length) {
            passDataToSession([...response.data], "CategoryType");
            setCategories([...response.data]);
          }
        });
    } else {
      const categoriesFromSession = session.Category.all()
        .toRefArray()
        .map((c) => {
          return c as CategoryType;
        });
      setCategories([...categoriesFromSession]);
    }
  }, []);

  useEffect(() => {
    if (
      session.ProductVariationProperty.count() === 0 &&
      session.ProductVariationPropertyListValue.count() === 0
    ) {
      const productVariationPropertiesRequest = axios.get(
        `https://test2.sionic.ru/api/ProductVariationProperties`
      );
      const productVariationPropertyListValueTypiesRequest = axios.get(
        `https://test2.sionic.ru/api/ProductVariationPropertyListValues`
      );

      axios
        .all([
          productVariationPropertiesRequest,
          productVariationPropertyListValueTypiesRequest,
        ])
        .then(
          axios.spread((...responses) => {
            const productVariationProperties = responses[0]
              .data as ProductVariationPropertyType[];
            const productVariationPropertyListValueTypies = responses[1]
              .data as ProductVariationPropertyListValueType[];
            if (productVariationProperties.length) {
              passDataToSession(
                [...productVariationProperties],
                "ProductVariationPropertyType"
              );
            }
            if (productVariationPropertyListValueTypies.length) {
              passDataToSession(
                [...productVariationPropertyListValueTypies],
                "ProductVariationPropertyListValueType"
              );
            }
          })
        );
    }
  }, []);

  const dispatch = useDispatch();

  const onCategoryChanged: ChangeEventHandler<HTMLSelectElement> = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const action: Action = {
      type: ActionType.SET_SELECTED_CATEGORY,
      selectedCategoryPayload: +e.target.value,
    };
    dispatch(action);
  };

  return (
    <div className={classes.categories}>
      {categories.length > 0 && (
        <select onChange={onCategoryChanged}>
          <option key={-1} value="-1">
            All
          </option>
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
});

export default CategoryList;
