// assume order = {menu_name: quantity}
const makingTime = (order) => {
  const unitTime = 10;
  const quantityArr = Object.values(order);
  let totQuantity = 0
  quantityArr.forEach(elm => {
    totQuantity += Number(elm)
  })
  return totQuantity * unitTime;
}

module.exports = { makingTime };
