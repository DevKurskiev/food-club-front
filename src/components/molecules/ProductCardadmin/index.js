import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";

import { Button } from "@atoms";

import {
  ProductCardHeader,
  ProductCardImgPlate,
  ProductCardHeaderProductInfo,
  ProductCardItem,
  ProductCardItemName,
  ProductCardItemWeight,
  ProductCardItemPrice,
} from "./styles";

const ProductCardAtAdmin = ({
  product,
  updateProductImage,
  updateProductInfo,
  updateProducts,
  setMyProductData,
  myProductData,
  addedKinds,
  ...rest
}) => {
  const uploader = new Uploader({
    apiKey: "free",
  });

  return (
    <ProductCardHeader>
      <UploadButton
        uploader={uploader} // Required.
        SameSite={false}
        onComplete={(files) => {
          if (files.length !== 0) {
            files.map((f) =>
              setMyProductData({ ...myProductData, avatar: f.fileUrl })
            );
          }
        }}
      >
        {({ onClick }) => (
          <ProductCardImgPlate onClick={onClick}>
            <p> Нажмите чтобы загрузите фото заведения</p>
            <ProductCardHeaderProductInfo $isAdmin onClick={updateProductInfo}>
              Добавить краткое описание
            </ProductCardHeaderProductInfo>
          </ProductCardImgPlate>
        )}
      </UploadButton>

      <Button
        $light
        jc="flex-start"
        buttonText="Добавить"
        onClick={addedKinds}
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

export default ProductCardAtAdmin;
