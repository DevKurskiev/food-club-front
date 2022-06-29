import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import useWindowDimensions from "@hooks/useWindowDimensions";
import { Select, Search } from "@atoms";
import { Header, ProductCards } from "@molecules";
import { Page } from "@organisms";

const Main = () => {
  const { isMobile } = useWindowDimensions();
  const [productData, setProductData] = useState([]);
  const findProduct = useSelector((store) => store.chooseProduct);

  useEffect(() => {
    axios
      .post(
        "/products/take",
        findProduct && findProduct.length > 0 ? { findName: findProduct } : {}
      )
      .then((res) => {
        setProductData(res.data);
      });
  }, [findProduct]);

  return (
    <Page>
      <Header />
      <Select mt options={["Магазины", "Заведения"]} />

      {isMobile && <Search />}

      <ProductCards products={productData || []} />
    </Page>
  );
};

export default Main;
