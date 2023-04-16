import React, { useState } from "react";
import ProductCard from "../Products/ProductCard";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import "./Search.css";
const Search = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const searchedProducts = useSelector((state) => state.search.filterSearch);
  return (
    <div className="search_container">
      <p className="back_shop" onClick={() => navigate("/shop")}>
        <IoReturnDownBack />
      </p>
      <div className="search_wrapper">
        {searchedProducts
          .slice((page - 1) * 10, (page - 1) * 10 + 10)
          .map((item, index) => (
            <div key={index} className="">
              <ProductCard product={item} />
            </div>
          ))}
      </div>
      <div>
        <Pagination pageType={"search"} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Search;
