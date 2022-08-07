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
  const dispatch = useDispatch();

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

  return (
    <Page>
      <Header />
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
