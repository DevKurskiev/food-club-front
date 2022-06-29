import React from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@atoms";
import * as constants from "@store/constants/findProduct";

import {
  SearchContainer,
  SearchItem,
  SearchInput,
  SearchButton,
} from "./styles";

const Search = () => {
  const dispatch = useDispatch();

  const handleFindProducts = (e) => {
    dispatch({
      type: constants.FIND_PRODUCT,
      payload: e.target.value,
    });
  };

  return (
    <SearchContainer>
      <SearchItem $fullWidth>
        <SearchInput
          onChange={handleFindProducts}
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
