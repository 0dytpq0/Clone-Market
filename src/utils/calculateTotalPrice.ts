export const calculateTotalPrice = (priceString: string, order: number) => {
  const price = parseInt(priceString.replace(/[^\d]/g, ""), 10);
  const totalPrice = price * order;

  return totalPrice.toLocaleString() + "원";
};
