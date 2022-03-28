import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductItemList.module.css";

import {
  Category,
  Product,
  ProductImage,
  ProductVariation,
} from "../../types/Entities";
import axios from "axios";
import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState, session } from "../../redux-store/redux-orm-store";

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

  const [productIds, setProductIds] = useState('');

  const fillProducts = (products: Product[]) => {
    let ids = '';
    products.forEach((p) => {
      session.Product.create({ ...p });
      ids = ids + p.id + ",";
    });
    ids = ids.substring(0, ids.length - 1);
    setProductIds(ids);
  };

  const fillProductImages = (images: ProductImage[]) => {
    images.forEach((i) => {
      session.ProductImage.create({ ...i });
    });
  };

 

  useEffect(() => {
    setLoading(true);
    const categoryQuery =
      categoryId == -1 ? "" : `filter={"category_id":${categoryId}}`;

    axios
      .get<Product[]>(
        `https://test2.sionic.ru/api/Products?${categoryQuery}&range=[0,7]`
      )
      .then((products) => {
        if (products.data.length) {
          setProductsList([...products.data]);
          fillProducts([...products.data]);
          setLoading(false);
        }
      });
  }, [categoryId]);

  useEffect(() => {
    const productIdQuery = `filter={"product_id":[${productIds}]}`;

    axios
      .get<ProductImage[]>(
        `https://test2.sionic.ru/api/ProductImages?${productIdQuery}`
      )
      .then((images) => {
        if (images.data.length) {
          fillProductImages([...images.data]);
          setProductImages([...images.data]);
        }
      });
  }, [productIds]);

  useEffect(() => {
    const productIdQuery = `filter={"product_id":[${productIds}]}`;
    axios
      .get<ProductVariation[]>(`https://test2.sionic.ru/api/ProductVariations?${productIdQuery}`)
      .then((variations) => {
        if (variations.data.length) {
          setProductVariations([...variations.data]);
        }
      });
  }, [productIds]);

  return (
    <div className={classes.product_list}>
      {loading && <p>Loading products...</p>}
      {productsList.length === 0 && !loading && <p>No products found</p>}
      {!loading &&
        productsList.length > 0 &&
        productImages.length > 0 &&
        productVariations.length > 0 &&
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
