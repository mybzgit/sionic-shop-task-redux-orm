import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Action, ActionType } from '../../types/shop-store-types';
import classes from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const dispatch = useDispatch();
  const onSearch = useCallback(() => {
    const action: Action = {
      type: ActionType.SET_SEARCH_VALUE,
      searchValuePayload: searchValue,
    };
    dispatch(action);
  }, [searchValue]);

  const onValueChanged: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === '') {
      const action: Action = {
        type: ActionType.SET_SEARCH_VALUE,
        searchValuePayload: e.target.value,
      };
      dispatch(action);
    }
    setSearchValue(e.target.value);
  };
  return (
    <div className={classes.search}>
      <input
        onChange={onValueChanged}
        placeholder="Поиск бренда, товара, категории..."></input>
      <button type="button" onClick={onSearch}>
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
