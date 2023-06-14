import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showCheckout } from "../../Service/Store/cartSlice";
import { whichCategory } from "../../Service/Store/categorySlice";
import styles from "./navbar.module.scss";
import logo from "../../Assets/Images/logo_sneakers.png";
import { BsCartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { isHamMenuOpen } from "../../Service/Store/mobileSlice";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const { hamburgerMenu } = useSelector((state) => state.mobileStore);
  const dispatch = useDispatch();

  const handleShowCheckout = () => {
    dispatch(showCheckout(true));
  };

  const handleCategory = (e) => {
    dispatch(whichCategory(e.target.innerText));
  };

  const showHamMenu = () => {
    dispatch(isHamMenuOpen(!hamburgerMenu));
  };

  return (
    <>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.navbar__hamburger} onClick={showHamMenu}>
          {hamburgerMenu ? <GiHamburgerMenu /> : <AiOutlineClose />}
        </div>
        <nav
          // className={styles.navbar__links}
          className={
            hamburgerMenu ? styles.navbar__links : styles.navbar__links__mobile
          }
        >
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
