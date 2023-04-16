import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { addToCart } from "../../pages/Redux/features/bazarSlice";
import "./ProductDetails.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
const ProdcutDetails = () => {
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch(); //action  olusturucu fonksiyon

  useEffect(() => {
    setDetails(location.state.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...details, quantity: quantity }));
    toast.success(`${details.title} added to cart`);
  };

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="container">
      <BiArrowBack
        style={{ fontSize: "32px", cursor: "pointer" }}
        onClick={() => handleBack()}
      />
      <div className="left_side">
        <img className="details_image" src={details.thumbnail} alt="" />
      </div>
      <div className="right_side">
        <div>
          <h1>{details.title}</h1>
          <div className="product_price">
            <p className="oldprice">
              {Math.floor(
                details.price +
                  (details.price * details.discountPercentage) / 100
              )}{" "}
              $
            </p>
            <p className="price">{details.price} $</p>
          </div>
        </div>
        <div className="review">
          <div>
            {Array.from({ length: 5 }, (_, index) => (
              <MdOutlineStar
                key={index}
                color={index < details.rating ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
          <div>{Math.floor(details.rating)} reviews</div>
        </div>
        <div className="description">
          <p>{details.description ? details.description : details.des}</p>
        </div>
        <div className="add_container">
          <div className="add_card">
            <div className="quantity">Quantity</div>
            <button
              className="decrease"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <button className="card_item">{quantity}</button>
            <button
              className="increase"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="add_btn" onClick={handleAddToCart}>
            Add to Card
          </div>
        </div>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            bodyStyle={{ color: "green" }}
            draggable={false}
            closeButton={false}
            pauseOnFocusLoss={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdcutDetails;
