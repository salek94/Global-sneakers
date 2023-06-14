import React from "react";
import styles from "./scrolltop.module.scss";
import { FaArrowUp } from "react-icons/fa";

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scroll} onClick={handleScrollTop}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollTop;
