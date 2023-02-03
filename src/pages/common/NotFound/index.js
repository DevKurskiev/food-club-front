import React from "react";
import { useNavigate } from "react-router-dom";

import notFoundIcon from "@assets/images/notFound.png";
import { Button } from "@atoms";
import { Header } from "@molecules";

import {
  NotFoundContainer,
  NotFoundIcon,
  NotFoundItem,
  NotFoundTitle,
} from "./styles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Header isNotSearch />
      <NotFoundIcon src={notFoundIcon} />
      <NotFoundItem>
        <NotFoundTitle>
          Упс, <br /> страница не найдена
        </NotFoundTitle>
        <Button
          buttonText="Перейти к покупкам"
          onClick={() => navigate("/products")}
        />
      </NotFoundItem>
    </NotFoundContainer>
  );
};

export default NotFound;
