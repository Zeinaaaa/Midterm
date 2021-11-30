// add an article to /cart page with a menu name and its quantity to item list in cart
$(() => {
  const loadItemList = function(menu) {
    $('#cart-item-container').append(`
        <article class="item-article" >
          <div class="checkbox"><input type="checkbox" class="item"></div>
          <div class="img"><img src="${menu.menu_img_url}" height="70px" width="auto"></div>
          <div class="name"><b>${menu.name}</b></div>
          <div class="quantity">${menu.quantity}</div>
          <div class="price">$${menu.price}</div>
        </article>`
    );
  };
 });

 const getItemsInCart = function(user_id) {
  const queryString = `
    SELECT * FROM cart WHERE user_id LIKE $1 GROUP BY id
  `;
  const value = user_id;
  return pool.query(queryString, value)
    .then(res => {
      const data = res.rows;
      $.get('/cart').then(data =>  {
        for (const elm of data) {
          loadItemList(elm);
        }
      })
    })
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
