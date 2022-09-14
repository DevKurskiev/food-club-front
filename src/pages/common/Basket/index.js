import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Button } from "@atoms";
import { Header, ProductCard } from "@molecules";
import { Page } from "@organisms";

function Basket() {
  const [productItemsData, setProductItemsData] = useState();
  const currentUser = useSelector((store) => store.currentUser);
  const [payment, setPayment] = useState(0);

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

  return (
    <Page $withoutPadding>
      <Header />
      <ProductCard
        center
        isBasket
        $fewPadding
        productItemsData={productItemsData}
      />
      <Button buttonText={"Заказать за " + payment + "р"} $fixToRightBottom />
    </Page>
  );
}

export default Basket;
