import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductItemList.module.css";

import {
  CategoryType,
  ProductType,
  ProductImageType,
  ProductVariationType,
} from "../../types/Entities";
import axios from "axios";
import { passDataToSession, session } from "../../redux-store/redux-orm-store";

type ProductItemListProps = {
  categoryId: number;
  searchValue: string;
};

const ProductItemList: React.FC<ProductItemListProps> = ({
  categoryId,
  searchValue,
}: ProductItemListProps) => {
  const [loading, setLoading] = useState(true);

  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [productImages, setProductImages] = useState<ProductImageType[]>([]);
  const [productVariations, setProductVariations] = useState<
    ProductVariationType[]
  >([]);

  const [productIds, setProductIds] = useState("");

  const collectProductIds = (products: ProductType[]) => {
    let ids = "";
    products.forEach((p) => {
      ids = ids + p.id + ",";
    });
    ids = ids.substring(0, ids.length - 1);
    setProductIds(ids);
  };

  useEffect(() => {
    setLoading(true);
    const categoryQuery =
      categoryId == -1 ? "" : `filter={"category_id":${categoryId}}`;

    axios
      .get<ProductType[]>(
        `https://test2.sionic.ru/api/Products?${categoryQuery}&range=[0,3]`
      )
      .then((products) => {
        if (products.data.length) {
          setProductsList([...products.data]);
          passDataToSession([...products.data], "ProductType");
          collectProductIds([...products.data]);
          setLoading(false);
          //    console.log((session.Category.withId(categoryId) as any).products?.count());
          //   console.log((session.Category.withId(categoryId) as any).products.all().toRefArray());
        }
      });
  }, [categoryId]);

  useEffect(() => {
    const productIdQuery = `filter={"product_id":[${productIds}]}`;

    const productImagesRequest = axios.get(
      `https://test2.sionic.ru/api/ProductImages?${productIdQuery}`
    );
    const productVariationsRequest = axios.get(
      `https://test2.sionic.ru/api/ProductVariations?${productIdQuery}`
    );

    axios.all([productImagesRequest, productVariationsRequest]).then(
      axios.spread((...responses) => {
        const images = responses[0].data as ProductImageType[];
        const variations = responses[1].data as ProductVariationType[];
        if (images.length) {
          passDataToSession([...images], "ProductImageType");
          setProductImages([...images]);
        }
        if (variations.length) {
          passDataToSession([...variations], "ProductVariationType");
          setProductVariations([...variations]);
        }
      })
    );
  }, [categoryId, productIds]);

  const filteredProducts = productsList.filter((p) => p.name.indexOf(searchValue) !== -1);

  return (
    <div className={classes.product_list}>
      {loading && <p>Loading products...</p>}
      {filteredProducts.length === 0 && !loading && <p>No products found</p>}
      {!loading &&
        productsList.length > 0 &&
        productImages.length > 0 &&
        productVariations.length > 0 &&
        filteredProducts
          .map((p) => {
            return (
              <ProductItem
                key={p.id}
                product={p}
                product_images={productImages.filter(
                  (i) => i.product_id == p.id
                )}
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
