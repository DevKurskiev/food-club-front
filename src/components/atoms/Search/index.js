import React from "react";

import { Icon } from "@atoms";

import {
  SearchContainer,
  SearchItem,
  SearchInput,
  SearchButton,
} from "./styles";

const Search = () => {
  return (
    <SearchContainer>
      <SearchItem $fullWidth>
        <SearchInput type="text" placeholder="Блюдо или заведение..." />
      </SearchItem>
      <SearchItem $ml10>
        <SearchButton>
          <Icon name="search" />
        </SearchButton>
      </SearchItem>
    </SearchContainer>
  );
};

export default Search;
