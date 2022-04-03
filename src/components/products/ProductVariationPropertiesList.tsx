import React, { Fragment, useEffect, useState } from 'react';
import { session } from '../../redux-store/redux-orm-store';
import {
  getPropertyValueByType,
  ProductVariationPropertyListValueType,
  ProductVariationPropertyType,
  ProductVariationPropertyValueType,
} from '../../types/entity-types';
import classes from './ProductVariationPropertiesList.module.css';

type ProductVariationPropertiesListProps = {
  productVariationPropertyValues: ProductVariationPropertyValueType[];
};

const ProductVariationPropertiesList: React.FC<ProductVariationPropertiesListProps> =
  React.memo(({ productVariationPropertyValues }) => {
    const [productVariationProperties, setProductVariationProperties] =
      useState<ProductVariationPropertyType[]>([]);
    const [
      productVariationPropertyListValues,
      setProductVariationPropertyListValues,
    ] = useState<ProductVariationPropertyListValueType[]>([]);

    useEffect(() => {
      const sessionDataProductVariationProperty =
        session.ProductVariationProperty.all().toRefArray() as ProductVariationPropertyType[];
      setProductVariationProperties(sessionDataProductVariationProperty);
      const sessionDataProductVariationPropertyListValues =
        session.ProductVariationPropertyListValue.all().toRefArray() as ProductVariationPropertyListValueType[];
      setProductVariationPropertyListValues(
        sessionDataProductVariationPropertyListValues
      );
    }, []);

    return (
      <Fragment>
        {productVariationProperties.length > 0 &&
          productVariationPropertyValues.length > 0 &&
          productVariationPropertyListValues.length > 0 &&
          productVariationProperties.map((pvp) => {
            return (
              <span className={classes.product_variation} key={pvp.id}>
                <b>{pvp.name}:</b>{' '}
                {getPropertyValueByType(
                  pvp.id,
                  pvp.type,
                  productVariationPropertyValues,
                  productVariationPropertyListValues
                )}
              </span>
            );
          })}
      </Fragment>
    );
  });
export default ProductVariationPropertiesList;
