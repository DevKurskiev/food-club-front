import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Button } from "@atoms";
import { Header, ProductCard, Modal, Form } from "@molecules";
import { Page } from "@organisms";

import { deliveryFormData } from "./helpers";

function Basket() {
  const [productItemsData, setProductItemsData] = useState();
  const currentUser = useSelector((store) => store.currentUser);
  const [payment, setPayment] = useState(0);
  const [isError, setIsError] = useState([]);
  const [isModalView, setIsModalView] = useState(false);
  const [formData, setFormData] = useState(deliveryFormData);
  const [deliveryData, setDeliveryData] = useState({
    lastName: "",
    firstName: "",
    number: "",
    address: "",
  });

  useEffect(() => {
    let prices = [];

    currentUser &&
      axios
        .post("/products/give-basket", { basket: currentUser.basket })
        .then((res) => setProductItemsData([].concat(...res.data)));

    // eslint-disable-next-line array-callback-return
    currentUser?.basket.map((el) => {
      prices.push(el.payment);
    });

    setPayment(prices.reduce((acc, number) => acc + number, 0));
  }, [currentUser]);

  const handleDeliveryData = (deliveryData) => {
    let inputError = isError;
    let formDataWithError = formData;

    // eslint-disable-next-line array-callback-return
    Object.keys(deliveryData).some((el) => {
      let index = isError.indexOf(el);

      deliveryData[el].length === 0 && !inputError.includes(el)
        ? inputError.push(el)
        : deliveryData[el].length !== 0 &&
          inputError.includes(el) &&
          inputError.splice(index, 1);
    });

    setIsError(inputError);

    formDataWithError.forEach((el) => {
      el.error = isError.includes(el.name) ? true : false;
      setFormData([...formDataWithError]);
    });

    isError.length > 0 && toast.error("Заполните все поля!");
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
      <Button
        buttonText={"Заказать за " + payment + "р"}
        $fixToRightBottom
        onClick={() => setIsModalView(true)}
      />
      <Modal
        onClick={(e) =>
          e.target.dataset.name === "container" && setIsModalView(false)
        }
        width="360px"
        none={!isModalView}
      >
        <Form
          $light
          options={deliveryFormData}
          onClick={handleDeliveryData}
          buttonText={"Оплатить " + payment + "р"}
          dataValue={deliveryData}
          setDataValue={setDeliveryData}
        />
      </Modal>
    </Page>
  );
}

export default Basket;
