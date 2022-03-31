import axios from "axios";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { session } from "../../redux-store/redux-orm-store";
import { CategoryType } from "../../types/Entities";
import { Action, ActionType } from "../../types/redux-types";
import classes from "./CategoryList.module.css";

const CategoryList: React.FC = () => {

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fillCategories = (categories: CategoryType[]) => {
    categories.forEach((c) => {
      session.Category.create({ ...c });
    });
  };

  useEffect(() => {
    if (session.Category.count() === 0) {
      axios
        .get<CategoryType[]>("https://test2.sionic.ru/api/Categories")
        .then((response) => {
          if (response.data.length) {
            fillCategories([...response.data]);
            setCategories([...response.data]);
          }
        });
    }
    else {
      const categoriesFromSession = session.Category.all().toRefArray().map(c => {
        return c as CategoryType;
      })
      setCategories([...categoriesFromSession]);
    }
  }, []);

  const dispatch = useDispatch();

  const onCategoryChanged: ChangeEventHandler<HTMLSelectElement> = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const action:Action = {
      type: ActionType.SET_SELECTED_CATEGORY,
      selectedCategoryPayload: +e.target.value
    }
    dispatch(action);
  };

  return (
    <div className={classes.categories}>
      {categories.length > 0 && (
        <select onChange={onCategoryChanged}>
          <option key={-1} value="-1">
            All
          </option>
          {categories.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default CategoryList;
