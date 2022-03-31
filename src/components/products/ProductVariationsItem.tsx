import axios from "axios";
import {
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import { session } from "../../redux-store/redux-orm-store";
import {
  ProductVariationType,
  ProductVariationPropertyType,
  ProductVariationPropertyListValueType,
  ProductVariationPropertyValueType,
} from "../../types/Entities";
import classes from "./ProductVariationsItem.module.css";

type ProductVariationsItemProps = {
  variations: ProductVariationType[];
};

const ProductVariationsItem: React.FC<ProductVariationsItemProps> = ({
  variations,
}) => {
  variations.forEach((pv) => {
    session.ProductVariation.create({ ...pv });
  });

  if (variations.length > 0) {
    variations.sort((v1, v2) => (v1.price > v2.price ? 1 : -1));
  }

  const [currentVariation, setCurrentVariation] = useState<ProductVariationType>({
    ...variations[0],
  });

  useEffect(() => {
    setCurrentVariation({...variations[0]});
  }, [variations])

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
    axios
      .get<ProductVariationPropertyValueType[]>(
        `https://test2.sionic.ru/api/ProductVariationPropertyValues?
        filter={"product_variation_id":${currentVariation.id}}`
      )
      .then((response) => {
        if (response.data.length) {
          setProductVariationPropertyValues([...response.data]);
        }
      });
  }, [currentVariation.id]);

  useEffect(() => {
    axios
      .get<ProductVariationPropertyType[]>(
        `https://test2.sionic.ru/api/ProductVariationProperties`
      )
      .then((response) => {
        if (response.data.length) {
          setProductVariationProperties([...response.data]);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get<ProductVariationPropertyListValueType[]>(
        `https://test2.sionic.ru/api/ProductVariationPropertyListValues`
      )
      .then((response) => {
        if (response.data.length) {
          setProductVariationPropertyListValues([...response.data]);
        }
      });
  }, []);

  const onVariationIdChanged: ChangeEventHandler<HTMLSelectElement> = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedVariation = variations.find((v) => v.id === +e.target.value);
    setCurrentVariation({ ...selectedVariation! });
  };

  const getPropertyValueByType = (id: number, type: number) => {
    const pvpv = productVariationPropertyValues.find(
      (pvpv) => pvpv.product_variation_property_id === id
    );
    let value = '';
    if (type === 0) {
      value = pvpv!.value_string;
    }
    if (type === 1) {
      value = pvpv!.value_int.toString();
    }
    if (type === 2) {
      value = pvpv!.value_float.toString();
    }
    if (type === 3) {
      const listValue = productVariationPropertyListValues.find(
        (lv) =>
          lv.product_variation_property_id ===
            pvpv?.product_variation_property_id &&
          lv.id === pvpv?.product_variation_property_list_value_id
      );
      value = listValue!.title;
    }
    return value;
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
          <span className={classes.stock}>В наличии: {currentVariation.stock}</span>
        </Fragment>
      )}
<br/>
      {productVariationProperties.length > 0 &&
        productVariationPropertyValues.length > 0 &&
        productVariationPropertyListValues.length > 0 &&
        productVariationProperties.map((pvp) => {
          return (
            <span className={classes.variations} key={pvp.id}>
              <b>{pvp.name}:</b> {getPropertyValueByType(pvp.id, pvp.type)}
            </span>
          );
        })}
    </div>
  );
};

export default ProductVariationsItem;
