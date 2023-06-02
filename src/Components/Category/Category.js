import React, { useEffect } from "react";
import CategoryService from "../../Service/Api/CategoryService";

const Category = () => {
  useEffect(() => {
    CategoryService.allCategory()
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return <div>Category</div>;
};

export default Category;
