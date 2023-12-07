import React from "react";
import Routers from "../Routes/routes";
import Header from "../Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const layout = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routers />
    </>
  );
};

export default layout;
