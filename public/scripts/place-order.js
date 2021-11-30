const calcPrice = (quantity, unitPrice) => {
  return unitPrice * quantity;
};

$(document).ready(function() {
  $('div.quantity').on('change', function() {
    const total = calcPrice(this.value, 10);
    $('output').html(total);
  })
})

const placeOrder = function(user_id) {
const queryString = `
  select menu_name, quantity
  from items
  where user_id like $1
`;
const value = [user_id]
return pool.query(queryString, values)
  .then((res) => {
    return res.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {placeOrder};
