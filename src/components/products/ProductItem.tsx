import React, { useState } from "react";
import { Product, ProductImage, ProductVariation } from "../../types/Entities";
import classes from "./ProductItem.module.css";

type ProductItemProps = {
  product: Product;
  product_image?: ProductImage;
  product_variations?: ProductVariation[];
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
      <span className={classes.current_price}>{product.id}</span>
      {/* <div className={classes.sale}>
        <span className={classes.previous_price}>450 000 &#8381;</span>
        <span className={classes.discount}>-10%</span>
      </div> */}
      {product_variations?.length > 0 && (
        <select>
          {product_variations?.sort((v1, v2) => v1.price > v2.price ? 1 : -1)
          .map((v) => {
            return (
              <option key={v.id} value={v.id}>
                {v.price}
              </option>
            );
          })}
        </select>
      )}
      <button type="button">Добавить в корзину</button>
    </div>
  );
};

export default ProductItem;
