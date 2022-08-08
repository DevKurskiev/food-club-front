import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Search, Select, Loader, Button } from "@atoms";
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
  ProductCardItemBasket,
  ProductCardItemBasketImgParent,
  ProductCardItemQuantity,
} from "./styles";

const ProductCard = ({ product }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const productType = useSelector((store) => store.chooseProductType);
  const basketCounter = useSelector((store) => store.basketCounter);
  const { isMobile } = useWindowDimensions();
  const productId = params.id;

  const [productItemsData, setProductItemsData] = useState();
  const [basketData, setBasketData] = useState([]);

  useEffect(() => {
    console.log(basketCounter);
  }, [basketCounter]);

  useEffect(() => {
    axios.post("/products/take/find-items", { id: productId }).then((res) => {
      setProductItemsData(res.data[0].items);
    });

    axios.get("/basket/get-from-basket").then((res) => {
      setBasketData(res.data[0].inBasket);

      let counter = res.data[0].inBasket
        .map((el) => el.quantity)
        .reduce((el, x) => el + x);

      dispatch({
        type: constants.BASKETCOUNTER,
        payload: counter,
      });
    });
  }, []);

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
    setBasketData([...basketData, { id: [id], quantity: 1 }]);

    await axios.post("/basket/added-to-basket", {
      id,
      quantity: 1,
    });

    axios.get("/basket/get-from-basket").then((res) => {
      let counter = res.data[0].inBasket
        .map((el) => el.quantity)
        .reduce((el, x) => el + x);

      dispatch({
        type: constants.BASKETCOUNTER,
        payload: counter,
      });
    });
  };

  const handleUpadatequantity = async (e, id) => {
    const quantity = basketData.find((item) => item.id.includes(id))?.quantity;
    const type = e.target.dataset.type;

    await axios.post("/basket/update-quantity", {
      id: id,
      quantity:
        type === "increment"
          ? quantity + 1
          : type === "decrement" && quantity - 1,
    });

    axios.get("/basket/get-from-basket").then((res) => {
      setBasketData(res.data[0].inBasket);

      let counter =
        res.data[0].inBasket.length > 0
          ? res.data[0].inBasket
              .map((el) => el.quantity)
              .reduce((el, x) => el + x)
          : 0;

      dispatch({
        type: constants.BASKETCOUNTER,
        payload: counter,
      });
      console.log("counter", counter);
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
                        data-type="increment"
                        hoverNone
                        $none={!basketData?.some((i) => i?.id?.includes(el.id))}
                        onClick={(e) => handleUpadatequantity(e, el.id)}
                      />
                      <ProductCardItemQuantity>
                        {basketData.find((i) => i.id.includes(el.id))?.quantity}
                      </ProductCardItemQuantity>
                      <Button
                        buttonText="-"
                        data-type="decrement"
                        hoverNone
                        $none={!basketData?.some((i) => i?.id?.includes(el.id))}
                        onClick={(e) => handleUpadatequantity(e, el.id)}
                      />
                    </ProductCardItemBasket>
                  </ProductCardItemBasketImgParent>
                  <ProductCardItemName>{el.name}</ProductCardItemName>
                  <ProductCardItemWeight>{el.weight}гр</ProductCardItemWeight>
                  <ProductCardItemPrice>{el.price}₽</ProductCardItemPrice>
                </ProductCardItem>
              );
            }
          })
        ) : (
          <Loader center={isMobile} />
        )}
      </ProductCardItemsParent>
    </ProductCardContainer>
  );
};

export default ProductCard;
