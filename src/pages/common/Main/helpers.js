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

// Конвертация изображения в base64
// function encodeImageFileAsURL(element) {
//   return new Promise((resolve) => {
//     const file = element.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(file);
//   });
// }

// Конвертация изображения в base64
// const handleChange = (event) => {
//   encodeImageFileAsURL(event.target).then((base64) => {
//     console.log(base64);
//   });
// };

// <input type="file" onChange={handleChange} />
