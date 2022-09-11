import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Search, Select, Loader, Button } from "@atoms";
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

const ProductCard = ({ product }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const productType = useSelector((store) => store.chooseProductType);
  const currentUser = useSelector((store) => store.currentUser);
  const { isMobile } = useWindowDimensions();
  const productId = params.id;

  const [productItemsData, setProductItemsData] = useState();
  const [basketData, setBasketData] = useState(currentUser?.basket || []);

  useEffect(() => {
    axios.post("/products/take/find-items", { id: productId }).then((res) => {
      setProductItemsData(res.data[0].items);
    });
  }, [productId]);

  useEffect(() => {
    setBasketData(currentUser?.basket);
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

  const handleAddedToBasket = async (id) => {
    axios
      .post("/users/added-to-basket", { userId: currentUser?.userId, id })
      .then((res) => {
        dispatch({
          type: constants.CURRENTUSER,
          payload: res.data,
        });
        setBasketData(res.data.basket);
      });
  };

  const handleUpadateQuantity = async (e, id, action) => {
    const quantity =
      action === "increment"
        ? basketData.find((el) => el.id === id).quantity + 1
        : basketData.find((el) => el.id === id).quantity - 1;

    axios
      .post("/users/update-quantity", {
        userId: currentUser?.userId,
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

      <Select
        onClick={handleProductsType}
        mt
        small
        options={product.kinds}
        checked={productType.category}
      />

      {isMobile && <Search />}

      <ProductCardItemsParent>
        {productItemsData ? (
          productItemsData.map((el, i) => {
            if (el.type?.includes(productType.category)) {
              return (
                <ProductCardItem key={el.id}>
                  <ProductCardItemBasketImgParent>
                    <ProductCardItemImg src={el.image} />
                    <ProductCardItemBasket className="opacity">
                      <Button
                        iconName="basket"
                        iconSize={25}
                        hoverNone
                        onClick={(e) => handleAddedToBasket(el.id)}
                        $none={basketData?.some((i) => i?.id?.includes(el.id))}
                      />
                      <Button
                        buttonText="+"
                        hoverNone
                        $none={!basketData?.some((i) => i?.id?.includes(el.id))}
                        onClick={(e) =>
                          handleUpadateQuantity(e, el.id, "increment")
                        }
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
                        $none={!basketData?.some((i) => i?.id?.includes(el.id))}
                        onClick={(e) =>
                          handleUpadateQuantity(e, el.id, "decrement")
                        }
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
