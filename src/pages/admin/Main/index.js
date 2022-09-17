import React from "react";

import { Page } from "@components/organisms";
import { Header, ProductCard } from "@components/molecules";
import { Button } from "@components/atoms";

function MainAdmin() {
  return (
    <Page>
      <Header />
      <ProductCard.Admin
        updateProductImage={() => console.log("updateProductImage")}
        updateProductInfo={(e) => {
          e.stopPropagation();
          console.log("updateProductInfo");
        }}
        updateProducts={() => console.log("updateProducts")}
        products={[]}
      />
    </Page>
  );
}

export default MainAdmin;
