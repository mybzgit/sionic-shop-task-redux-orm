import React, { Fragment, useState } from 'react';
import ProductItemList from '../components/products/ProductItemList';
import Title from '../components/navigation/Title';
import classes from './Main.module.css';
import CategoryList from '../components/products/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux-store/redux-orm-store';
import { ActionType } from '../types/shop-store-types';

const Main: React.FC = () => {
    const searchValue = useSelector<RootState, string>(
        (state: RootState) => state.shop.searchValue
    );
    const selectedCategory = useSelector<RootState, number>(
        (state: RootState) => state.shop.selectedCategory
    );

    const dispatch = useDispatch();

    const onMoreClick = () => {
        dispatch({ type: ActionType.CHANGE_CURRENT_RANGE });
    };
    return (
        <Fragment>
            <div className={classes.categories}>
                <Title text="Категории товаров" />
                <CategoryList />
            </div>
            <br />
            <ProductItemList
                searchValue={searchValue}
                categoryId={selectedCategory}
            />
            <button
                className={classes.loadmore}
                type="button"
                onClick={onMoreClick}>
                Показать больше товаров
            </button>
        </Fragment>
    );
};

export default Main;
