import React, { useCallback, useEffect, useState } from 'react';
import classes from './ProductItemList.module.css';

import { ProductType } from '../../types/entity-types';
import axios from 'axios';
import {
  passDataToSession,
  RootState,
  session,
} from '../../redux-store/redux-orm-store';
import { useSelector } from 'react-redux';
import { QuerySet } from 'redux-orm';
import ProductItemMinInfo from './ProductItemMinInfo';
import SelectProductPopup from './SelectProductPopup';

type ProductItemListProps = {
  categoryId: number;
  searchValue: string;
};

const ProductItemList: React.FC<ProductItemListProps> = React.memo(
  ({ categoryId, searchValue }: ProductItemListProps) => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<ProductType[]>([]);

    const range = useSelector((state: RootState) => state.shop.currentRange);

    const getProductsFromSession = (): QuerySet => {
      return categoryId !== -1
        ? session.Product.filter((p) => p.category_id === categoryId)
        : session.Product.all();
    };
    const convertToProductsArray = (productsFromSession: QuerySet) => {
      return productsFromSession.toRefArray().slice(0, range) as ProductType[];
    };

    const [productToShow, setProductToShow] = useState<ProductType>();

    const onShowVariations = useCallback((product: ProductType) => {
      setProductToShow({ ...product });
      setPopupVisible(true);
    }, []);

    useEffect(() => {
      setLoading(true);
      const categoryQuery =
        categoryId === -1 ? '' : `filter={"category_id":${categoryId}}`;

      let productsFromSession = getProductsFromSession();

      if (productsFromSession.count() > range) {
        setProductsList([...convertToProductsArray(productsFromSession)]);
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
              passDataToSession([...products.data], 'ProductType');

              productsFromSession = getProductsFromSession();
              setProductsList([...convertToProductsArray(productsFromSession)]);
              setLoading(false);
              window.scrollTo(0, document.body.scrollHeight);
            }
          });
      }
    }, [categoryId, range, convertToProductsArray, getProductsFromSession]);

    const filteredProducts = productsList.filter(
      (p) => p.name.indexOf(searchValue) !== -1
    );
    const [popupVisible, setPopupVisible] = useState(false);
    const onClosePopup = () => {
      setPopupVisible(false);
    };

    return (
      <div className={classes.product_list}>
        {loading && <p>Loading products...</p>}
        {filteredProducts.length === 0 && !loading && <p>No products found</p>}
        {!loading &&
          productsList.length > 0 &&
          filteredProducts.map((p) => {
            return (
              <ProductItemMinInfo
                key={p.id}
                product={p}
                onShowVariations={onShowVariations}
              />
            );
          })}
        {popupVisible && productToShow?.id && (
          <SelectProductPopup
            product={productToShow}
            onCloseHandler={onClosePopup}
          />
        )}
      </div>
    );
  }
);

export default ProductItemList;
