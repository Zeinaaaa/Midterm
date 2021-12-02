const e = require('express');
const express = require('express');
const router = express.Router();


const placeOrder = require('../public/scripts/place-order');

module.exports = (db) => {
  const user_id = 1;

  router.get('/', (req, res) => {
    const queryString1 = `
      SELECT items.user_id, img, menu_name, sum(quantity) as quantity, price
      from items
      where user_id = $1
      group by user_id, items.img, menu_name, price
    `;
    const values1 = [user_id];
    db.query(queryString1, values1)
    .then(orderData => {
      // return data in format of {manu_name: quantity, menu_name: quantity}
      const data = orderData.rows;
      const order = {};
      data.forEach(elm => {
        order[elm.menu_name] = elm.quantity;
      })
      // if cart ist empty, redirect to /cart page
      if (Object.keys(order).length == 0) {
        return res.redirect('/api/cart')
      }
      let templateVars = { data, order }

      const queryString2 = `SELECT * FROM orders WHERE user_id = $1`;
      const values2 = [user_id];
      db.query(queryString2, values2)
      .then(prevOrdersData => {
        const prevOrders = prevOrdersData.rows;
        templateVars.prevOrders = prevOrders;
        // console.log('templateVars:', templateVars);
        res.render('orders', templateVars);
      })
      .catch(err => console.log(err.message));

    })
    .catch(err => console.log(err.message));

  })

  return router;
};
