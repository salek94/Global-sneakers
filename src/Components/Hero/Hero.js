import React from "react";
import styles from "./hero.module.scss";

const Hero = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.shoes_background}></div>
        <div className={styles.circle_background}></div>
        <div className={styles.dots_background}>
          <h3>jwaidji</h3>
        </div>
      </div>
    </>
  );
};

export default Hero;
