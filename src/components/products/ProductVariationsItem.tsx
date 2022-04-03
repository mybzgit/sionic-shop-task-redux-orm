import axios from 'axios';
import React, { useCallback } from 'react';
import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from 'react';
import { passDataToSession, session } from '../../redux-store/redux-orm-store';
import {
  ProductVariationType,
  ProductVariationPropertyValueType,
} from '../../types/entity-types';
import ProductVariationPropertiesList from './ProductVariationPropertiesList';
import classes from './ProductVariationsItem.module.css';

type ProductVariationsItemProps = {
  productId: number;
  onCurrentVariationChanged: (variationId: number) => void;
};

const ProductVariationsItem: React.FC<ProductVariationsItemProps> = ({
  productId,
  onCurrentVariationChanged,
}) => {
  const [variations, setVariations] = useState<ProductVariationType[]>([]);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [productVariationPropertyValues, setProductVariationPropertyValues] =
    useState<ProductVariationPropertyValueType[]>([]);

  useEffect(() => {
    const productVariations = session.ProductVariation.filter(
      (i) => i.product_id === productId
    );
    const productVariationFromSession = productVariations
      .all()
      .toRefArray() as ProductVariationType[];
    productVariationFromSession.sort((v1, v2) =>
      v1.price > v2.price ? 1 : -1
    );
    setVariations([...productVariationFromSession]);
  }, [productId]);

  useEffect(() => {
    if (variations.length !== 0)
      onCurrentVariationChanged(variations[currentVariationIndex].id);
  }, [currentVariationIndex, variations, onCurrentVariationChanged]);

  useEffect(() => {
    if (variations.length !== 0) {
      const productVariationFromSession = session.ProductVariation.withId(
        variations[currentVariationIndex].id
      );
      let productVariationPropertyValues: ProductVariationPropertyValueType[] =
        [];
      if (productVariationFromSession !== null) {
        productVariationPropertyValues = (
          productVariationFromSession as any
        ).productVariationPropertyValues
          .all()
          .toRefArray() as ProductVariationPropertyValueType[];
      }

      if (productVariationPropertyValues.length === 0) {
        axios
          .get<ProductVariationPropertyValueType[]>(
            `https://test2.sionic.ru/api/ProductVariationPropertyValues?
        filter={"product_variation_id":${variations[currentVariationIndex].id}}`
          )
          .then((response) => {
            if (response.data.length) {
              passDataToSession(
                [...response.data],
                'ProductVariationPropertyValueType'
              );
              setProductVariationPropertyValues([...response.data]);
            }
          });
      } else {
        setProductVariationPropertyValues([...productVariationPropertyValues]);
      }
    }
  }, [currentVariationIndex, productId, variations]);

  const onVariationIdChanged: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedVariationIndex = variations.findIndex(
          (v) => v.id === +e.target.value
        );
        setCurrentVariationIndex(selectedVariationIndex);
        onCurrentVariationChanged(variations[selectedVariationIndex].id);
      },
      [variations, onCurrentVariationChanged]
    );

  return (
    <div className={classes.variations_container}>
      {variations.length == 0 && (
        <span className={classes.loading_message}>
          Loading product variations...
        </span>
      )}
      {variations.length > 0 && (
        <Fragment>
          <label>цена от</label>
          <select onChange={onVariationIdChanged}>
            {variations.map((v) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.price}
                </option>
              );
            })}
          </select>
          <span className={classes.stock}>
            В наличии: {variations[currentVariationIndex].stock}
          </span>
        </Fragment>
      )}

      {productVariationPropertyValues.length > 0 && (
        <div className={classes.variations_properties}>
          <ProductVariationPropertiesList
            productVariationPropertyValues={productVariationPropertyValues}
          />
        </div>
      )}
    </div>
  );
};

export default ProductVariationsItem;
