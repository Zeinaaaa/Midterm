const getItemsInCart = function(user_id) {
  const queryString = `
    SELECT * FROM items WHERE user_id = $1 GROUP BY id
  `;
  const value = user_id;
  return pool.query(queryString, value)
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


const addItemsToCart = function(inputObj) {
  // assume inputObj in format of {user_id, maneu_id, menu_name, menu_img_url, quantity}
  if (inputObj.quantity <= 0) {
    res.status(400).send('Your quantity is 0');
    return;
  }
  const queryString = `
  INSERT INTO items(user_id, menu_id, menu_name, menu_img_url, quantity)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [
    inputObj.user_id,
    inputObj.menu_id,
    inputObj.menu_name,
    inputObj.menu_img_url,
    inputObj.quantity
  ];
  return pool.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.log(err.message));
}


module.exports = {
  getItemsInCart,
  addItemsToCart
};
