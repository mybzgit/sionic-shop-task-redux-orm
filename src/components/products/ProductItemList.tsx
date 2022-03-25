import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductItemList.module.css";

import { Product, ProductImage, ProductVariation } from "../../types/Entities";
import axios from "axios";
import { useSelector } from "react-redux";
import { State } from "../../types/redux-types";

type ProductItemListProps = {
  categoryId: number;
  searchValue: string;
};

const ProductItemList: React.FC<ProductItemListProps> = ({
  categoryId,
  searchValue,
}: ProductItemListProps) => {
  const [loading, setLoading] = useState(true);

  const [productsList, setProductsList] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [productVariations, setProductVariations] = useState<
    ProductVariation[]
  >([]);

  const range = useSelector<State, number>((state) => state.currentRange);

  useEffect(() => {
    setLoading(true);
    const categoryQuery =
      categoryId == -1 ? "" : `filter={"category_id":${categoryId}}`;
    const rangeQuery = `range=[0,${range}]`;
    axios
      .get<Product[]>(`https://test2.sionic.ru/api/Products?${categoryQuery}&${rangeQuery}`)
      .then((products) => {
        if (products.data.length) {
          setProductsList([...products.data]);
          setLoading(false);
        }
      });
  }, [categoryId, range]);
  
  useEffect(() => {
    axios
      .get<ProductImage[]>("https://test2.sionic.ru/api/ProductImages")
      .then((images) => {
        if (images.data.length) {
          setProductImages([...images.data]);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get<ProductVariation[]>("https://test2.sionic.ru/api/ProductVariations")
      .then((variations) => {
        if (variations.data.length) {
          setProductVariations([...variations.data]);
        }
      });
  }, []);

  return (
    <div className={classes.product_list}>
      {loading && <p>Loading products...</p>}
      {productsList.length === 0 && !loading && <p>No products found</p>}
      {!loading && productsList.length > 0 &&
        productImages.length > 0 &&
        productsList
          .filter((p) => p.name.indexOf(searchValue) !== -1)
          .map((p) => {
            return (
              <ProductItem
                key={p.id}
                product={p}
                product_image={productImages.find((i) => i.product_id == p.id)}
                product_variations={productVariations.filter(v => v.product_id == p.id )}
              />
            );
          })}
    </div>
  );
};

export default ProductItemList;
