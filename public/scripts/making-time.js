// assume order = {menu_name: quantity}
const makingTime = (order) => {
  const unitTime = 15;
  const quantity = Object.values(order);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const totQuantity = quantity.reduce(reducer);
  return totQuantity * unitTime;
}
