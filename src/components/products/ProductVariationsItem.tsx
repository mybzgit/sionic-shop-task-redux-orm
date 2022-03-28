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
  ProductVariation,
  ProductVariationProperty,
  ProductVariationPropertyListValue,
  ProductVariationPropertyValue,
} from "../../types/Entities";
import classes from "./ProductVariationsItem.module.css";

type ProductVariationsItemProps = {
  variations: ProductVariation[];
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

  const [currentVariation, setCurrentVariation] = useState<ProductVariation>({
    ...variations[0],
  });

  useEffect(() => {
    setCurrentVariation({...variations[0]});
  }, [])

  const [productVariationProperties, setProductVariationProperties] = useState<
    ProductVariationProperty[]
  >([]);
  const [productVariationPropertyValues, setProductVariationPropertyValues] =
    useState<ProductVariationPropertyValue[]>([]);

  const [
    productVariationPropertyListValues,
    setProductVariationPropertyListValues,
  ] = useState<ProductVariationPropertyListValue[]>([]);

  useEffect(() => {
    axios
      .get<ProductVariationPropertyValue[]>(
        `https://test2.sionic.ru/api/ProductVariationPropertyValues?filter={"product_variation_id":${currentVariation.id}}`
      )
      .then((response) => {
        if (response.data.length) {
          console.log(response.data);
          setProductVariationPropertyValues([...response.data]);
          // fillCategories([...response.data]);
          // setCategories([...response.data]);
        }
      });
  }, [currentVariation.id]);

  useEffect(() => {
    axios
      .get<ProductVariationProperty[]>(
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
      .get<ProductVariationPropertyListValue[]>(
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
