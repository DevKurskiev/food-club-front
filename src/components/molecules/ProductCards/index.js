import React from "react";

import {
  ProductCardsContainer,
  ProductCardsItem,
  ProductCardsImage,
  ProductCardsName,
  ProductCardsSubtitle,
} from "./styles";

function ProductCards({ products }) {
  return (
    <ProductCardsContainer>
      {products.map((el) => {
        return (
          <ProductCardsItem key={el.name}>
            <ProductCardsImage src={el.avatar} />
            <ProductCardsName>{el.name}</ProductCardsName>
            <ProductCardsSubtitle>{el.title}</ProductCardsSubtitle>
          </ProductCardsItem>
        );
      })}
    </ProductCardsContainer>
  );
}

export default ProductCards;
