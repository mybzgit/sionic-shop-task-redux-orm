import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { session } from '../../redux-store/redux-orm-store';
import { ProductType } from '../../types/entity-types';
import ProductItem from './ProductItem';
import classes from './SelectProductPopup.module.css';

const SelectProductPopup: React.FC = () => {
    const params = useParams();
    const productId = params.productId;
    const [product, setProduct] = useState<ProductType>({} as ProductType);
    
    useEffect(() => {
        const productFromSession = session.Product.withId(productId);
        console.log(productFromSession);
        if (productFromSession != null)
            setProduct({ ...(productFromSession as any) });
    }, [productId]);

    const navigate = useNavigate();
    const onClosePopupClick = () => {
        navigate('/');
    };

    return (
        <div className={classes.popup}>
            <div className={classes.popup_body}>
                <div className={classes.popup_header}>
                    <button type="button" onClick={onClosePopupClick}>
                        X
                    </button>
                </div>
                <ProductItem product={product} />
            </div>
        </div>
    );
};

export default SelectProductPopup;
