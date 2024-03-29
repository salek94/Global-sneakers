import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { settings } from "../Features/settings";
import Banners from "../Banners/Banners";
import ProductService from "../../Service/Api/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Service/Store/productSlice";
import styles from "../Banners/banners.module.scss";

const Trending = () => {
  const { products } = useSelector((state) => state.productStore);
  const [titleActive, setTitleActive] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const dispatch = useDispatch();
  const refBannerWrapper = useRef(null);

  useEffect(() => {
    ProductService.allProduct()
      .then((res) => {
        if (res.status === 200) dispatch(getAllProduct(res.data.data));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
      }
    );
    observer.observe(refBannerWrapper.current);
    return () => observer.disconnect();
  }, [isIntersecting]);

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
    <div
      className={!isIntersecting ? styles.container : styles.container_show}
      ref={refBannerWrapper}
    >
      <div className={styles.title} id="best-selling">
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
              return (
                <Banners product={item} key={item.id} active={titleActive} />
              );
            })
          : newArrivals.map((item) => {
              return (
                <Banners product={item} key={item.id} active={titleActive} />
              );
            })}
      </Slider>
    </div>
  );
};

export default Trending;
