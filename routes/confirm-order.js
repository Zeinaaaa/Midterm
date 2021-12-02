const express = require('express');
const router = express.Router();


module.exports = (db) => {
  const user_id = 1;

  router.get('/', (req, res) => {
    db.query(`select * from items`)
    .then(itemsInCart => {
      const orderArr = itemsInCart.rows;

      // insert the ordered items into the order_in_progress db
      for (const orderItem of orderArr) {
        const queryString1 = `
          insert into order_in_progress (user_id, menu_id, menu_name, price, img, quantity)
          values ($1, $2, $3, $4, $5, $6)
          returning *
        `;
        const values1 = [
          user_id,
          orderItem.menu_id,
          orderItem.menu_name,
          orderItem.price,
          orderItem.img,
          orderItem.quantity
        ];
        // console.log('values1:', values1); // for checking the work logic

        db.query(queryString1, values1)
        .then(data => {
          // console.log('confirm-order.js - data.rows:', data.rows); // for checking the work logic

          // empty items (in cart) db
          const queryString2 = `delete from items where items.menu_id = $1`
          const values2 = [orderItem.menu_id];
          db.query(queryString2, values2)
          .then(
            // console.log(`${orderItem.menu_name} deleted from cart`)  // for checking the work logic
          )
          .catch((err) => {
            console.log(err.message);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    })
    .then(data => {
      // console.log('About to render confirm.ejs') // for checking the work logic
      res.render('confirm')
    })
    .catch(err => console.log(err.message))

  })

  return router;
}
