import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Select, Loader, Button } from "@atoms";
import * as constants from "@store/constants/index";
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
  ProductCardItemBasket,
  ProductCardItemBasketImgParent,
  ProductCardItemQuantity,
} from "./styles";

const ProductCard = ({
  product,
  productItemsData,
  isBasket,
  setProductItemsData,
  setDisableAddedProduct,
  ...rest
}) => {
  const { cafeId } = useParams();
  const dispatch = useDispatch();
  const { isMobile } = useWindowDimensions();
  const currentUser = useSelector((store) => store.currentUser);
  const productType = useSelector((store) => store.chooseProductType);
  const [basketData, setBasketData] = useState(
    currentUser?.basket?.items || []
  );

  useEffect(() => {
    setBasketData(currentUser?.basket?.items);
  }, [currentUser]);

  const handleProductsType = (e) => {
    dispatch({
      type: constants.PRODUCTTYPE,
      payload: {
        ...productType,
        category: e.target.dataset.type,
      },
    });
  };

  const handleAddedToBasket = async (id, payment) => {
    if (
      currentUser &&
      (currentUser.basket.cafeId === cafeId ||
        currentUser.basket.cafeId === null)
    ) {
      await axios
        .put("/users/added-to-basket", {
          userId: currentUser.userId,
          payment: +payment,
          cafeId,
          id,
        })
        .then((res) => {
          dispatch({
            type: constants.CURRENTUSER,
            payload: res.data,
          });
          setBasketData(res.data.basket);
        });
      setDisableAddedProduct(false);
    } else {
      setDisableAddedProduct(true);
    }
  };

  const handleUpadateQuantity = async (id, quantity) => {
    await axios
      .put("/users/update-quantity", {
        userId: currentUser.userId,
        id,
        quantity,
      })
      .then((res) => {
        dispatch({
          type: constants.CURRENTUSER,
          payload: res.data,
        });
        setBasketData(res.data.basket);
      });
  };

  return (
    <ProductCardContainer {...rest}>
      {product && (
        <ProductCardHeader>
          <ProductCardHeaderImg src={product.avatar} />
          <ProductCardHeaderProductInfo>
            <p>{product.name}</p>
            <span>{product.title}</span>
            <span>{product.address}</span>
          </ProductCardHeaderProductInfo>
        </ProductCardHeader>
      )}

      {product && (
        <Select
          onClick={handleProductsType}
          mt
          small
          options={product.kinds}
          checked={productType.category}
        />
      )}

      <ProductCardItemsParent>
        {productItemsData ? (
          productItemsData.map((el, i) => {
            if (el.type?.includes(productType.category)) {
              return (
                <ProductCardItem key={el.id + i} {...rest}>
                  <ProductCardItemBasketImgParent>
                    <ProductCardItemImg src={el.image} />
                    <ProductCardItemBasket className="opacity">
                      <Button
                        iconName="basket"
                        iconSize={25}
                        hoverNone
                        onClick={() => handleAddedToBasket(el.id, el.price)}
                        $none={basketData?.some((i) => i?.id?.includes(el.id))}
                      />
                      <Button
                        buttonText="+"
                        hoverNone
                        $none={
                          !basketData?.some(
                            (i) => i?.id?.includes(el.id) && i?.quantity > 0
                          )
                        }
                        onClick={() => handleUpadateQuantity(el.id, 1)}
                      />
                      <ProductCardItemQuantity>
                        {
                          basketData?.find((i) => i.id.includes(el.id))
                            ?.quantity
                        }
                      </ProductCardItemQuantity>
                      <Button
                        buttonText="-"
                        hoverNone
                        $none={
                          !basketData?.some(
                            (i) => i?.id?.includes(el.id) && i?.quantity > 0
                          )
                        }
                        onClick={() => handleUpadateQuantity(el.id, -1)}
                      />
                    </ProductCardItemBasket>
                  </ProductCardItemBasketImgParent>
                  <ProductCardItemName>{el.name}</ProductCardItemName>
                  <ProductCardItemWeight>{el.weight}гр</ProductCardItemWeight>
                  <ProductCardItemPrice>{el.price}₽</ProductCardItemPrice>
                </ProductCardItem>
              );
            }
            return null;
          })
        ) : (
          <Loader center={isMobile} />
        )}
      </ProductCardItemsParent>
    </ProductCardContainer>
  );
};

export default ProductCard;
