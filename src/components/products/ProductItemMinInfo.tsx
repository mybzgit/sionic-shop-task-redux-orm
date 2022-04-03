import axios from 'axios';
import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { passDataToSession, session } from '../../redux-store/redux-orm-store';
import { ProductType, ProductVariationType } from '../../types/entity-types';
import ProductImage from './ProductImage';
import classes from './ProductItemMinInfo.module.css';

type ProductItemMinInfoProps = {
    product: ProductType;
    onShowVariations: (product: ProductType) => void;
};

const ProductItemMinInfo: React.FC<ProductItemMinInfoProps> = ({
    product,
    onShowVariations,
}) => {
    const [currentVariation, setCurrentVariation] =
        useState<ProductVariationType>({} as ProductVariationType);

    const onAddToCartHandler = useCallback(() => {
        onShowVariations(product);
    }, [product.id]);

    useEffect(() => {
        const productVariations = session.ProductVariation.filter(
            (i) => i.product_id == product.id
        );
        if (productVariations.count() === 0) {
            axios
                .get<ProductVariationType[]>(
                    `https://test2.sionic.ru/api/ProductVariations?filter={"product_id":${product.id}}`
                )
                .then((response) => {
                    if (response.data.length) {
                        response.data.sort((v1, v2) =>
                            v1.price > v2.price ? 1 : -1
                        );
                        setCurrentVariation({ ...response.data[0] });
                        passDataToSession(
                            [...response.data],
                            'ProductVariationType'
                        );
                    }
                });
        } else {
            const productVariationFromSession = productVariations
                .all()
                .toRefArray() as ProductVariationType[];

            productVariationFromSession.sort((v1, v2) =>
                v1.price > v2.price ? 1 : -1
            );
            setCurrentVariation({ ...productVariationFromSession[0] });
        }
    }, [product.id]);

    return (
        <div className={classes.card}>
            <ProductImage productId={product.id} />

            <span className={classes.product_title}>{product.name}</span>
            <div className={classes.variations_container}>
                <label>цена от {currentVariation.price} &#8381;</label>
                <span className={classes.stock}>
                    В наличии: {currentVariation.stock}
                </span>
            </div>

            {currentVariation.id && (
                <button type="button" onClick={onAddToCartHandler}>
                    Выбрать вариацию
                </button>
            )}
        </div>
    );
};

export default React.memo(ProductItemMinInfo);
