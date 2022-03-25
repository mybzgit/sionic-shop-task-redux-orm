import axios from "axios";
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Category } from "../../types/Entities";
import classes from "./CategoryList.module.css";

type CategoryListProps = {
    onSelectedCategoryChanged: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
    onSelectedCategoryChanged
}: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<Category[]>("https://test2.sionic.ru/api/Categories")
      .then((response) => {
        if (response.data.length) {
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
