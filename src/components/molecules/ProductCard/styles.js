import styled, { css } from "styled-components";

import { theme } from "@theme";
import breakpoint from "@utils/media";

export const ProductCardContainer = styled.div`
  width: 100%;
  padding: 100px 13px 0 13px;

  ${(props) =>
    props.$fewPadding &&
    css`
      padding: 5% 0;
    `}
`;

export const ProductCardHeader = styled.div`
  position: relative;
`;

export const ProductCardHeaderImg = styled.img`
  width: 100%;
  max-height: 416px;
  border-radius: 10px;
  object-fit: cover;

  @media ${breakpoint.sm} {
    height: 172px;
  }
`;

export const ProductCardImgPlate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.isProducts ? "178px" : "400px")};
  border-radius: 10px;
  background: #dfdfdf;
  margin: 2% 0 3% 0;
  cursor: pointer;
  position: relative;

  p {
    font-size: ${(props) => (props.isProducts ? "20px" : "36px")};

    @media ${breakpoint.md} {
      font-size: ${(props) => (props.isProducts ? "16px" : "26px")};
    }
    @media ${breakpoint.sm} {
      font-size: ${(props) => (props.isProducts ? "16px" : "14px")};
      margin: 10% 0 3% 0;
    }
  }

  @media ${breakpoint.sm} {
    height: ${(props) => (props.isProducts ? "178px" : "200px")};
    margin: 10% 0 3% 0;
  }
`;

export const ProductCardHeaderProductInfo = styled.div`
  background: ${theme.palette.opacity};
  border-radius: 0 50px 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  color: ${theme.palette.primary};

  p {
    font-size: 64px;
    font-weight: bold;

    @media ${breakpoint.sm} {
      font-size: 32px;
    }
  }

  span {
    font-size: 16px;
    display: flex;
    padding: 2px 0;

    @media ${breakpoint.sm} {
      font-size: 12px;
    }
  }

  ${(props) =>
    props.$isAdmin &&
    css`
      cursor: pointer;
    `}
`;

export const ProductCardItemsParent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media ${breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${breakpoint.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ProductCardItem = styled.div`
  border-radius: 10px;
  margin: 26px ${(props) => props.center && "auto"};
  width: 350px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  overflow: hidden;

  @media ${breakpoint.sm} {
    margin: 26px auto 0;
  }

  @media ${breakpoint.xss} {
    width: 300px;
  }

  &:hover {
    img,
    .opacity {
      display: flex;
      transform: scale(1.05);
    }
  }
`;

export const ProductCardItemBasketImgParent = styled.div`
  width: 100%;
  max-height: 178px;
  border-radius: 10px;
  position: relative;
`;

export const ProductCardItemImg = styled.img`
  width: 100%;
  max-height: 178px;
  border-radius: 10px;
  object-fit: cover;
`;

export const ProductCardItemBasket = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  background: ${theme.palette.opacity};

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductCardItemName = styled.p`
  font-size: 24px;
  color: ${theme.palette.primary};
  padding: 0 8px;
  font-weight: bold;
`;

export const ProductCardItemWeight = styled.p`
  font-size: 13px;
  color: ${theme.palette.disable};
  padding: 0 8px;
`;

export const ProductCardItemPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  padding: 0 8px;
  text-align: end;
  margin-bottom: 7px;
`;

export const ProductCardItemQuantity = styled.p`
  font-size: 24px;
  font-weight: bold;
  padding: 0 8px;
`;
