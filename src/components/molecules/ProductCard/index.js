import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Select, Loader } from "@atoms";
import * as constants from "@store/constants/product";
import useWindowDimensions from "@hooks/useWindowDimensions";

import {
  ProductCardContainer,
  ProductCardHeader,
  ProductCardHeaderImg,
  ProductCardHeaderProductInfo,
  ProductCardItemsParent,
  ProductCardItem,
  ProductCardItemImg,
  ProductCardItemName,
  ProductCardItemWeight,
  ProductCardItemPrice,
} from "./styles";

// Конвертация изображения в base64
function encodeImageFileAsURL(element) {
  return new Promise((resolve) => {
    const file = element.files[0];
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const productType = useSelector((store) => store.chooseProductType);
  const { isMobile } = useWindowDimensions();

  console.log("productType", productType);

  const handleProductsType = (e) => {
    console.log(productType);
    dispatch({
      type: constants.PRODUCTTYPE,
      payload: {
        ...productType,
        category: e.target.dataset.type,
      },
    });
  };

  // Конвертация изображения в base64
  const handleChange = (event) => {
    encodeImageFileAsURL(event.target).then((base64) => {
      console.log(base64);
    });
  };

  return !product ? (
    <Loader center={isMobile} />
  ) : (
    <ProductCardContainer>
      <ProductCardHeader>
        <ProductCardHeaderImg src={product.avatar} />
        <ProductCardHeaderProductInfo>
          <p>{product.name}</p>
          <span>{product.title}</span>
          <span>{product.address}</span>
        </ProductCardHeaderProductInfo>
      </ProductCardHeader>
      {/* <input type="file" onChange={handleChange} /> */}
      <Select
        onClick={handleProductsType}
        mt
        small
        options={product.kinds}
        checked={productType.category}
      />
      <ProductCardItemsParent>
        {product.items.map((el) => {
          if (el.type?.includes(productType.category)) {
            return (
              <ProductCardItem>
                <ProductCardItemImg src={el.image} />
                <ProductCardItemName>{el.name}</ProductCardItemName>
                <ProductCardItemWeight>{el.weight}гр</ProductCardItemWeight>
                <ProductCardItemPrice>{el.price}₽</ProductCardItemPrice>
              </ProductCardItem>
            );
          }
        })}
      </ProductCardItemsParent>
    </ProductCardContainer>
  );
};

export default ProductCard;
