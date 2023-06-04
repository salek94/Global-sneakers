import React from "react";
import styles from "./footer.module.scss";
import logo from "../../Assets/Images/logo_sneakers.png";
import { AiOutlineMail } from "react-icons/ai";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaYoutube,
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
                <AiOutlineMail className={styles.icon__small} />
                <span className={styles.footer__emailAddress}>
                  email@domain.com
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.footer__service}>
          <div className={styles.footer__serviceTitle}>
            <h4>About Us</h4>
          </div>
          <nav>
            <p className={styles.footer__serviceLink}>Our Story</p>
            <p className={styles.footer__serviceLink}>Careers</p>
            <p className={styles.footer__serviceLink}>Affiliates</p>
            <p className={styles.footer__serviceLink}>Visit Us</p>
            <p className={styles.footer__serviceLink}>Store</p>
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
            <h4>Customer Service</h4>
          </div>
          <nav>
            <p className={styles.footer__serviceLink}>Search Terms</p>
            <p className={styles.footer__serviceLink}>Contact Us</p>
            <p className={styles.footer__serviceLink}>FAQs</p>
            <p className={styles.footer__serviceLink}>Order And Returns</p>
            <p className={styles.footer__serviceLink}>Privacy Policy</p>
            <p className={styles.footer__serviceLink}>Terms And Conditions</p>
          </nav>
        </div>
        <div className={styles.footer__followUs}>
          <div className={styles.footer__subscribe}>
            <h4>Subscribe to our newsletter</h4>
            <div className={styles.footer__field}>
              <div>
                <input
                  type="text"
                  name="subscribe"
                  placeholder="Enter email here..."
                  className={styles.footer__input}
                />
              </div>
              <button type="submit" className={styles.btnSecondary}>
                Join Now
              </button>
            </div>
          </div>
          <div>
            <h4>Follow Us</h4>
            <nav className={styles.footer__socialLinks}>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className={styles.footer__socialIcon}
              >
                <FaFacebookF className={styles.icon__small} />
              </a>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className={styles.footer__socialIcon}
              >
                <FaInstagram className={styles.icon__small} />
              </a>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className={styles.footer__socialIcon}
              >
                <FaTwitter className={styles.icon__small} />
              </a>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className={styles.footer__socialIcon}
              >
                <FaYoutube className={styles.icon__small} />
              </a>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className={styles.footer__socialIcon}
              >
                <FaPinterest className={styles.icon__small} />
              </a>
            </nav>
          </div>
        </div>
      </section>
      <section className={styles.footer__bottom}>
        <p>&copy;2023. All rights reserved by Global Sneakers.</p>
      </section>
    </footer>
  );
};

export default Footer;
