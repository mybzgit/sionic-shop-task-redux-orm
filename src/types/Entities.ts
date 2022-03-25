export type Category = {
  id: number;
  name: string;
};
export type Product = {
  id: number;
  name: string;
  category_id: number;
  description: string;
};

export type ProductImage = {
  id: number;
  image_name: string;
  product_id: number;
  image_url: string;
};
export type ProductVariation = {
  id: number;
  product_id: number;
  price: number;
  stock: number;
};
export type ProductVariationProperty = {
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
export type ProductVariationPropertyListValue = {
  id: number;
  product_variation_property_id: number;
  title: string;
  value: string;
};
export type ProductVariationPropertyValue = {
  id: number;
  product_variation_id: number;
  product_variation_property_id: number;
  value_string: string;
  value_int: number;
  value_float: string;
  product_variation_property_list_value_id: number;
};
