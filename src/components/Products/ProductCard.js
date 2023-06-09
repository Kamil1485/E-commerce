import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../pages/Redux/features/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
 // eslint-disable-next-line no-unused-vars
 const pricem=useSelector((state)=>state.filter.selectedPrice)
//  console.log(pricem)
  const navigate = useNavigate();

  const handleNavigate = (title) => {
    navigate(`/products/${title.toLowerCase().split(" ").join("")}`, {
      //window location objesindeki state degiskenini güncelle,product datayı bu sekilde details sayfasına aktarabilirsin.
      state: {
        data: product,
      },
    });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 })); //+1 ekle alınan ürüne
    toast.success(`${product.title} added to cart`);
  }; //payload:product olarak gönderdik.
  return (
    <div className="product_container">
      <div className="product_wrapper">
        <div className="product_sale">
          {<span className="sale">{product.brand}</span>}
        </div>
        <div
          className="product_img_container"
          onClick={() => handleNavigate(product.title)}
        >
{        <img className="product_img" src={product.thumbnail} alt="" /> }
        </div>
        <div>
          <h2 className="product_title">{product.title}</h2>
        </div>
        <div className="product_price">
          <div className="product_footer">
            {/** */}
            <p className="price">{product.price} $</p>
          </div>
          <div className="add_cart" onClick={handleAddToCart}>
            Add to Cart
          </div>
        </div>
        <p className="product_category">{product.category}</p>
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
  );
};

export default ProductCard;
