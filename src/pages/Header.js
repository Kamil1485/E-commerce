import React, { useState } from "react";
import "./Heder.css";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { deleteUser } from "./Redux/features/bazarSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state) => state.bazar.userInfo); //bazarSlice UserInfo özelliğine erişiyoruz state.bazar= const initialState={ productData:[],userInfo:null,loading:false,} özelliğinin güncel hali
  const [userNav, setUserNav] = useState(false);



  const handleSignOut = () => {
    setUserNav(false);
    signOut(auth)
      .then(() => {
        toast.success("Log out Succesfully");
        dispatch(deleteUser());
      })
      .catch((error) => {
        
      });
  };

  /*

let totalCard=0;
productData.map((product)=>{
  return  totalCard+=product.quantity
})

*/

  return (
    <div className="header_container">
      <div>
        <Link className="logo_container" to={"/"}>
          <img
            className="logo"
            style={{ width: "100px" }}
            src={
              "https://media.istockphoto.com/id/1138644570/vector/shopping-cart-icon-design-cart-icon-symbol-design.jpg?s=612x612&w=0&k=20&c=_lTGkSkJ6ha8ZNiKD8XWVtLNyTjQ74HCu_c4WFio27g="
            }
            alt=""
          />
        </Link>
      </div>
      <div className="nav">
        <div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/shop"}>Shop</Link>
            </li>
          </ul>
        </div>
        <div className="card_icon">
          <Link to={"/cart"}>
            <HiOutlineShoppingBag />
          </Link>
          <span className="card_count">{productData.length}</span>
        </div>
        <div className="card_avatar">
          {userInfo ? (
            <div
              className="user_container"
              onClick={() => setUserNav(!userNav)}
            >
              {userInfo.image ? (
                <img className="user_avatar" src={userInfo.image} alt="" />
              ) : (
                <div className="base_avatar">
                    <RxAvatar />
                </div>
              )}
              <p className="user_title">{userInfo.name}</p>
            </div>
          ) : (
            <div className="base_avatar">
              <Link to={"/login"}><RxAvatar /></Link>
            </div>
          )}
          {userInfo && (
            <div
              style={{ width: "60px", border: "none" }}
              className={`profile_container ${userNav ? "active" : ""}`}
            >
              <Link to={"/profile"}>
                <p className="profile">Profile</p>
              </Link>
              <Link to={"/"}>
                <p className="profile_btn" onClick={handleSignOut}>
                  Log Out
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
