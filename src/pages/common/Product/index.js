import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { ProductCard, Header } from "@molecules";

const Product = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const productId = params.id;
  const basketCounter = useSelector((store) => store.basketCounter);

  useEffect(() => {
    axios.post("/products/take", { id: productId }).then((res) => {
      setProduct(res.data[0]);
    });
  }, []);

  return (
    <>
      <Header counter={basketCounter > 0 ? basketCounter : false} />
      <ProductCard product={product} />;
    </>
  );
};

export default Product;
