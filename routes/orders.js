const express = require('express');
const router = express.Router();


const placeOrder = require('../public/scripts/place-order');

module.exports = (db) => {
  const user_id = 1;

  router.get('/', (req, res) => {
    // load order history from orders db
    const queryString2 = `SELECT * FROM orders WHERE user_id = $1`;
    const values2 = [user_id];
    db.query(queryString2, values2)
    .then(prevOrdersData => {
      const prevOrders = prevOrdersData.rows;
      let templateVars = { prevOrders };

      // load order in progress from db
      const queryString1 = `
        SELECT order_in_progress.user_id, img, menu_name, sum(quantity) as quantity, price, making_time
        FROM order_in_progress
        WHERE user_id = $1
        GROUP BY user_id, order_in_progress.img, menu_name, price, making_time
      `;
      const values1 = [user_id];
      db.query(queryString1, values1)
      .then(orderData => {
        // return data in format of {manu_name: quantity, menu_name: quantity}
        const data = orderData.rows;
        const order = {};
        let totMakingTime = 0
        data.forEach(elm => {
          order[elm.menu_name] = elm.quantity;
          totMakingTime += elm.quantity * elm.making_time;
        })
        templateVars.data = data;
        templateVars.order = order;
        templateVars.totMakingTime = totMakingTime;
        // console.log('templateVars:', templateVars); // for checking the work logic

        // if cart is empty, render no-orders.ejs page
        // else render orders.ejs
        if (Object.keys(order).length == 0) {
          res.render('no-orders', templateVars);
        } else {
          res.render('orders', templateVars);
        }
      })
      .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
  })

  router.get('/cancel', (req, res) => {
    const queryString = `delete from order_in_progress where user_id = $1`
    const values = [user_id];
    db.query(queryString, values)
    .then(res.redirect('/api/orders'))
    .catch((err) => {
      console.log(err.message);
    });
  })

  return router;
};
