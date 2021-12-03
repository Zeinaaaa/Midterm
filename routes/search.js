const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.post('/', (req, res) => {
    // get search key word from search box
    const searchKeyWord = req.body.q;
    // console.log('searchKeyWord:', searchKeyWord) // checking

    const queryString = `
      select * from menu
      where name like $1
      or components like $1
      or type like $1
    `;
    const value = [`%${searchKeyWord}%`];
    return db.query(queryString, value)
      .then(searchResult => {
      // console.log(searchResult.rows) // check for search result (array of obj)
        const foundMenu = searchResult.rows;
        const templateVars = { foundMenu };
        res.render('search-result', templateVars);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return router;
};
