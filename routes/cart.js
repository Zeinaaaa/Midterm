const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  // direct to the /cart page and get the item list from cart db
  const user_id = 1;

  router.get('/', (req, res) => {
    // get the items from cart db
    const queryString = `
      SELECT items.user_id, img, menu_name, sum(quantity) as quantity, price
      from items
      where user_id = $1
      group by user_id, items.img, menu_name, price
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
      // console.log('cart.js - templateVars:', templateVars);
      res.render('cart', templateVars);
    })
    .catch((err) => {
      console.log(err.message);
    });
  })

  // add an item to cart
  router.post('/:menu_id', (req, res) => {
    // get data of item to be added
    // console.log(req.body)
    // console.log(req.params)
    const menu_id = req.params.menu_id;
    const quantity = req.body.quantity;
    const queryString1 = `SELECT * FROM menu WHERE id = $1`
    const values1 = [menu_id];
    db.query(queryString1, values1)
      .then(data => {
        const selectedMenu = data.rows[0];
        selectedMenu.quantity = quantity;
        // console.log('cart.js - selectedMenu:', selectedMenu)

        const queryString2 = `
          insert into items (user_id, menu_id, menu_name, price, img, quantity)
          values ($1, $2, $3, $4, $5, $6)
          returning *
        `;
        const values2 = [
          user_id,
          selectedMenu.id,
          selectedMenu.name,
          selectedMenu.price,
          selectedMenu.img,
          selectedMenu.quantity
        ]
        db.query(queryString2, values2)
        .then(data => {
          // console.log('cart.js - data.rows:', data.rows);
          res.redirect('../menu');
        })
        .catch((err) => {
          console.log(err.message);
        });

      })
      .catch((err) => {
        console.log(err.message);
      });
  })

  router.get('/clear', (req, res) => {
    const queryString = `delete from items where user_id = $1`
    const values = [user_id];
    db.query(queryString, values)
    .then(res.redirect('/api/cart'))
    .catch((err) => {
      console.log(err.message);
    });
  })

  return router;
};
