export type CategoryType = {
  id: number;
  name: string;
};
export type ProductType = {
  id: number;
  name: string;
  category_id: number;
  description: string;
};

export type ProductImageType = {
  id: number;
  image_name: string;
  product_id: number;
  image_url: string;
};
export type ProductVariationType = {
  id: number;
  product_id: number;
  price: number;
  stock: number;
};
export type ProductVariationPropertyType = {
  id: number;
  name: string;
  type: number;
};
export type ProductVariationPropertyListValueType = {
  id: number;
  product_variation_property_id: number;
  title: string;
  value: string;
};
export type ProductVariationPropertyValueType = {
  id: number;
  product_variation_id: number;
  product_variation_property_id: number;
  value_string: string;
  value_int: number;
  value_float: string;
  product_variation_property_list_value_id: number;
};

export const getPropertyValueByType = (
  id: number,
  type: number,
  productVariationPropertyValues: ProductVariationPropertyValueType[],
  productVariationPropertyListValues: ProductVariationPropertyListValueType[]
) => {
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
          pvpv!.product_variation_property_id &&
        lv.id === pvpv!.product_variation_property_list_value_id
    );
    value = listValue!.title;
  }
  return value;
};
