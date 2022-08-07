export const productItemsType = (productType) => {
  return [
    {
      type: "all",
      value: "Все",
      // checked: productType.category === "all",
    },
    {
      type: "popular",
      value: "Популярное",
      // checked: productType.category === "popular",
    },
    {
      type: "meat",
      value: "Мясное",
      // checked: productType.category === "meat",
    },
    {
      type: "dessert",
      value: "Десерты",
      // checked: productType.category === "dessert",
    },
    {
      type: "drink",
      value: "Напитки",
      // checked: productType.category === "drink",
    },
  ];
};
