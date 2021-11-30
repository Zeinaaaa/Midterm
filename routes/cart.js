const express = require('express');
const router  = express.Router();

const getItemsInCart = require('../public/scripts/items-in-cart');
const addItemsToCart = require('../public/scripts/items-in-cart')
const placeOrder = require('../public/scripts/place-order');


module.exports = (db) => {
 // direct to the /cart page and get the item list from cart db
 router.get('/', (req, res) => {
   // check for login
   const user_id = req.session.user_id;
   if (!user_id) {
     res.send('Please Login');
     // res.redirect('/login');
   }
   // if logged in, get the items fron cart db using getItemsInCart()
   db.getItemsInCart(user_id)
     .then(res => {
      res.render('/cart');
     })
     .catch(err => console.log(err.message));

 })

 router.post('/', (req, res) => {
   const user_id = req.session.user_id;
   // check for login
   if (!user_id) {
     res.send('Please Login');
   }
   // if logged in, get the total amount of money
   // get res.rows[0] from placeOrder()
   db.placeOrder(user_id)
     .then(data => {
       // return data in format of {manu_name: quantity, menu_name: quantity}
       const order = {};
       data.forEach(elm => {
         order.elm.menu_name = elm.quantity;
       })
       return order;
     })
     .catch(err => console.log(err.message));
 })

return router;
};
