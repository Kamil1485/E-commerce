import React from "react";
import "./CartDetails.css";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  addToCart,
  reduceToCart,
} from "../../pages/Redux/features/bazarSlice";
import { toast } from "react-toastify";
export const CartDetails = ({ singleProductData }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (singleProductData.quantity > 1) {
      dispatch(reduceToCart({ ...singleProductData, quantity: 1 }));
      toast.error(`${singleProductData.title} removed from cart`);
    } else {
      dispatch(deleteItem(singleProductData));
      toast.error(`${singleProductData.title} deleted from cart`);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...singleProductData, quantity: 1 }));
    toast.success(`${singleProductData.title} added to cart`);
  };
  return (
    <div>
      <div className="details_container">
        <div className="left_container">
          <span className="remove_item">
            <IoIosClose
              className="item"
              onClick={() =>
                dispatch(deleteItem(singleProductData)) &&
                toast.error(`${singleProductData.title} removed from cart`)
              }
            />
          </span>
          <img className="card_img" src={singleProductData.images[0]} alt="" />
        </div>

        <div className="right_container">
          <div className="title">
            <h3>{singleProductData.title}</h3>
          </div>
          <div className="quantity_container">
            <span className="current_price">{singleProductData.price} $</span>
            <div className="card_add">
              <div className="quantity">Quantity</div>
              <button className="decrease_quantity" onClick={handleDecrease}>
                -
              </button>
              <button className="card_item">
                {singleProductData.quantity}
              </button>
              <button className="increase_quantity" onClick={handleAddToCart}>
                +
              </button>
            </div>
            <span className="updated_price">
              {singleProductData.quantity * singleProductData.price} $
            </span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
