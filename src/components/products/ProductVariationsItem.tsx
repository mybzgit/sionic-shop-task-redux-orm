import axios from "axios";
import React, { useCallback } from "react";
import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import { passDataToSession, session } from "../../redux-store/redux-orm-store";
import {
  ProductVariationType,
  ProductVariationPropertyType,
  ProductVariationPropertyListValueType,
  ProductVariationPropertyValueType,
} from "../../types/Entities";
import { getPropertyValueByType } from "../../types/Entities";
import classes from "./ProductVariationsItem.module.css";

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

  useEffect(() => {
    const productVariations = session.ProductVariation.filter(
      (i) => i.product_id == productId
    );
    if (productVariations.count() === 0) {
      axios
        .get<ProductVariationType[]>(
          `https://test2.sionic.ru/api/ProductVariations?filter={"product_id":${productId}}`
        )
        .then((response) => {
          if (response.data.length) {
            response.data.sort((v1, v2) => (v1.price > v2.price ? 1 : -1));
            setVariations([...response.data]);
            passDataToSession([...response.data], "ProductVariationType");
          }
        });
    } else {
      const productVariationFromSession = productVariations
        .all()
        .toRefArray()
        .map((i) => {
          return i as ProductVariationType;
        });
      productVariationFromSession.sort((v1, v2) =>
        v1.price > v2.price ? 1 : -1
      );
      setVariations([...productVariationFromSession]);
    }
  }, [productId]);

  useEffect(() => {
    if (variations.length !== 0)
      onCurrentVariationChanged(variations[currentVariationIndex].id);
  }, [currentVariationIndex, variations]);

  const [productVariationProperties, setProductVariationProperties] = useState<
    ProductVariationPropertyType[]
  >([]);
  const [productVariationPropertyValues, setProductVariationPropertyValues] =
    useState<ProductVariationPropertyValueType[]>([]);
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
                "ProductVariationPropertyValueType"
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
      <br />
      {productVariationProperties.length > 0 &&
        productVariationPropertyValues.length > 0 &&
        productVariationPropertyListValues.length > 0 &&
        productVariationProperties.map((pvp) => {
          return (
            <span className={classes.variations} key={pvp.id}>
              <b>{pvp.name}:</b>{" "}
              {getPropertyValueByType(
                pvp.id,
                pvp.type,
                productVariationPropertyValues,
                productVariationPropertyListValues
              )}
            </span>
          );
        })}
    </div>
  );
};

export default ProductVariationsItem;
