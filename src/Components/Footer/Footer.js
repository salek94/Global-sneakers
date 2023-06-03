import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer__container}>
      <section className={styles.footer__top}></section>
      <section className={styles.footer__bottom}></section>
    </footer>
  );
};

export default Footer;
