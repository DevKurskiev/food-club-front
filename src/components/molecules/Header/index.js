import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Icon, Search, Button } from "@atoms";
import useWindowDimensions from "@hooks/useWindowDimensions";
import * as constants from "@store/constants/product";

import { HeaderContainer, HeaderItem, HeaderIconParent } from "./styles";

const Header = ({ isNotSearch, ...props }) => {
  const product = useSelector((store) => store.chooseProduct);
  const { isMobile } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProducts = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: { ...product, name: e.target.value },
    });
  };

  return (
    <HeaderContainer isMobile={isMobile} isNotSearch={isNotSearch}>
      <HeaderItem>
        <HeaderIconParent onClick={() => navigate("/products")}>
          <Icon name={isMobile ? "logo-mob" : "logo"} />
        </HeaderIconParent>
      </HeaderItem>
      {!isMobile && !isNotSearch && (
        <HeaderItem>
          <Search onChange={handleProducts} />
        </HeaderItem>
      )}
      <HeaderItem $flex>
        <Button
          buttonText={!isMobile && "Войти"}
          iconName={isMobile && "profile"}
          iconSize={25}
          onClick={() => navigate("/login")}
        />
        <Button
          buttonText={!isMobile && "Корзина"}
          $light
          iconName={isMobile && "basket"}
          iconSize={25}
          onClick={() => navigate("/basket")}
        />
      </HeaderItem>
    </HeaderContainer>
  );
};

export default Header;
