import React, { useEffect } from "react";
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
  const dispatch = useDispatch();

  useEffect(() => {
    ProductService.allProduct()
      .then((res) => {
        if (res.status === 200) dispatch(getAllProduct(res.data.data));
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(products);

  return (
    <>
      <Navbar />
      <div className={styles.collection__container}>
        <div className={styles.collection__hero}></div>
        <main className={styles.collection__main}>
          <aside className={styles.collection__asideBar}>
            <div>
              <input
                type="search"
                name="search"
                placeholder="Search product..."
              />
            </div>
          </aside>
          <div className={styles.collection__products}>
            <h4>sdawd</h4>
            <Slider {...settingsCollection}>
              {products.map((item) => {
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
