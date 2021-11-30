// add an article to /cart page with a menu name and its quantity to item list in cart

$(() => {
  const createItemList = function(menu) {
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

const loadItemList = function() {
  $.get('/cart').then(data => {
    data.forEach(elm => createItemList(elm))
  })
}

module.exports = { loadItemList };
