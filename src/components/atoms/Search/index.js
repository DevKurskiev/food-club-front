import React from "react";

import { Icon } from "@atoms";

import {
  SearchContainer,
  SearchItem,
  SearchInput,
  SearchButton,
} from "./styles";

const Search = ({ onChange }) => {
  return (
    <SearchContainer>
      <SearchItem $fullWidth>
        <SearchInput
          onChange={onChange}
          type="text"
          placeholder="Название заведения..."
        />
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
