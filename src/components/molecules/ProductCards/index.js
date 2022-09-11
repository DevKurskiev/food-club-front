import React from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "@atoms";

import {
  ProductCardsContainer,
  ProductCardsItem,
  ProductCardsImage,
  ProductCardsName,
  ProductCardsSubtitle,
  ProductCardsNotFound,
} from "./styles";

function ProductCards({ products }) {
  const navigate = useNavigate();
  const isProducts = products.items.length;

  return (
    <ProductCardsContainer>
      {products.loader ? (
        <Loader center />
      ) : !isProducts && !products.loader ? (
        <ProductCardsNotFound>Ничего не найдено</ProductCardsNotFound>
      ) : (
        products.items.map((el) => {
          return (
            <ProductCardsItem
              onClick={() => navigate(`/product/${el.id}`)}
              key={el.name}
            >
              <ProductCardsImage src={el.avatar} />
              <ProductCardsName>{el.name}</ProductCardsName>
              <ProductCardsSubtitle>{el.title}</ProductCardsSubtitle>
            </ProductCardsItem>
          );
        })
      )}
    </ProductCardsContainer>
  );
}

export default ProductCards;
