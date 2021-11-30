const calcPrice = (quantity, unitPrice) => {
  return unitPrice * quantity;
 };

 const placeOrder = function(user_id) {
  const queryString = `
    select menu_name, quantity
    from items
    where user_id like $1
  `;
  const value = [user_id]
  return pool.query(queryString, values)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
 };

 module.exports = {placeOrder};
