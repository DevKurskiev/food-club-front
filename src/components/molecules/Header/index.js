import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Icon, Search, Button } from "@atoms";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UseUserRoles from "@hooks/useUserRoles";
import { countPayment } from "@helpers/countPayment";

import { HeaderContainer, HeaderItem, HeaderIconParent } from "./styles";

const Header = ({ isNotSearch, counter, ...props }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.currentUser);
  const { isMobile } = useWindowDimensions();
  const { isUser } = UseUserRoles();
  const [count, setBasketCounter] = useState();

  useEffect(() => {
    if (currentUser) {
      setBasketCounter(countPayment(currentUser));
    }
  }, [currentUser]);

  return (
    <HeaderContainer
      $flex={!isUser}
      isMobile={isMobile}
      isNotSearch={isNotSearch}
    >
      <HeaderItem>
        <HeaderIconParent onClick={() => navigate("/")}>
          <Icon name={isMobile ? "logo-mob" : "logo"} />
        </HeaderIconParent>
      </HeaderItem>

      {!isMobile && !isNotSearch && isUser && (
        <HeaderItem>
          <Search />
        </HeaderItem>
      )}

      <HeaderItem $flex>
        <Button
          buttonText={
            currentUser?.lastName ? !isMobile && "Выйти" : !isMobile && "Войти"
          }
          iconName={isMobile && "logout"}
          iconSize={25}
          onClick={() =>
            currentUser?.lastName ? navigate("/profile") : navigate("/login")
          }
        />
        <Button
          buttonText={!isMobile && "Корзина"}
          $light
          iconName={isMobile && "basket"}
          iconSize={25}
          onClick={() => (isUser ? navigate("/basket") : navigate("/logout"))}
          counter={count > 0 && count}
        />
      </HeaderItem>
    </HeaderContainer>
  );
};

export default Header;
