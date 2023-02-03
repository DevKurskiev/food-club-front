import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useWindowDimensions from "@hooks/useWindowDimensions";
import * as constants from "@store/constants/index";
import { Select, Search } from "@atoms";
import { Header, ProductCards } from "@molecules";
import { Page } from "@organisms";
import { productCategory } from "./helpers";

const Products = () => {
  const product = useSelector((store) => store.chooseProduct);
  const dispatch = useDispatch();
  const { isMobile } = useWindowDimensions();
  const [productData, setProductData] = useState({ items: [], loader: true });

  const handleSearchProducts = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: { ...product, name: e.target.value },
    });
  };

  useEffect(() => {
    axios.post("/products/take", product).then((res) => {
      setProductData({
        items: res.data,
        loader: false,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Page>
      <Header isNotSearch={false} />
      <Select
        mt
        options={productCategory(product)}
        checked={product.category}
      />

      {isMobile && <Search onChange={handleSearchProducts} />}

      <ProductCards center products={productData} />
    </Page>
  );
};

export default Products;
