import React, { useEffect, useLayoutEffect, useState } from "react";
import ProductService from "../../Service/Api/ProductService";
import Slider from "react-slick";
import {
  settingsCollection,
  settingsCollectionAll,
} from "../../Components/Features/settings";
import styles from "./collection.module.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  arrivalsProductsArray,
  bestProductsArray,
  getAllProduct,
  kidsProductsArray,
  menProductsArray,
  womenProductsArray,
} from "../../Service/Store/productSlice";
import { whichCategory } from "../../Service/Store/categorySlice";
import Banners from "../../Components/Banners/Banners";

const Collection = () => {
  const {
    products,
    menProducts,
    womenProducts,
    kidsProducts,
    bestProducts,
    arrivalsProducts,
  } = useSelector((state) => state.productStore);
  const { categoryName } = useSelector((state) => state.categoryStore);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    ProductService.allProduct()
      .then((res) => {
        if (res.status === 200) dispatch(getAllProduct(res.data.data));
      })
      .catch((err) => console.error(err));
  }, [categoryName]);

  useLayoutEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  useEffect(() => {
    let bestSelling = products.filter(
      (item) => item.categories[1].name === "Best Selling"
    );
    dispatch(bestProductsArray(bestSelling));

    let newArrivals = products.filter(
      (item) => item.categories[1].name === "New Arrivals"
    );
    dispatch(arrivalsProductsArray(newArrivals));

    let menCategory = products.filter(
      (item) => item.categories[0].name === "Men"
    );
    dispatch(menProductsArray(menCategory));

    let womenCategory = products.filter(
      (item) => item.categories[0].name === "Women"
    );
    dispatch(womenProductsArray(womenCategory));

    let kidsCategory = products.filter(
      (item) => item.categories[0].name === "Kids"
    );
    dispatch(kidsProductsArray(kidsCategory));
  }, [categoryName]);

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

  const pickedSize = (e) => {
    console.log(e.target.innerText);
  };
  const handlePickCategory = (e) => {
    dispatch(whichCategory(e.target.innerText));
  };
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
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
                  onClick={handlePickCategory}
                >
                  Best Selling
                </span>
                <span
                  className={styles.collection__categoryItem}
                  onClick={handlePickCategory}
                >
                  New Arrivals
                </span>
                <span
                  className={styles.collection__categoryItem}
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
              <h4 className={styles.collection__headerTitle}>{categoryName}</h4>
              <div>
                <label>Sort by: </label>
                <select
                  className={styles.collection__list}
                  onClick={handleSelect}
                >
                  <option value="">Default Sorting</option>
                  <option value="Desc">Sort By Price: High To Low</option>
                  <option value="Asc">Sort By Price: Low To High</option>
                  <option value="A-Z">Alphabetically: A-Z</option>
                  <option value="Z-A">Alphabetically: Z-A</option>
                </select>
              </div>
            </div>
            <Slider
              {...(categoryName === "All"
                ? settingsCollectionAll
                : settingsCollection)}
            >
              {categoryName === "Men" &&
                menProducts.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {categoryName === "Women" &&
                womenProducts.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {categoryName === "Kids" &&
                kidsProducts.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {categoryName === "All" &&
                products.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {categoryName === "Best Selling" &&
                bestProducts.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
              {categoryName === "New Arrivals" &&
                arrivalsProducts.map((item) => {
                  return <Banners product={item} key={item.id} />;
                })}
            </Slider>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Collection;
