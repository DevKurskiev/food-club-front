import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProductCard, Header } from "@molecules";

const Product = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    axios.post("/products/take", { id: productId }).then((res) => {
      setProduct(res.data[0]);
    });
  }, []);

  return (
    <>
      <Header />
      <ProductCard product={product} />;
    </>
  );
};

export default Product;
