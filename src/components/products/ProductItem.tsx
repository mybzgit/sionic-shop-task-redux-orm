import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { session } from "../../redux-store/redux-orm-store";
import {
  ProductType,
  ProductImageType,
  ProductVariationType,
} from "../../types/Entities";
import { Action, ActionType } from "../../types/shop-store-types";
import ProductImage from "./ProductImage";
import classes from "./ProductItem.module.css";
import ProductVariationsItem from "./ProductVariationsItem";

type ProductItemProps = {
  product: ProductType;
  product_images: ProductImageType[];
  product_variations: ProductVariationType[];
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  product_images = [],
  product_variations = [],
}: ProductItemProps) => {
  const [currentProductVariationId, setProductVariationId] = useState(-1);

  const dispatch = useDispatch();
  const onProductVariationChanged = (variationId: number) => {
    setProductVariationId(variationId);
  };

  const onAddToCartHandler = () => {
    const price = (session.ProductVariation.withId(currentProductVariationId) as any).price;

    const action: Action = {
      type: ActionType.ADD_TO_CART,
      cartItemPayload: {
        product_id: product.id,
        product_variation_id: currentProductVariationId,
        price: price,
        count: 1
      },
    };
    dispatch(action);
  };

  return (
    <div className={classes.card}>
      <ProductImage product_images={product_images} />

      <span className={classes.product_title}>{product.name}</span>

      <ProductVariationsItem
        variations={product_variations}
        onCurrentVariationChanged={onProductVariationChanged}
      />

      <button type="button" onClick={onAddToCartHandler}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductItem;
