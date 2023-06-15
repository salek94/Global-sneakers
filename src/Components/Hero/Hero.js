import React, { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import { useSelector } from "react-redux";
import a from "../../Assets/Images/hero_img.png";

const Hero = () => {
  const { hamburgerMenu } = useSelector((state) => state.mobileStore);
  const [green, setGreen] = useState(true);

  useEffect(() => {
    let changeBackground = setInterval(() => {
      setGreen(!green);
    }, 10000);
    return () => clearInterval(changeBackground);
  }, [green]);

  return (
    <div className={!hamburgerMenu && styles.hero__show}>
      <div className={styles.hero__container}>
        <div className={hamburgerMenu ? styles.hero__img : styles.hero__noImg}>
          <img src={a} alt="" />
        </div>
        <div
          id={!hamburgerMenu && styles.shoes_noBackground}
          className={
            green ? styles.shoes_background : styles.shoes_background_orange
          }
        ></div>
        <div
          id={!hamburgerMenu && styles.circle_noBackground}
          className={
            green ? styles.circle_background : styles.circle_background_orange
          }
        ></div>
        <div
          className={
            hamburgerMenu ? styles.hero__btnShop : styles.hero__btnShop__noShow
          }
        >
          <button
            className={
              green
                ? `${styles.btnSecondary} ${styles.hero__btn}`
                : `${styles.btnSecondary__orange} ${styles.hero__btn} `
            }
          >
            SHOP NOW
          </button>
        </div>
        <div className={styles.dots_background}>
          <div className={styles.dots_content}>
            <h2>WE CONNECT THE WORLD OF SNEAKERS</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
