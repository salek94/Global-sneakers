import React from "react";
import styles from "./runningshoes.module.scss";
import video from "../../Assets/Videos/running.mp4";
import { Link } from "react-router-dom";

const RunningShoes = () => {
  return (
    <div className={styles.running__container}>
      <div className={styles.running__content}>
        <div className={styles.running__contentElements}>
          <span className={styles.running__title}>Run Faster.</span>
          <Link to="/collection">
            <button
              className={`${styles.btnPrimary__black} ${styles.running__btn}`}
            >
              New Collection
            </button>
          </Link>
        </div>
      </div>
      <video className={styles.running__video} autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default RunningShoes;
