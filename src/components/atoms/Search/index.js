import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@atoms";
import * as constants from "@store/constants/index";

import {
  SearchContainer,
  SearchItem,
  SearchInput,
  SearchButton,
} from "./styles";

const Search = () => {
  const product = useSelector((store) => store.chooseProduct);
  const dispatch = useDispatch();

  const handleProductsSearch = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: { ...product, name: e.target.value },
    });
    console.log(product);
  };

  return (
    <SearchContainer>
      <SearchItem $fullWidth>
        <SearchInput
          onChange={handleProductsSearch}
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
