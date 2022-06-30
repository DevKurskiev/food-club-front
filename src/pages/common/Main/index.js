import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import useWindowDimensions from "@hooks/useWindowDimensions";
import * as constants from "@store/constants/findProduct";
import { Select, Search } from "@atoms";
import { Header, ProductCards } from "@molecules";
import { Page } from "@organisms";

const Main = () => {
  const { isMobile } = useWindowDimensions();
  const [productData, setProductData] = useState([]);
  const findProduct = useSelector((store) => store.chooseProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(
        "/products/take",
        findProduct?.name
          ? { findName: findProduct.name }
          : findProduct?.findType
          ? { findType: findProduct.findType }
          : {}
      )
      .then((res) => {
        setProductData(res.data);
      });
  }, [findProduct]);

  const handleFindProducts = (e) => {
    dispatch({
      type: constants.FIND_PRODUCT,
      payload: {
        ...findProduct,
        findType: e.target.value === "Магазины" ? "shop" : "cafe",
      },
    });
  };

  return (
    <Page>
      <Header />
      <Select
        onClick={handleFindProducts}
        mt
        options={[{ value: "Магазины" }, { value: "Заведения" }]}
      />

      {isMobile && <Search />}

      <ProductCards products={productData || []} />
    </Page>
  );
};

export default Main;
