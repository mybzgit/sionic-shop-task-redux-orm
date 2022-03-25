import { Model, fk, attr } from "redux-orm";

export class Category extends Model {
  static modelName = "Category";
  static fields = {
    id: attr(),
    name: attr(),
  };
}

export class Product extends Model {
  static modelName = "Product";
  static fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    category_id: fk("Category", "products"),
  };
}

export class ProductImage extends Model {
  static modelName = "ProductImage";
  static fields = {
    id: attr(),
    image_name: attr(),
    image_url: attr(),
    product_id: fk("Product", "images"),
  };
}

export class ProductVariation extends Model {
  static modelName = "ProductVariation";
  static fields = {
    id: attr(),
    price: attr(),
    stock: attr(),
    product_id: fk("Product", "productVariations"),
  };
}

export class ProductVariationProperty extends Model {
  static modelName = "ProductVariationProperty";
  static fields = {
    id: attr(),
    name: attr(),
    type: attr()
  };
}

export class ProductVariationPropertyValue extends Model {
  static modelName = "ProductVariationPropertyValue";
  static fields = {
    id: attr(),
    value_string: attr(),
    value_int: attr(),
    value_float: attr(),

    product_variation_id: fk(
      "ProductVariation",
      "productVariationPropertyValues"
    ),
    product_variation_property_id: fk(
      "ProductVariationProperty",
      "productVariationPropertyValues"
    ),
    product_variation_property_list_value_id: fk(
      "ProductVariationPropertyListValue",
      "productVariationPropertyValues"
    ),
  };
}

export class ProductVariationPropertyListValue extends Model {
  static modelName = "ProductVariationPropertyListValue";
  static fields = {
    id: attr(),
    title: attr(),
    value: attr(),
    product_variation_property_id: fk(
      "ProductVariationProperty",
      "productVariationPropertyListValues"
    ),
  };
}
