import React from "react";
import { Product, ProductImage, ProductVariation } from "../../types/Entities";
import classes from "./ProductItem.module.css";
import ProductVariationsItem from './ProductVariationsItem';

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
      <ProductVariationsItem variations={product_variations} />
      <button type="button">Добавить в корзину</button>
    </div>
  );
};

export default ProductItem;
