import React, { Fragment, useState } from "react";
import { ProductImageType } from "../../types/Entities";

type ProductImageProps = {
  product_images: ProductImageType[];
};

const ProductImage: React.FC<ProductImageProps> = ({ product_images = [] }) => {
  const imageLocation = "https://test2.sionic.ru/";
  const [displayedImageIndex, setDisplayedImageIndex] = useState(
    product_images.length - 1
  );

  const onImageClick = () => {
    setDisplayedImageIndex((prev) => {
      if (prev === product_images.length - 1) return 0;
      else return prev + 1;
    });
  };

  return (
    <Fragment>
      {product_images.length > 0 && (
        <img
          onClick={onImageClick}
          src={imageLocation + product_images[displayedImageIndex].image_url}
          alt="product-image"
        />
      )}
    </Fragment>
  );
};

export default ProductImage;
