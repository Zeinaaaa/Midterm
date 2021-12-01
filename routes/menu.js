/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//requiring twilio after installing.
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);


// this is the twilio function, can be used in any route.
const sendTextMessage = () => {
  client.messages.create({
    body: 'Hello from my cafe app',
    to: '9055167460',
    from: '+12075033250'
  }).then(message => console.log(message))
  .catch(error => console.log(error))
}


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = data.rows;
        templateVars = {menu}
        console.log("menu : ", menu);
        res.render("menu", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
