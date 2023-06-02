import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import logo from "../../Assets/Images/logo_sneakers.png";
import { BsCartFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <img src={logo} alt="" />
        </div>
        <nav className={styles.navbar__links}>
          <Link to={"#"} className={styles.navbar__item}>
            Best Selling
          </Link>
          <Link to={"#"} className={styles.navbar__item}>
            New Arrivals
          </Link>
          <Link to={"#"} className={styles.navbar__item}>
            Men
          </Link>
          <Link to={"#"} className={styles.navbar__item}>
            Women
          </Link>
          <Link to={"#"} className={styles.navbar__item}>
            Kids
          </Link>
        </nav>
        <span className={styles.navbar__cart}>
          <BsCartFill className={styles.navbar__cartIcon} />
        </span>
      </div>
    </>
  );
};

export default Navbar;
