import React, { useEffect, useState } from "react";
import styles from "./hero.module.scss";
import a from "../../Assets/Images/sneaker_black.png";
import b from "../../Assets/Images/sneaker_white.png";

const Hero = () => {
  const [green, setGreen] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setGreen(!green);
    }, 8000);
  });

  return (
    <>
      <div className={styles.container}>
        <div
          style={
            green
              ? {
                  backgroundImage: `url(${a})`,
                }
              : {
                  backgroundImage: `url(${b})`,
                }
          }
          className={styles.shoes_background}
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
