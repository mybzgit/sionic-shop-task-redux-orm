import React from "react";
import { ProductType, ProductImageType, ProductVariationType } from "../../types/Entities";
import classes from "./ProductItem.module.css";
import ProductVariationsItem from './ProductVariationsItem';

type ProductItemProps = {
  product: ProductType;
  product_image?: ProductImageType;
  product_variations?: ProductVariationType[];
};

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  product_image,
  product_variations = [],
}: ProductItemProps) => {
  const imageLocation = "https://test2.sionic.ru/";

  return (
    <div className={classes.card}>
      <img src={imageLocation + product_image?.image_url} alt="product-image" />
      <span className={classes.product_title}>{product.name}</span>
      <ProductVariationsItem variations={product_variations} />
      <button type="button">Добавить в корзину</button>
    </div>
  );
};

export default ProductItem;
