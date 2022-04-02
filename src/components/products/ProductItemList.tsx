import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./ProductItemList.module.css";

import { ProductType } from "../../types/Entities";
import axios from "axios";
import { passDataToSession } from "../../redux-store/redux-orm-store";

type ProductItemListProps = {
  categoryId: number;
  searchValue: string;
};

const ProductItemList: React.FC<ProductItemListProps> = React.memo(
  ({ categoryId, searchValue }: ProductItemListProps) => {
    const [loading, setLoading] = useState(true);
    const [productsList, setProductsList] = useState<ProductType[]>([]);

    useEffect(() => {
      setLoading(true);
      const categoryQuery =
        categoryId == -1 ? "" : `filter={"category_id":${categoryId}}`;

      axios
        .get<ProductType[]>(
          `https://test2.sionic.ru/api/Products?${categoryQuery}&range=[0,7]`
        )
        .then((products) => {
          if (products.data.length) {
            setProductsList([...products.data]);
            passDataToSession([...products.data], "ProductType");
            setLoading(false);
          }
        });
    }, [categoryId]);

    const filteredProducts = productsList.filter(
      (p) => p.name.indexOf(searchValue) !== -1
    );

    return (
      <div className={classes.product_list}>
        {loading && <p>Loading products...</p>}
        {filteredProducts.length === 0 && !loading && <p>No products found</p>}
        {!loading &&
          productsList.length > 0 &&
          filteredProducts.map((p) => {
            return <ProductItem key={p.id} product={p} />;
          })}
      </div>
    );
  }
);

export default ProductItemList;
