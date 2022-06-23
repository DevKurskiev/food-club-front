import React from "react";

import {
  EstablishmentCardsContainer,
  EstablishmentCardsItem,
  EstablishmentCardsImage,
  EstablishmentCardsName,
  EstablishmentCardsSubtitle,
} from "./styles";

function EstablishmentCards({ establishments }) {
  return (
    <EstablishmentCardsContainer>
      {establishments.map((el) => {
        return (
          <EstablishmentCardsItem>
            <EstablishmentCardsImage src={el.cardImage} />
            <EstablishmentCardsName>{el.cardName}</EstablishmentCardsName>
            <EstablishmentCardsSubtitle>
              {el.cardSubtitle}
            </EstablishmentCardsSubtitle>
          </EstablishmentCardsItem>
        );
      })}
    </EstablishmentCardsContainer>
  );
}

export default EstablishmentCards;
