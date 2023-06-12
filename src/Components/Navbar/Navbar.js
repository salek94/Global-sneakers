import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCheckout } from "../../Service/Store/cartSlice";
import { whichCategory } from "../../Service/Store/categorySlice";
import styles from "./navbar.module.scss";
import logo from "../../Assets/Images/logo_sneakers.png";
import { BsCartFill } from "react-icons/bs";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

  const handleShowCheckout = () => {
    dispatch(showCheckout(true));
  };

  const handleCategory = (e) => {
    dispatch(whichCategory(e.target.innerText));
  };

  return (
    <>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav className={styles.navbar__links}>
          <a href={"#best-selling"} className={styles.navbar__item}>
            Best Selling
          </a>
          <a href={"#best-selling"} className={styles.navbar__item}>
            New Arrivals
          </a>
          <Link
            to={"/collection/men"}
            className={styles.navbar__item}
            onClick={handleCategory}
          >
            Men
          </Link>
          <Link
            to={"/collection/women"}
            className={styles.navbar__item}
            onClick={handleCategory}
          >
            Women
          </Link>
          <Link
            to={"/collection/kids"}
            className={styles.navbar__item}
            onClick={handleCategory}
          >
            Kids
          </Link>
          <Link
            to={"/collection/all"}
            className={styles.navbar__item}
            onClick={handleCategory}
          >
            All
          </Link>
        </nav>
        <span className={styles.navbar__cart} onClick={handleShowCheckout}>
          <BsCartFill className={styles.icon__small} />
          <span className={styles.navbar__cartLength}>{cart?.length || 0}</span>
        </span>
      </div>
    </>
  );
};

export default Navbar;
