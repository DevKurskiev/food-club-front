import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { ProductCard, Header, Modal } from "@molecules";
import * as constants from "@store/constants/index";
import { Button, Icon } from "@atoms";

const Product = () => {
  const [product, setProduct] = useState();
  const [productItemsData, setProductItemsData] = useState();
  const [disableAddedProduct, setDisableAddedProduct] = useState(false);
  const { cafeId } = useParams();
  const dispatch = useDispatch();
  const { foodClubUserId } = localStorage;

  useEffect(() => {
    axios.post("/products/take", { id: cafeId }).then((res) => {
      setProduct(res.data[0]);
    });
    axios.post("/products/take/find-items", { id: cafeId }).then((res) => {
      setProductItemsData(res.data[0].items);
    });
  }, [cafeId]);

  const clearBasket = () => {
    axios.put("/users/clear-basket", { userId: foodClubUserId }).then((res) => {
      dispatch({
        type: constants.CURRENTUSER,
        payload: res.data,
      });
    });
    setDisableAddedProduct(false);
  };

  return (
    <>
      <Header isNotSearch />
      <ProductCard
        center
        product={product}
        productItemsData={productItemsData}
        setDisableAddedProduct={setDisableAddedProduct}
      />
      <Modal isModalShow={disableAddedProduct}>
        <Icon
          iconSize={30}
          name={"close"}
          $rightTop
          onClick={() => setDisableAddedProduct(false)}
        />
        <Button
          buttonText={
            "Очистить корзину чтобы добавить \n товары с этого заведения?"
          }
          onClick={clearBasket}
        />
      </Modal>
    </>
  );
};

export default Product;
