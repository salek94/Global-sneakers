import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { settings } from "../Features/settings";
import Banners from "../Banners/Banners";
import ProductService from "../../Service/Api/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Service/Store/productSlice";
import styles from "../Banners/banners.module.scss";

const Trending = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);
  const [titleActive, setTitleActive] = useState(true);
  console.log("aaaa", products);
  useEffect(() => {
    ProductService.allProduct()
      .then((res) => {
        if (res.status === 200) dispatch(getAllProduct(res.data.data));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTitle = () => {
    setTitleActive(titleActive ? false : true);
  };

  let bestSelling = products.filter(
    (item) => item.categories[1].name === "Best Selling"
  );
  let newArrivals = products.filter(
    (item) => item.categories[1].name !== "Best Selling"
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3
          onClick={() => handleTitle(true)}
          className={
            titleActive
              ? `${styles.title__name} ${styles.title__name__active}`
              : styles.title__name
          }
        >
          Best Selling
        </h3>
        <h3
          onClick={() => handleTitle(false)}
          className={
            !titleActive
              ? `${styles.title__name} ${styles.title__name__active}`
              : styles.title__name
          }
        >
          New Arrivals
        </h3>
      </div>
      <Slider {...settings}>
        {titleActive
          ? bestSelling.map((item) => {
              return <Banners product={item} key={item.id} />;
            })
          : newArrivals.map((item) => {
              return <Banners product={item} key={item.id} />;
            })}
      </Slider>
    </div>
  );
};

export default Trending;
