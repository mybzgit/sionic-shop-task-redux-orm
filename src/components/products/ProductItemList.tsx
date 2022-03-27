import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductItemList.module.css";

import { Product, ProductImage, ProductVariation } from "../../types/Entities";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  RootState,
  productsSelector,
  session,
} from "../../redux-store/redux-orm-store";

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

  // const productSelector = createSelector(
  //   orm,
  //   (state: RootState) => state.orm,
  //   (session) => {
  //     return session.Product.all().toRefArray();
  //   }
  // );

  const fillProducts = (products: Product[]) => {
    products.map((p) => {
      session.Product.create({ ...p });
    });
  };

  const product = useSelector((state: RootState) => productsSelector(state.orm));
  console.log(product, session.Product.first());
  
  useEffect(() => {
    setLoading(true);
    const categoryQuery =
      categoryId == -1 ? "" : `filter={"category_id":${categoryId}}`;

    axios
      .get<Product[]>(`https://test2.sionic.ru/api/Products?${categoryQuery}`)
      .then((products) => {
        if (products.data.length) {
          setProductsList([...products.data]);
          fillProducts([...products.data]);
          setLoading(false);
        }
      });
  }, [categoryId]);

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
      {!loading &&
        productsList.length > 0 &&
        productVariations.length > 0 &&
        productImages.length > 0 &&
        productsList
          .filter((p) => p.name.indexOf(searchValue) !== -1)
          .map((p) => {
            return (
              <ProductItem
                key={p.id}
                product={p}
                product_image={productImages.find((i) => i.product_id == p.id)}
                product_variations={productVariations.filter(
                  (v) => v.product_id == p.id
                )}
              />
            );
          })}
    </div>
  );
};

export default ProductItemList;
