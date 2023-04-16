import axios from "axios";
export async function productsData() {
  const products = await axios.get("https://dummyjson.com/products?limit=20");
  // console.log(products.data.products)
  return products.data.products;
}

/*  
import React,{useState,useEffect} from "react"
import axios from "axios";

const Api=()=>{
 const [data,setData]=useState([]);
const fetchPhotos=async()=>{
    const response=await axios.get('https://fakestoreapiserver.reactbd.com/products')
    setData(response.data)
}

useEffect(()=>{
    fetchPhotos();
},[])

return data;

}
export default Api;
*/
