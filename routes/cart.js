const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  // direct to the /cart page and get the item list from cart db
  router.get('/', (req, res) => {
    // // check for login
    const user_id = 1;
    // if (!user_id) {
    //   res.send('Please Login');
    //   // res.redirect('/login');
    // }

    // if logged in, get the items fron cart db
    const queryString = `
      SELECT * FROM items WHERE user_id = $1 GROUP BY id
    `;
    const value = [user_id];
    return db.query(queryString, value)
    .then(itemsInCart => {
      const cart = itemsInCart.rows;
      let totPrice = 0;
      cart.forEach(elm => {
        totPrice += elm.price * elm.quantity;
      })
      const templateVars = { cart, totPrice };
      res.render('cart', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
  })

  // (try to) add item to cart db
  // maybe this part shoud be with menu?
  router.post('/', (req, res) => {
    const user_id = 1;
    // // check for login
    // if (!user_id) {
    //   res.send('Please Login');
    // }

    // if logged in, add items to db
    const queryString = `
      INSERT INTO items(user_id, menu_id, menu_name, price, quantity)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [user_id, menu_id, menu_name, price, quantity];
    return db.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.log(err.message));
  })

  return router;
};
