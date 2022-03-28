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

  // if (product_variations.length > 0) {
  //   let ids = "";
  //   product_variations.forEach((pv) => {
  //     session.Product.create({ ...pv });
  //     ids = ids + p.id + ",";
  //   });
  //   ids = ids.substring(0, ids.length - 1);
  //   setProductIds(ids);
  // }

  const [currentVariation, setCurrentVariation] = useState<ProductVariation>({
    ...variations[0],
  });
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
    let value = "";
    if (type === 0) {
      value = pvpv!.value_string;
    }
    if (type === 1) {
      value = pvpv!.value_int.toString();
    }
    if (type === 2) {
      value = pvpv!.value_float.toString();
    }
    if(type === 3) {
      const listValue = productVariationPropertyListValues.find(lv => 
        lv.product_variation_property_id === pvpv?.product_variation_property_id && lv.id === pvpv?.product_variation_property_list_value_id);
      value = listValue!.title;
    }
    return value;
   
  };

  return (
    <div>
      {variations.length > 0 && (
        <Fragment>
          <label>Цена:</label>
          <select onChange={onVariationIdChanged}>
            {variations.map((v) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.price}
                </option>
              );
            })}
          </select>
        </Fragment>
      )}

      <div>
        В наличии: {currentVariation.stock}
      </div>

      {productVariationProperties.length > 0 &&
        productVariationPropertyValues.length > 0 && productVariationPropertyListValues.length > 0 &&
        productVariationProperties.map((pvp) => {
          return (
            <div key={pvp.id}>
              <b>{pvp.name}:</b> {getPropertyValueByType(pvp.id, pvp.type)}
            </div>
          );
        })}
    </div>
  );
};

export default ProductVariationsItem;
