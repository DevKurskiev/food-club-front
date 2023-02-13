import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Page } from "@components/organisms";
import { Header, ProductCard } from "@components/molecules";
import { Button } from "@components/atoms";

import {
  AddedProductInfo,
  AddedProduct,
  AddedKinds,
  productData,
} from "./helpers";

function MainAdmin() {
  const [myProductData, setMyProductData] = useState(productData);
  const [infoModalHide, setInfoModalHide] = useState(true);
  const [addedProductModalHide, setAddedProductModalHide] = useState(true);
  const [addedKindsModalHide, setAddedKindsModalHide] = useState(true);

  const handleAddedProduct = () => {
    let isEmpty;
    toast.dismiss();

    Object.keys(myProductData).some((el) => myProductData[el].length <= 0)
      ? (isEmpty = true)
      : (isEmpty = false);

    isEmpty
      ? toast.error("Заполните весь профиль!")
      : toast.success("Вы успешно сохранили профиль!");
  };

  return (
    <Page>
      <ToastContainer />
      <Header />
      <ProductCard.Admin
        updateProductImage={() => console.log("updateProductImage")}
        updateProductInfo={(e) => {
          e.stopPropagation();
          setInfoModalHide(false);
        }}
        addedKinds={() => setAddedKindsModalHide(false)}
        updateProducts={() => setAddedProductModalHide(false)}
        products={[]}
        myProductData={myProductData}
        setMyProductData={setMyProductData}
      />

      <Button
        onClick={handleAddedProduct}
        buttonText="Сохранить"
        $fixToRightBottom
      />
      <AddedProductInfo
        myProductData={myProductData}
        setMyProductData={setMyProductData}
        none={infoModalHide}
        setInfoModalHide={setInfoModalHide}
      />
      <AddedProduct
        myProductData={myProductData}
        setMyProductData={setMyProductData}
        none={addedProductModalHide}
        setAddedProductModalHide={setAddedProductModalHide}
      />
      <AddedKinds
        myProductData={myProductData}
        setMyProductData={setMyProductData}
        none={addedKindsModalHide}
        setAddedKindsModalHide={setAddedKindsModalHide}
      />
    </Page>
  );
}

export default MainAdmin;
