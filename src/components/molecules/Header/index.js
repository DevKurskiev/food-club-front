import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Icon, Search, Button } from "@atoms";
import useWindowDimensions from "@hooks/useWindowDimensions";
import UseUserRoles from "@hooks/useUserRoles";
import * as constants from "@store/constants/index";

import { HeaderContainer, HeaderItem, HeaderIconParent } from "./styles";

const Header = ({ isNotSearch, counter, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((store) => store.chooseProduct);
  const currentUser = useSelector((store) => store.currentUser);
  const { isMobile } = useWindowDimensions();
  const { isUser } = UseUserRoles();
  const [basketCounter, setBasketCounter] = useState(0);

  const handleProducts = (e) => {
    dispatch({
      type: constants.PRODUCT,
      payload: { ...product, name: e.target.value },
    });
  };

  useEffect(() => {
    setBasketCounter(
      currentUser?.basket?.length > 0 ? currentUser?.basket.length : false
    );
    let count = 0;

    // eslint-disable-next-line array-callback-return
    currentUser?.basket.map((el) => {
      count += el.quantity;
      setBasketCounter(count);
    });
  }, [currentUser]);

  return (
    <HeaderContainer
      $flex={!isUser}
      isMobile={isMobile}
      isNotSearch={isNotSearch}
    >
      <HeaderItem>
        <HeaderIconParent
          onClick={() =>
            isUser ? navigate("/products") : navigate("/product")
          }
        >
          <Icon name={isMobile ? "logo-mob" : "logo"} />
        </HeaderIconParent>
      </HeaderItem>
      {!isMobile && !isNotSearch && isUser && (
        <HeaderItem>
          <Search onChange={handleProducts} />
        </HeaderItem>
      )}
      <HeaderItem $flex>
        <Button
          buttonText={
            currentUser?.lastName ? currentUser?.lastName : !isMobile && "Войти"
          }
          iconName={!currentUser?.lastName && isMobile && "profile"}
          iconSize={25}
          onClick={() =>
            currentUser?.lastName ? navigate("/profile") : navigate("/login")
          }
        />
        <Button
          buttonText={!isMobile && isUser ? "Корзина" : !isMobile && "Выйти"}
          $light
          iconName={isMobile && isUser ? "basket" : isMobile && "logout"}
          iconSize={25}
          onClick={() => (isUser ? navigate("/basket") : navigate("/logout"))}
          counter={basketCounter}
        />
      </HeaderItem>
    </HeaderContainer>
  );
};

export default Header;
