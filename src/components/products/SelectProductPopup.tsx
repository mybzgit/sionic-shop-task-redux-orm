import React from 'react';
import { ProductType } from '../../types/entity-types';
import ProductItem from './ProductItem';
import classes from './SelectProductPopup.module.css';

type SelectProductPopupProps = {
  product: ProductType;
  onCloseHandler: () => void;
};

const SelectProductPopup: React.FC<SelectProductPopupProps> = ({
  product,
  onCloseHandler,
}) => {
  const onClosePopupClick = () => {
    onCloseHandler();
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

export default React.memo(SelectProductPopup);
