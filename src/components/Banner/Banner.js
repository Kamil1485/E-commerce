import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Banner.css";
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const banners = [
    {
      id: 1,
      url: "https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Professional-E-Commerce-Shoes-Banner-Design.jpg",
    },
    {
      id: 2,
      url: "https://armworldwide.com/wp-content/uploads/2022/05/Fashion-E-commerce.jpeg",
    },
    {
      id: 3,
      url: "https://www.ecommerceceo.com/wp-content/uploads/2021/06/Types-Of-Ecommerce.jpg",
    },
  ];
  const prevSlide = () => {
    setCurrentSlide(currentSlide < 1 ? banners.length : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === banners.length ? 1 : (prev) => prev + 1);
  };

  return (
    <div className="banner_container">
      {banners.map((banner, index) => (
        <div key={index}>
          <div className={index + 1 === currentSlide ? "" : "hide"}>
            <img className="banner_img" src={banner.url} alt="" />
          </div>
        </div>
      ))}
      <div className="arrows">
        <div className="left_arrow">
          <AiOutlineArrowLeft onClick={prevSlide} />
        </div>
        <div className="right_arrow" onClick={nextSlide}>
          <AiOutlineArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Banner;
