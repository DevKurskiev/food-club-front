export const productCategory = (product) => {
  return [
    {
      type: "cafe",
      value: "Заведения",
      checked: product.category === "cafe",
    },
    {
      type: "shop",
      value: "Магазины",
      checked: product.category === "shop",
    },
  ];
};
