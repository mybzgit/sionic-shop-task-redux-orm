import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { session } from '../../redux-store/redux-orm-store';
import { ProductType } from '../../types/entity-types';
import { Action, ActionType } from '../../types/shop-store-types';
import ProductImage from './ProductImage';
import classes from './ProductItem.module.css';
import ProductVariationsItem from './ProductVariationsItem';

type ProductItemProps = {
  product: ProductType;
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
}: ProductItemProps) => {
  const [currentProductVariationId, setProductVariationId] = useState(-1);

  const dispatch = useDispatch();
  const onProductVariationChanged = useCallback((variationId: number) => {
    setProductVariationId(variationId);
  }, []);

  const onAddToCartHandler = useCallback(() => {
    const price = (
      session.ProductVariation.withId(currentProductVariationId) as any
    ).price;
    const action: Action = {
      type: ActionType.ADD_TO_CART,
      cartItemPayload: {
        product_id: product.id,
        product_variation_id: currentProductVariationId,
        price: price,
        count: 1,
      },
    };
    dispatch(action);
  }, [currentProductVariationId]);

  return (
    <div className={classes.card}>
      <ProductImage productId={product.id} />

      <span className={classes.product_title}>{product.name}</span>

      <ProductVariationsItem
        productId={product.id}
        onCurrentVariationChanged={onProductVariationChanged}
      />

      <button type="button" onClick={onAddToCartHandler}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default React.memo(ProductItem);
