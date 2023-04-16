import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
const Footer = () => {
  return (
    <div>
      <div className="footer_container">
        <div className="footer_wrapper">
          <div className="About">
            <h2>About Us</h2>
            <p className="title">@KaraisliSH.com</p>
            <img
              className="payment_img"
              src="https://www.sketchappsources.com/resources/source-image/payment-methods-logos.png"
              alt=""
            />
            <div className="links">
              <FaGithub />
              <FaInstagram />
              <FaYoutube />
              <FaTwitter />
              <FaFacebook />
            </div>
          </div>

          <div className="location">
            <h2>Loacte Us</h2>
            <p>Istanbul</p>
            <p>Ankara</p>
            <p>Aydın</p>
            <p>Denizli</p>
          </div>
          <div className="profile">
            <h2>Profile</h2>
            <p>
              <RiAccountPinBoxLine className="icon" />
              <span>myAccount</span>
            </p>
            <p>
              <AiOutlineCheck className="icon" />
              <span>chekouts</span>
            </p>
            <p>
              {" "}
              <AiOutlineHome className="icon" />
              <span>oder-tracking</span>
            </p>
            <p>
              <MdLocationOn className="icon" />
              <span>help&support</span>
            </p>
          </div>
          <div className="comminicate">
            <input type="" name="" id="" placeholder="Email" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
