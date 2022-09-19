import { useState } from "react";

import { Modal, Form } from "@components/molecules";

export const productData = {
  avatar: "",
  name: "",
  title: "",
  address: "",
  items: [],
  kinds: [],
};

export const AddedProductInfo = ({
  myProductData,
  setMyProductData,
  none,
  setInfoModalHide,
}) => {
  const [productData, setProductData] = useState({
    name: "",
    firstName: "",
    address: "",
  });

  const productFormData = [
    { placeholder: "Название заведения", type: "text", name: "name" },
    { placeholder: "Краткое описание", type: "text", name: "title" },
    { placeholder: "Адрес заведения", type: "text", name: "address" },
  ];

  const updateInfo = (productData) => {
    const name = productData.name;
    const title = productData.title;
    const address = productData.address;

    setMyProductData({ ...myProductData, name, title, address });
    setInfoModalHide(true);
  };

  return (
    <Modal
      onClick={(e) =>
        e.target.dataset.name === "container" && setInfoModalHide(true)
      }
      none={none}
      width="400px"
    >
      <Form
        $light
        options={productFormData}
        onClick={updateInfo}
        buttonText={"Сохранить"}
        dataValue={productData}
        setDataValue={setProductData}
      />
    </Modal>
  );
};

export const AddedProduct = ({
  none,
  setAddedProductModalHide,
  myProductData,
  setMyProductData,
}) => {
  const [productData, setProductData] = useState({
    image: "",
    weight: "",
    price: "",
    type: [],
  });
  const productFormData = [
    { placeholder: "Изображение", type: "file", name: "image" },
    { placeholder: "Вес", type: "text", name: "weight" },
    { placeholder: "Цена", type: "text", name: "price" },
    {
      placeholder: "Категория: популярное, мясное...",
      type: "text",
      name: "type",
    },
  ];

  const updateProduct = (productData) => {
    const weight = productData.weight;
    const price = productData.price;
    const type = productData.type.split(",").map((el) => el.trim());

    setMyProductData({
      ...myProductData,
      items: { weight, price, type },
    });
    setAddedProductModalHide(true);
  };

  return (
    <Modal
      onClick={(e) =>
        e.target.dataset.name === "container" && setAddedProductModalHide(true)
      }
      none={none}
      width="400px"
    >
      <Form
        $light
        options={productFormData}
        onClick={updateProduct}
        buttonText={"Сохранить"}
        dataValue={productData}
        setDataValue={setProductData}
        handleAddedImage={(f) =>
          setMyProductData({
            ...myProductData,
            items: { ...myProductData.items, image: f.fileUrl },
          })
        }
      />
    </Modal>
  );
};

export const AddedKinds = ({
  none,
  setAddedKindsModalHide,
  myProductData,
  setMyProductData,
}) => {
  const [productKinds, setProductKinds] = useState({
    kinds: [],
  });

  const addedKindsProduct = (kindsData) => {
    const kinds = kindsData.kinds.split(",").map((el) => el.trim());

    setMyProductData({ ...myProductData, kinds });
    setAddedKindsModalHide(true);
  };

  return (
    <Modal
      onClick={(e) =>
        e.target.dataset.name === "container" && setAddedKindsModalHide(true)
      }
      none={none}
      width="400px"
    >
      <Form
        $light
        onClick={addedKindsProduct}
        options={[
          {
            placeholder: "Категории: популярное, мясное...",
            type: "text",
            name: "kinds",
          },
        ]}
        buttonText={"Сохранить"}
        dataValue={productKinds}
        setDataValue={setProductKinds}
      />
    </Modal>
  );
};
