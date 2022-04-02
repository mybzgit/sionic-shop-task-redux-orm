import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { passDataToSession, session } from "../../redux-store/redux-orm-store";
import { ProductImageType } from "../../types/Entities";

type ProductImageProps = {
  productId: number;
};

const ProductImage: React.FC<ProductImageProps> = React.memo(
  ({ productId }) => {
    const imageLocation = "https://test2.sionic.ru/";

    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
    const [productImages, setProductImages] = useState<ProductImageType[]>([]);

    useEffect(() => {
      const images = session.ProductImage.filter(
        (i) => i.product_id == productId
      );
      if (images.count() === 0) {
        axios
          .get<ProductImageType[]>(
            `https://test2.sionic.ru/api/ProductImages?filter={"product_id":${productId}}`
          )
          .then((response) => {
            if (response.data.length) {
              setProductImages([...response.data]);
              passDataToSession([...response.data], "ProductImageType");
            }
          });
      } else {
        const imagesFromSession = images
          .all()
          .toRefArray()
          .map((i) => {
            return i as ProductImageType;
          });
        setProductImages([...imagesFromSession]);
      }
    }, []);

    const onImageClick = () => {
      setDisplayedImageIndex((prev) => {
        if (prev === productImages.length - 1) return 0;
        else return prev + 1;
      });
    };

    return (
      <Fragment>
        {productImages.length > 0 && (
          <img
            onClick={onImageClick}
            src={imageLocation + productImages[displayedImageIndex].image_url}
            alt="product-image"
          />
        )}
      </Fragment>
    );
  }
);

export default ProductImage;
