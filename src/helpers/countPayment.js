export const countPayment = (currentUser) => {
  let count = 0;

  currentUser.basket?.items.forEach((el) => {
    count += el.payment * (el.quantity || 1);
  });

  return count;
};
