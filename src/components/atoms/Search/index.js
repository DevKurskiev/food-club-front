import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@atoms";
import * as constants from "@store/constants/findProduct";

import {
  SearchContainer,
  SearchItem,
  SearchInput,
  SearchButton,
} from "./styles";

const Search = () => {
  const findProduct = useSelector((store) => store.chooseProduct);
  const dispatch = useDispatch();

  const handleFindProducts = (e) => {
    dispatch({
      type: constants.FIND_PRODUCT,
      payload: { ...findProduct, name: e.target.value },
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
