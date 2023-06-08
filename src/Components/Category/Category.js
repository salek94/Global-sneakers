import React, { useEffect, useState } from "react";
import CategoryService from "../../Service/Api/CategoryService";
import styles from "./category.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { whichCategory } from "../../Service/Store/categorySlice";

const Category = () => {
  const [categoryImage, setCategoryImage] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    CategoryService.allCategory()
      .then((res) => {
        setCategoryImage(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handlePickCategory = (e) => {
    dispatch(whichCategory(e.target.dataset.id));
  };

  let categoryMen = categoryImage?.filter((item) => item.name === "Men");
  let categoryWomen = categoryImage?.filter((item) => item.name === "Women");
  let categoryKids = categoryImage?.filter((item) => item.name === "Kids");
  let categoryAll = categoryImage?.filter((item) => item.name === "All");

  return (
    <div className={styles.category__container}>
      <div className={styles.category__title}>
        <h2>Shop By Gender</h2>
      </div>
      <div className={styles.category__grid}>
        <div className={styles.category__men} onClick={handlePickCategory}>
          <div className={styles.category__name}>
            <h3>{categoryMen[0]?.name}</h3>
          </div>
          <div className={styles.category__picture}>
            <Link to="/collection/men">
              <img src={categoryMen[0]?.assets[0].url} alt="" data-id="Men" />
            </Link>
          </div>
        </div>
        <div className={styles.category__women} onClick={handlePickCategory}>
          <div className={styles.category__name}>
            <h3>{categoryWomen[0]?.name}</h3>
          </div>
          <div className={styles.category__picture}>
            <Link to="/collection/women">
              <img
                src={categoryWomen[0]?.assets[0].url}
                alt=""
                data-id="Women"
              />
            </Link>
          </div>
        </div>
        <div className={styles.category__kids} onClick={handlePickCategory}>
          <div className={styles.category__name}>
            <h3>{categoryKids[0]?.name}</h3>
          </div>
          <div className={styles.category__picture}>
            <Link to="/collection/kids">
              <img src={categoryKids[0]?.assets[0].url} alt="" data-id="Kids" />
            </Link>
          </div>
        </div>
        <div className={styles.category__all} onClick={handlePickCategory}>
          <div className={styles.category__name}>
            <h3>
              {categoryAll[0]?.name} <br />
              Collection
            </h3>
          </div>
          <div className={styles.category__picture}>
            <Link to="/collection/all">
              <img src={categoryAll[0]?.assets[0].url} alt="" data-id="All" />
            </Link>
          </div>
        </div>
        <div className={styles.aa}>aaa</div>
      </div>
    </div>
  );
};

export default Category;
