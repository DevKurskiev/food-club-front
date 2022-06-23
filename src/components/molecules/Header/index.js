import React from "react";

import { Icon, Search, Button } from "@atoms";
import useWindowDimensions from "@hooks/useWindowDimensions";

import { HeaderContainer, HeaderItem, HeaderIconParent } from "./styles";

const Header = () => {
  const { isMobile } = useWindowDimensions();

  return (
    <HeaderContainer isMobile={isMobile}>
      <HeaderItem>
        <HeaderIconParent>
          <Icon name={isMobile ? "logo-mob" : "logo"} />
        </HeaderIconParent>
      </HeaderItem>
      {!isMobile && (
        <HeaderItem>
          <Search />
        </HeaderItem>
      )}
      <HeaderItem $flex>
        <Button
          buttonText={!isMobile && "Войти"}
          iconName={isMobile && "profile"}
          iconSize={25}
        />
        <Button
          buttonText={!isMobile && "Корзина"}
          $light
          iconName={isMobile && "basket"}
          iconSize={25}
        />
      </HeaderItem>
    </HeaderContainer>
  );
};

export default Header;
