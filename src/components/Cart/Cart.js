import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CartDetails } from "./CartDetails";
import { useDispatch } from "react-redux";
import { clearCart } from "../../pages/Redux/features/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import "./Cart.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.bazar.productData); //redux's sotre datası
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(false);

  useEffect(() => {
    let price = 0;
    productData.map((product) => {
      price += product.price * product.quantity;
      return price;
    });
    setTotal(price);
  }, [productData]);

  const handleCheckOut = () => {
    userInfo ? setPayment(true) : toast.error("Please sign in to CheckOut");
  };

  const paymentToken = async (token) => {
    await axios.post("http://localhost:8000/pay", {
      amount: total / 18,
      token: token,
    });
  };
  return (
    <div>
      <div className="cart-wrapper">
        <h2>Shopping Cart</h2>
        <div className="singleCard">
          <div className="details_card">
            {productData.map((product) => (
              <CartDetails key={product._id} singleProductData={product} />
            ))}
          </div>
          <div className="total_container">
            <h2>Cart Total</h2>

            <p>
              Shipping Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Non, provident.
            </p>
            <div className="total_payment">
              <p>Total</p>
              <p>{total.toFixed(1)} $</p>
            </div>
            <button onClick={handleCheckOut}>Proceed to checkout</button>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <div className="checkout_container">
              {payment && (
                <StripeCheckout
                  name="Karaisli Shopping/Tr"
                  description={`Your total Payment is ${total.toFixed(2)}`}
                  image={userInfo?.image}
                  stripeKey="pk_test_51MnSGNA5z0tyQ59wdIOlcbSGUq6MsFekJxmhaw2wPr2fdoYIoQxXTpNST31sB4RWvYVIJ8sZtuF8iDu3TL28N5O600SDpqsyB9"
                  email="info@vidhub.co"
                  label={"Pay to Karaisli"}
                  amount={total * 100}
                  token={paymentToken}
                ></StripeCheckout>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => dispatch(clearCart()) && toast.error("Cart Cleared")}
        >
          Clear Cart
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        draggable={false}
        closeButton={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default Cart;
