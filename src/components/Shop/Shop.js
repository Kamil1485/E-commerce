import React, { useState, useEffect } from "react";
import "./Shop.css";
import ProductCard from "../Products/ProductCard";
import { useDispatch } from "react-redux";
import {
  fetchAsyncCategories,
  addSelectedCategory,
} from "../../pages/Redux/features/filterSlice";
import { fetchAsyncSearch } from "../../pages/Redux/features/searchSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { clearAllFilters } from "../../pages/Redux/features/filterSlice";
const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredCategories = useSelector(
    (state) => state.filter.filteredCategories
  );
  const selectedCategory = useSelector(
    (state) => state.filter.selectedCategory
  );
  const loading = useSelector((state) => state.filter.loading);
  const categories = useSelector((state) => state.filter.categories);
  const brands=useSelector((state) => state.filter.brands);
  const selectedBrand=useSelector((state) => state.filter.selectedBrand);
  const selectedSortBy=useSelector((state) => state.filter.selectedSortBy);
  const selectedPrice=useSelector((state) => state.filter.selectedPrice);
  console.log(selectedPrice)
  const [searched, setSearched] = useState("");
  const [selected, setSelected] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy,setSortBy]=useState(selectedSortBy);
  const[brand,setBrand]=useState(selectedBrand);
  const[price,setPrice]=useState(5000);
 const [savePrice,setSavePrice]=useState(selectedPrice);


  useEffect(() => {
    setSelected(selectedCategory);
    setSortBy(selectedSortBy);
    setBrand(selectedBrand);
    setSavePrice(selectedPrice);
    setPrice(selectedPrice);
  }, [selectedCategory, selectedSortBy, selectedBrand, selectedPrice]);

useEffect(() => {
  dispatch(fetchAsyncCategories({ filterCategory: selected, sortBy: sortBy, brand:brand ,price:savePrice}));
  dispatch(addSelectedCategory(selected));
/*
  if (selected!=="" ||sortBy!==""||brand!=="") {//farklı kategoriler secildiğinde ilk sayfaya dönülmeli
    setPage(1);
  }
  */
}, [dispatch, selected,sortBy,brand,savePrice]);

  useEffect(() => {
    dispatch(fetchAsyncSearch(searched));
  }, [dispatch,searched]);


const handleSubmit=()=>{
  if(searched!==""){
    navigate(`/search?page=${page}`)
  }
}
  return (
    <div>
      <div>
        <h2>Search By Products</h2>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <button onClick={handleSubmit}>SUBMİT</button>
        <div>
          <p>Categories</p>
          <select
            name=""
            id=""
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">All</option>
            {categories?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <p>Sort By</p>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
        <option value="">All</option>
          <option value="lowestPrice">Lowest</option>
          <option value="highestPrice">Highest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <p>Brands</p>
        <select name="" id="" value={brand} onChange={(e)=>setBrand(e.target.value)}>
        <option value="">All</option>
              {
                brands.map((brand,index)=>(
                  <option key={index} value={brand}>{brand}</option>
                ))
              }
        </select>

        <p>Max Price</p>
        <input type="number" style={{width:"200px"}}  max={5000} placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <span>{savePrice} TL</span>
        <button onClick={()=>setSavePrice(price)}>Save</button>
      </div>
   <div>
    <button onClick={()=> dispatch(clearAllFilters())}>Clear Filters</button>
   </div>
      <div className="searchedCard">
        {!loading ? (
          filteredCategories
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="pagination">
        <Pagination pageType={"shop"} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Shop;
