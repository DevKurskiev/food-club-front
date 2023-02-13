import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Button, Icon } from "@atoms";
import { Header, ProductCard, Modal, Form } from "@molecules";
import { Page } from "@organisms";
import { countPayment } from "@helpers/countPayment";

import { deliveryFormData } from "./helpers";

function Basket() {
  const currentUser = useSelector((store) => store.currentUser);
  const [basketScore, setBasketScore] = useState(0);
  const [productItemsData, setProductItemsData] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    lastName: "",
    firstName: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    console.log(currentUser.lastName);
    if (currentUser.userId) {
      const cafeId = currentUser.basket.cafeId;
      const ids = currentUser.basket.items.map((el) => el.id);
      axios
        .post("/products/give-basket", { cafeId, ids })
        .then((res) => setProductItemsData(res.data));
      setBasketScore(countPayment(currentUser));
    }
  }, [currentUser]);

  const handleDeliveryData = (deliveryData) => {
    let isError = Object.values(deliveryData).includes("");

    if (isError) {
      toast.error("Заполните все поля!");
    }
  };

  return (
    <Page $withoutPadding>
      <ToastContainer />
      <Header />
      <ProductCard
        center
        isBasket
        $fewPadding
        productItemsData={productItemsData}
      />

      {basketScore !== 0 && (
        <Button
          buttonText={"Заказать за " + basketScore + "р"}
          $fixToRightBottom
          onClick={() => setIsModalShow(true)}
        />
      )}

      <Modal width="360px" isModalShow={isModalShow}>
        <Icon
          iconSize={30}
          name={"close"}
          $rightTop
          onClick={() => setIsModalShow(false)}
        />
        <Form
          $light
          options={deliveryFormData}
          onClick={handleDeliveryData}
          buttonText={"Оплатить " + basketScore + "р"}
          dataValue={deliveryData}
          setDataValue={setDeliveryData}
        />
      </Modal>
    </Page>
  );
}

export default Basket;
