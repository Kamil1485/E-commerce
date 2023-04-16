import React from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
const Products = ({ products }) => {
  return (
    <div>
      <div className="products_container">
        <div className="products_wrapper">
          <h1>Trending Sales</h1>
          <p>Weekly Trending Products</p>
        </div>
        <div className="singleCard">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
