import React from "react";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { productsData } from "./api/Api";
import Cart from "./components/Cart/Cart.js";
import ProdcutDetails from "./components/Products/ProdcutDetails";
import { PersistGate } from "redux-persist/integration/react";
import persistor from "./pages/Redux/app/store";
import { Login } from "./components/Login/Login";
import Profile from "./components/Login/Profile";
import Shop from "./components/Shop/Shop";
import Search from "./components/Search/Search";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

//Tüm sayfalarda Header ve Footer olacak.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: productsData, // / URL Adresiyle prodcutsData componentini  kullanabiliriz.
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: productsData,
      },
      {
        path: "/products/:title",
        element: <ProdcutDetails />,
        loader: productsData,
      },
      {
        path: "/login",
        element: <Login />,
        loader: productsData,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: productsData,
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: productsData,
      },
      {
        path: "/search",
        element: <Search />,
        loader: productsData,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-red-100">
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </div>
  );
}

export default App;

/*
 {
        path: "/products",
        element: <Products />,
        loader: productsData,
      },
      */
//böyle kullanmak için homde  Products prodcuts={products } bölümünü kaldırmalısın farkı bir sayfa olarak görüntülemek için
