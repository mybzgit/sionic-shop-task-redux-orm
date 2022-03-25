import React, { Fragment, useState } from "react";
import ProductItemList from "../components/products/ProductItemList";
import Title from "../components/navigation/Title";
import classes from "./Main.module.css";
import CategoryList from "../components/products/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { Action, ActionType } from "../types/redux-types";
import { RootState } from "../redux-store/redux-orm-store";

const Main: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const searchValue = useSelector<RootState, string>(
    (state: RootState) => state.shop.searchValue
  );

  const onCategoryChanged = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };
  const dispatch = useDispatch();
  const onMoreClick = () => {
    const action: Action = {
      type: ActionType.LOAD_MORE,
    };
    dispatch(action);
  };
  return (
    <Fragment>
      <div className={classes.categories}>
        <Title text="Категории товаров" />
        <CategoryList onSelectedCategoryChanged={onCategoryChanged} />
      </div>
      <ProductItemList
        searchValue={searchValue}
        categoryId={selectedCategory}
      />
      <button className={classes.loadmore} type="button" onClick={onMoreClick}>
        Показать больше товаров
      </button>
    </Fragment>
  );
};

export default Main;
