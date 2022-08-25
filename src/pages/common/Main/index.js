import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useWindowDimensions from "@hooks/useWindowDimensions";
import * as constants from "@store/constants/product";
import { Select, Search } from "@atoms";
import { Header, ProductCards } from "@molecules";
import { Page } from "@organisms";
import { productCategory } from "./helpers";

const Main = () => {
  const { isMobile } = useWindowDimensions();
  const [productData, setProductData] = useState({ items: [], loader: true });
  const product = useSelector((store) => store.chooseProduct);
  const basketCounter = useSelector((store) => store.basketCounter);
  const dispatch = useDispatch();

  const handleProducts = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: {
        ...product,
        category: e.target.dataset.type,
      },
    });
  };

  const handleSearchProducts = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: { ...product, name: e.target.value },
    });
  };

  useEffect(() => {
    setProductData({
      ...productData,
      loader: true,
    });
    axios.post("/products/take", product).then((res) => {
      setProductData({
        items: res.data,
        loader: false,
      });
    });
  }, [product]);

  useEffect(() => {
    axios.get("/basket/get-from-basket").then((res) => {
      let counter = res.data[0].inBasket
        .map((el) => el.quantity)
        .reduce((el, x) => el + x);

      dispatch({
        type: constants.BASKETCOUNTER,
        payload: counter,
      });
    });
  }, []);

  return (
    <Page>
      <Header counter={basketCounter > 0 ? basketCounter : false} />
      <Select
        onClick={handleProducts}
        mt
        options={productCategory(product)}
        checked={product.category}
      />

      {isMobile && <Search onChange={handleSearchProducts} />}

      <ProductCards products={productData} />
    </Page>
  );
};

export default Main;
