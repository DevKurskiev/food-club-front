import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Search, Select, Loader, Button } from "@atoms";
import * as constants from "@store/constants/index";
import useWindowDimensions from "@hooks/useWindowDimensions";

import {
  ProductCardContainer,
  ProductCardHeader,
  ProductCardHeaderImg,
  ProductCardImgPlate,
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

const ProductCardAtAdmin = ({
  product,
  updateProductImage,
  updateProductInfo,
  updateProducts,
  ...rest
}) => {
  return (
    <ProductCardHeader>
      <ProductCardImgPlate onClick={updateProductImage}>
        <p> Нажмите чтобы загрузите фото заведения</p>
        <ProductCardHeaderProductInfo $isAdmin onClick={updateProductInfo}>
          Добавить краткое описание
        </ProductCardHeaderProductInfo>
      </ProductCardImgPlate>

      <Button
        $light
        jc="flex-start"
        buttonText="Добавить"
        onClick={(e) => console.log(e.target)}
      />

      <ProductCardItem {...rest}>
        <ProductCardImgPlate isProducts onClick={updateProducts}>
          Нажмите чтобы редактировать
        </ProductCardImgPlate>
        <ProductCardItemName>Название</ProductCardItemName>
        <ProductCardItemWeight>Вес</ProductCardItemWeight>
        <ProductCardItemPrice>Цена</ProductCardItemPrice>
      </ProductCardItem>
    </ProductCardHeader>
  );
};

const ProductCard = ({
  product,
  productItemsData,
  isBasket,
  setProductItemsData,
  ...rest
}) => {
  const dispatch = useDispatch();
  const productType = useSelector((store) => store.chooseProductType);
  const currentUser = useSelector((store) => store.currentUser);
  const { isMobile } = useWindowDimensions();
  const [basketData, setBasketData] = useState(currentUser?.basket || []);

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

  const handleAddedToBasket = async (id, payment) => {
    axios
      .post("/users/added-to-basket", {
        userId: currentUser?.userId,
        id,
        payment: +payment,
      })
      .then((res) => {
        dispatch({
          type: constants.CURRENTUSER,
          payload: res.data,
        });
        setBasketData(res.data.basket);
      });
  };

  const handleUpadateQuantity = async (e, id, action, payment) => {
    const thisProduct = basketData.find((el) => el.id === id);
    const quantity =
      action === "increment"
        ? thisProduct.quantity + 1
        : thisProduct.quantity - 1;

    axios
      .post("/users/update-quantity", {
        userId: currentUser?.userId,
        id,
        quantity,
        payment: +quantity * +payment,
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

      {isMobile && !isBasket && <Search />}

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
                        $none={!basketData?.some((i) => i?.id?.includes(el.id))}
                        onClick={(e) =>
                          handleUpadateQuantity(e, el.id, "increment", el.price)
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
                          handleUpadateQuantity(e, el.id, "decrement", el.price)
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

ProductCard.Admin = ProductCardAtAdmin;

export default ProductCard;
