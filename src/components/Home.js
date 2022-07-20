import React, { useEffect, useState } from "react";

import { Route, useParams, useRouteMatch, Link } from "react-router-dom";

import ProductMain from "./ProductMain";
import NavBar from "./Navbar";

import ProductBox from "./otherRes/ProductBox";
import ProductFilter from "./otherRes/ProductFilter";
import { axiosCus } from "./otherRes/commonFun";
import LoadingScreen from "./otherRes/loadingScreen";

export default function Home() {
  const [allProduct, setAllProduct] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  let { productId } = useParams();
  let { path } = useRouteMatch();

  let submitFilters = (filters) => {
    axiosCus
      .post("/submitFilters", filters)
      .then((response) => {
        setTimeout(setLoadingScreen(false), 1000);
        setAllProduct(response.data);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              break;
            case 400:
              break;
          }
        }
      });
  };

  //similar to componentdidmount and componentdidupdate when we pass 2nd param as empty array
  //called when component is mounted and state update
  useEffect(() => {
    axiosCus
      .post("/products")
      .then((response) => {
        setTimeout(setLoadingScreen(false), 1000);
        setAllProduct(response.data);
      })
      .catch((err) => {});
  }, []);

  const loadDataOrLoadingScreen = () => {
    if (loadingScreen) return <LoadingScreen />;

    if (allProduct.length) {
      return allProduct.map((product) => (
        <Link
          key={product.product_id}
          className="text-decoration-none bg-white text-dark"
          to={`${path}/${product.product_id}`}
        >
          <ProductBox {...product} />
        </Link>
      ));
    }

    return (
      <h3 className="text-center position-absolute top-50 start-50 translate-middle">
        No Products Found
      </h3>
    );
  };

  return (
    <React.Fragment>
      <NavBar />
      <div
        className="d-md-flex col-11 my-4 mx-auto justify-content-around"
        style={{ boxShadow: "0 0 5px 0 #cae7e8" }}
      >
        <div className="col-md-5 px-2">
          <ProductFilter submit={submitFilters} />
        </div>
        <div className="col-md-7 p-2 position-relative">
          {loadDataOrLoadingScreen()}
        </div>
      </div>
      <Route exact path={`${path}/:productId`} component={ProductMain} />
    </React.Fragment>
  );
}
