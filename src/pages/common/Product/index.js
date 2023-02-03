import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProductCard, Header } from "@molecules";

const Product = () => {
  const [product, setProduct] = useState();
  const [productItemsData, setProductItemsData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.post("/products/take", { id }).then((res) => {
      setProduct(res.data[0]);
    });
    axios.post("/products/take/find-items", { id }).then((res) => {
      setProductItemsData(res.data[0].items);
    });
  }, [id]);

  return (
    <>
      <Header isNotSearch />
      <ProductCard
        center
        product={product}
        productItemsData={productItemsData}
      />
      ;
    </>
  );
};

export default Product;
