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
enum PropertyType {
  value_string,
  value_int,
  value_float,
  product_variation_property_list_value_id,
}
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
