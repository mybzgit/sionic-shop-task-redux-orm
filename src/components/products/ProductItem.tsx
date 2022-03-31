import React from "react";
import {
  ProductType,
  ProductImageType,
  ProductVariationType,
} from "../../types/Entities";
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
  return (
    <div className={classes.card}>
      <ProductImage product_images={product_images} />

      <span className={classes.product_title}>{product.name}</span>

      <ProductVariationsItem variations={product_variations} />
      
      <button type="button">Добавить в корзину</button>
    </div>
  );
};

export default ProductItem;
