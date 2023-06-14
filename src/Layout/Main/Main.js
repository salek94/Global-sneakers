import React, { useState } from "react";
import Trending from "../../Components/Trending/Trending";
import Category from "../../Components/Category/Category";
import Guarantee from "../../Components/Guarantee/Guarantee";
import RunningShoes from "../../Components/RunningShoes/RunningShoes";
import ScrollTop from "../../Components/Features/ScrollTop";

const Main = () => {
  const [showScroll, setShowScroll] = useState(false);
  const handleScroll = () => {
    if (window.scrollY >= 1000) {
      setShowScroll(true);
    } else setShowScroll(false);
  };

  return (
    <div onMouseOver={handleScroll} onScroll={handleScroll}>
      <Trending />
      <Category />
      <RunningShoes />
      <Guarantee />
      {showScroll && <ScrollTop />}
    </div>
  );
};

export default Main;
