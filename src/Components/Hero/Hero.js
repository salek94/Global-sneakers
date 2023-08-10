import React, { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import hero from "../../Assets/Images/hero_img.png";
import { Link } from "react-router-dom";

const Hero = () => {
  const [green, setGreen] = useState(true);

  useEffect(() => {
    let changeBackground = setInterval(() => {
      setGreen(!green);
    }, 4000);
    return () => clearInterval(changeBackground);
  }, [green]);

  return (
    <>
      <div className={styles.hero__container}>
        <div className={styles.hero__img}>
          <img src={hero} alt="" />
        </div>
        <div
          className={
            green ? styles.shoes_background : styles.shoes_background_orange
          }
        ></div>
        <div
          className={
            green ? styles.circle_background : styles.circle_background_orange
          }
        ></div>
        <div className={styles.hero__btnShop}>
          <Link to="/collection">
            <button
              className={
                green
                  ? `${styles.btnSecondary} ${styles.hero__btn}`
                  : `${styles.btnSecondary__orange} ${styles.hero__btn} `
              }
            >
              SHOP NOW
            </button>
          </Link>
        </div>
        <div className={styles.dots_background}>
          <div className={styles.dots_content}>
            <h2>WE CONNECT THE WORLD OF SNEAKERS</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
