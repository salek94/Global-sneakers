import React, { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import a from "../../Assets/Images/sneaker_black.png";
import b from "../../Assets/Images/sneaker_white.png";

const Hero = () => {
  const [green, setGreen] = useState(true);

  useEffect(() => {
    let g = setInterval(() => {
      setGreen(!green);
    }, 10000);
    return () => clearInterval(g);
  }, [green]);

  return (
    <>
      <div className={styles.container}>
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
