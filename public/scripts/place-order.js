const placeOrder = function(user_id) {
  const queryString = `
    SELECT menu_name, quantity
    FROM items
    WHERE user_id = $1
  `;
  const value = [user_id];
  return pool.query(queryString, value)
    .then(res => {
    // return data in format of {manu_name: quantity, menu_name: quantity}
      const data = res.rows;
      const order = {};
      data.forEach(elm => {
        order[elm.menu_name] = elm.quantity;
      });
      console.log(order);
      return order;
    })
    .catch(err => console.log(err.message));
};

module.exports = { placeOrder };
