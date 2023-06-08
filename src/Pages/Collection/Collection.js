import React, { useEffect, useState } from "react";
import ProductService from "../../Service/Api/ProductService";
import Slider from "react-slick";
import { settingsCollection } from "../../Components/Features/settings";
import styles from "./collection.module.scss";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../Service/Store/productSlice";
import Banners from "../../Components/Banners/Banners";

const Collection = () => {
  const { products } = useSelector((state) => state.productStore);
  const [nameCategory, setNameCategory] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    ProductService.allProduct()
      .then((res) => {
        if (res.status === 200) dispatch(getAllProduct(res.data.data));
      })
      .catch((err) => console.error(err));
  }, [nameCategory]);
  console.log(products);

  // const handleSearchValue = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // const getSearchResults = () => {
  //   if (searchValue) {
  //     navigate(`/list?search=${searchValue}`);
  //     setChosenGenre("");
  //     inputSearch.current.value = "";
  //   }
  // };

  // const handleEnter = (e) => {
  //   if (e.key === "Enter") {
  //     navigate(`/list/?search=${searchValue}`);
  //     setChosenGenre("");
  //     inputSearch.current.value = "";
  //   }
  // };
  let bestSelling = products.filter(
    (item) => item.categories[1].name === "Best Selling"
  );
  let newArrivals = products.filter(
    (item) => item.categories[1].name === "New Arrivals"
  );
  let menCategory = products.filter(
    (item) => item.categories[0].name === "Men"
  );
  let womenCategory = products.filter(
    (item) => item.categories[0].name === "Women"
  );
  let kidsCategory = products.filter(
    (item) => item.categories[0].name === "Kids"
  );
  let allCategory = products.filter(
    (item) => item.categories[2].name === "All"
  );
  console.log(menCategory);
  console.log(womenCategory);
  const pickedSize = (e) => {
    console.log(e.target.innerText);
  };
  const handlePickCategory = (e) => {
    setNameCategory(e.target.innerText);
  };
  return (
    <>
      <Navbar />
      <div className={styles.collection__container}>
        <div className={styles.collection__hero}></div>
        <main className={styles.collection__main}>
          <aside className={styles.collection__asideBar}>
            <div>
              <input
                className={styles.collection__search}
                type="search"
                name="search"
                placeholder="Search product..."
                // onChange={handleSearchValue}
                // onKeyDown={handleEnter}
              />
            </div>
            <div className={styles.collection__categories}>
              <h4>Categories</h4>
              <div className={styles.collection__pickCategory}>
                <span
                  className={styles.collection__categoryItem}
                  // className={
                  //   nameCategory === "Men"
                  // ? `${styles.collection__categoryItem} ${styles.collection__categoryItem_focus}`
                  //     : styles.collection__categoryItem
                  // }
                  onClick={handlePickCategory}
                >
                  Men
                </span>
                <span
                  className={styles.collection__categoryItem}
                  onClick={handlePickCategory}
                >
                  Women
                </span>
                <span
                  className={styles.collection__categoryItem}
                  onClick={handlePickCategory}
                >
                  Kids
                </span>
                <span
                  className={styles.collection__categoryItem}
                  onClick={handlePickCategory}
                >
                  All
                </span>
              </div>
            </div>
            <div className={styles.collection__size} onClick={pickedSize}>
              <p>Size:</p>
              <button
                className={`${styles.collection__sizeBtn} ${styles.btnPrimary__white}`}
              >
                S
              </button>
              <button
                className={`${styles.collection__sizeBtn} ${styles.btnPrimary__white}`}
              >
                M
              </button>
              <button
                className={`${styles.collection__sizeBtn} ${styles.btnPrimary__white}`}
              >
                L
              </button>
              <button
                className={`${styles.collection__sizeBtn} ${styles.btnPrimary__white}`}
              >
                XL
              </button>
            </div>
          </aside>
          <div className={styles.collection__products}>
            <div className={styles.collection__headerProducts}>
              <h4 className={styles.collection__headerTitle}>{nameCategory}</h4>
              <div>
                <label>Sort by: </label>
                <select className={styles.collection__list}>
                  <option value="best">Best Selling</option>
                  <option value="arrivals">New Arrivals</option>
                  <option value="high">Sort By Price: High To Low</option>
                  <option value="low">Sort By Price: Low To High</option>
                </select>
              </div>
            </div>
            <Slider {...settingsCollection}>
              {nameCategory === "Men" &&
                menCategory.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {nameCategory === "Women" &&
                womenCategory.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {nameCategory === "Kids" &&
                kidsCategory.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {nameCategory === "All" &&
                allCategory.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
            </Slider>
          </div>
        </main>
      </div>
    </>
  );
};

export default Collection;
