import React from "react";
import styles from "./footer.module.scss";
import logo from "../../Assets/Images/logo_sneakers.png";
import { AiOutlineMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer__container}>
      <section className={styles.footer__top}>
        <div className={styles.footer__companyInfo}>
          <div className={styles.footer__logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.footer__street}>
            <p>685 Market Street</p>
            <p>San Francisco, CA 94105</p>
            <div className={styles.footer__email}>
              <p className={styles.footer__email__name}>
                <AiOutlineMail />
                <span>email@domain.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.footer__service}>
          <div className={styles.footer__serviceTitle}>
            <h4>Shop By</h4>
          </div>
          <nav>
            <p className={styles.footer__serviceLink}>New Arrivals</p>
            <p className={styles.footer__serviceLink}>Trending</p>
            <p className={styles.footer__serviceLink}>All Collections</p>
            <p className={styles.footer__serviceLink}>Men</p>
            <p className={styles.footer__serviceLink}>Women</p>
            <p className={styles.footer__serviceLink}>Kids</p>
          </nav>
        </div>
        <div className={styles.footer__service}>
          <div className={styles.footer__serviceTitle}>
            <h4>Shop By</h4>
          </div>
          <nav>
            <p className={styles.footer__serviceLink}>New Arrivals</p>
            <p className={styles.footer__serviceLink}>Trending</p>
            <p className={styles.footer__serviceLink}>All Collections</p>
            <p className={styles.footer__serviceLink}>Men</p>
            <p className={styles.footer__serviceLink}>Women</p>
            <p className={styles.footer__serviceLink}>Kids</p>
          </nav>
        </div>
        <div className={styles.footer__service}>
          <div className={styles.footer__serviceTitle}>
            <h4>Shop By</h4>
          </div>
          <nav>
            <p className={styles.footer__serviceLink}>New Arrivals</p>
            <p className={styles.footer__serviceLink}>Trending</p>
            <p className={styles.footer__serviceLink}>All Collections</p>
            <p className={styles.footer__serviceLink}>Men</p>
            <p className={styles.footer__serviceLink}>Women</p>
            <p className={styles.footer__serviceLink}>Kids</p>
          </nav>
        </div>
        <div className={styles.footer__followUs}>
          <div>
            <h4>Subscribe to our newsletter</h4>
            <div>
              <input type="text" />
              <button>Join</button>
            </div>
          </div>
          <h4>Follow Us</h4>
          <nav>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaPinterest />
          </nav>
        </div>
      </section>
      <section className={styles.footer__bottom}>awdwad</section>
    </footer>
  );
};

export default Footer;
