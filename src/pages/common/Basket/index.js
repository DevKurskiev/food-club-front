import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Button } from "@atoms";
import { Header, ProductCard, Modal, Form } from "@molecules";
import { Page } from "@organisms";
import { countPayment } from "@helpers/countPayment";

import { deliveryFormData } from "./helpers";

function Basket() {
  const currentUser = useSelector((store) => store.currentUser);
  const [basketScore, setBasketScore] = useState(0);
  const [productItemsData, setProductItemsData] = useState(currentUser?.basket);
  const [isModalView, setIsModalView] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    lastName: "",
    firstName: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      axios
        .post("/products/give-basket", { basket: currentUser.basket })
        .then((res) => setProductItemsData([...res.data]));
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
          onClick={() => setIsModalView(true)}
        />
      )}

      <Modal width="360px" isModalShow={isModalView}>
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
