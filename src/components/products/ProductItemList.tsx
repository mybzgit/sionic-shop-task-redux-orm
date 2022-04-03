import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import classes from './ProductItemList.module.css';

import { ProductType } from '../../types/entity-types';
import axios from 'axios';
import {
    passDataToSession,
    RootState,
    session,
} from '../../redux-store/redux-orm-store';
import { useSelector } from 'react-redux';

type ProductItemListProps = {
    categoryId: number;
    searchValue: string;
};

const ProductItemList: React.FC<ProductItemListProps> = React.memo(
    ({ categoryId, searchValue }: ProductItemListProps) => {
        const [loading, setLoading] = useState(true);
        const [productsList, setProductsList] = useState<ProductType[]>([]);

        const range = useSelector(
            (state: RootState) => state.shop.currentRange
        );

        useEffect(() => {
            setLoading(true);
            const categoryQuery =
                categoryId == -1 ? '' : `filter={"category_id":${categoryId}}`;

            let productsFromSession =
                categoryId != -1
                    ? session.Product.filter(
                          (p) => p.category_id === categoryId
                      )
                    : session.Product.all();

            if (productsFromSession.count() > range) {
                setProductsList([
                    ...(productsFromSession
                        .toRefArray()
                        .slice(0, range) as ProductType[]),
                ]);
                setLoading(false);
            } else {
                const rangeStart = productsFromSession.count();
                const rangeEnd = range - 1;
                axios
                    .get<ProductType[]>(
                        `https://test2.sionic.ru/api/Products?${categoryQuery}&range=[${rangeStart},${rangeEnd}]`
                    )
                    .then((products) => {
                        if (products.data.length) {
                            passDataToSession(
                                [...products.data],
                                'ProductType'
                            );

                            productsFromSession =
                                categoryId != -1
                                    ? session.Product.filter(
                                          (p) => p.category_id === categoryId
                                      )
                                    : session.Product.all();

                            setProductsList([
                                ...(productsFromSession
                                    .toRefArray()
                                    .slice(0, range) as ProductType[]),
                            ]);
                            setLoading(false);
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                    });
            }
        }, [categoryId, range]);

        const filteredProducts = productsList.filter(
            (p) => p.name.indexOf(searchValue) !== -1
        );

        return (
            <div className={classes.product_list}>
                {loading && <p>Loading products...</p>}
                {filteredProducts.length === 0 && !loading && (
                    <p>No products found</p>
                )}
                {!loading &&
                    productsList.length > 0 &&
                    filteredProducts.map((p) => {
                        return <ProductItem key={p.id} product={p} />;
                    })}
            </div>
        );
    }
);

export default ProductItemList;
