import axios from "axios";
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { session } from "../../redux-store/redux-orm-store";
import { Category } from "../../types/Entities";
import classes from "./CategoryList.module.css";

type CategoryListProps = {
    onSelectedCategoryChanged: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
    onSelectedCategoryChanged
}: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fillCategories = (categories: Category[]) => {
    categories.forEach((c) => {
      session.Category.create({ ...c });
    });
  };

  useEffect(() => {
    axios
      .get<Category[]>("https://test2.sionic.ru/api/Categories")
      .then((response) => {
        if (response.data.length) {
          fillCategories([...response.data]);
          setCategories([...response.data]);
        }
      });
  }, []);

  const onCategoryChanged: ChangeEventHandler<HTMLSelectElement> = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectedCategoryChanged(+e.target.value);
  }

  return (
    <div className={classes.categories}>
      {categories.length > 0 && (
        <select onChange={onCategoryChanged}>
          <option key={-1} value="-1">All</option>
          {categories.map((c) => {
            return <option key={c.id} value={c.id}>{c.name}</option>;
          })}
        </select>
      )}
    </div>
  );
};

export default CategoryList;
