import axios from "axios";
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
  variations: ProductVariationType[];
  onCurrentVariationChanged: (variationId: number) => void;
};

const ProductVariationsItem: React.FC<ProductVariationsItemProps> = ({
  variations,
  onCurrentVariationChanged,
}) => {
  if (variations.length > 0) {
    variations.sort((v1, v2) => (v1.price > v2.price ? 1 : -1));
  }

  const [currentVariation, setCurrentVariation] =
    useState<ProductVariationType>(
      variations.length > 0
        ? { ...variations[0] }
        : ({} as ProductVariationType)
    );

  useEffect(() => {
    setCurrentVariation({ ...variations[0] });
    onCurrentVariationChanged(variations[0].id);
  }, [variations]);



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
    const sessionDataProductVariationProperty = session.ProductVariationProperty.all().toRefArray() as ProductVariationPropertyType[];
    setProductVariationProperties(sessionDataProductVariationProperty);
    const sessionDataProductVariationPropertyListValues = session.ProductVariationPropertyListValue.all().toRefArray() as ProductVariationPropertyListValueType[];
    setProductVariationPropertyListValues(sessionDataProductVariationPropertyListValues);
  }, [])

  useEffect(() => {
    axios
      .get<ProductVariationPropertyValueType[]>(
        `https://test2.sionic.ru/api/ProductVariationPropertyValues?
        filter={"product_variation_id":${currentVariation.id}}`
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
  }, [currentVariation.id]);



  const onVariationIdChanged: ChangeEventHandler<HTMLSelectElement> = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedVariation = variations.find((v) => v.id === +e.target.value);
    setCurrentVariation({ ...selectedVariation! });

    onCurrentVariationChanged(selectedVariation!.id);
  };

  return (
    <div className={classes.variations_container}>
      {variations.length > 0 && currentVariation.id && (
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
            В наличии: {currentVariation.stock}
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
              <b>{pvp.name}:</b> {getPropertyValueByType(pvp.id, pvp.type, productVariationPropertyValues, productVariationPropertyListValues)}
            </span>
          );
        })}
    </div>
  );
};

export default ProductVariationsItem;
