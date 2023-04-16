import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import Products from "../components/Products/Products";
import Loader from "../components/Loader/Loader";
const Home = () => {
  const routerData = useLoaderData(); //router daki loader metodunda productsData fonksiyonundan dönen products verisi var.
  const [products, setProdcuts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProdcuts(routerData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [routerData]);

  return (
    <div>
      <Banner />
      {loading ? <Loader /> : <Products products={products} />}
    </div>
  );
};

export default Home;
