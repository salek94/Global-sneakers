import React, { useEffect, useState } from "react";
import CategoryService from "../../Service/Api/CategoryService";
import styles from "./category.module.scss";

const Category = () => {
  const [categoryImage, setCategoryImage] = useState();
  useEffect(() => {
    CategoryService.allCategory()
      .then((res) => {
        // console.log(res.data.data);
        setCategoryImage(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(categoryImage);
  let categoryMen = categoryImage.filter((item) => item.name === "Men");
  let categoryWomen = categoryImage.filter((item) => item.name === "Women");
  let categoryKids = categoryImage.filter((item) => item.name === "Kids");
  let categoryAll = categoryImage.filter((item) => item.name === "All");
  console.log(categoryMen);

  return (
    <div className={styles.category__container}>
      <div>
        <h2>Shop By Gender</h2>
      </div>
      <div className={styles.category__grid}>
        <div className={styles.category__men}>
          <div className={styles.category__title}>
            <h3>{categoryMen[0].name}</h3>
          </div>
          <div>
            <img src={categoryMen[0].assets[0].url} alt="" />
          </div>
        </div>
        <div className={styles.category__women}>
          <div className={styles.category__title}>
            <h3>{categoryWomen[0].name}</h3>
          </div>
          <div>
            <img src={categoryWomen[0].assets[0].url} alt="" />
          </div>
        </div>
        <div className={styles.category__kids}>
          <div className={styles.category__title}>
            <h3>{categoryKids[0].name}</h3>
          </div>
          <div>
            <img src={categoryKids[0].assets[0].url} alt="" />
          </div>
        </div>
        <div className={styles.category__all}>
          <div className={styles.category__title}>
            <h3>{categoryAll[0].name}</h3>
          </div>
          <div>
            <img src={categoryAll[0].assets[0].url} alt="" />
          </div>
        </div>
        <div className={styles.aa}>aaa</div>
      </div>
    </div>
  );
};

export default Category;
