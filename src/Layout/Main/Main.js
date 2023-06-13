import React from "react";
import Trending from "../../Components/Trending/Trending";
import Category from "../../Components/Category/Category";
import Guarantee from "../../Components/Guarantee/Guarantee";
import RunningShoes from "../../Components/RunningShoes/RunningShoes";

const Main = () => {
  return (
    <>
      <Trending />
      <Category />
      <RunningShoes />
      <Guarantee />
    </>
  );
};

export default Main;
