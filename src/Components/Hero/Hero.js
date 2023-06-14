import React, { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import { useSelector } from "react-redux";

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
    <>
      <div
        className={
          hamburgerMenu
            ? styles.hero__container
            : styles.hero__container__mobile
        }
      >
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
