function render_product_info_page() {
  let url = window.location.href.split("?");

  //VD url: index.html?product-info?0001

  let id = parseInt(url[2], 10);

  checkLocalStorageProduct();

  let product = productArray.find(element => element.id == id);

  let str =
    '<div id="page-product-container">' +
    "          " +
    '  <div id="page-product-briefing">' +
    "" +
    "    " +
    '      <div id="page-product-briefing-left">' +
    '        <img src="' + product.img +'">' +
    '        <div id="page-product-briefing-left-amount">' +
    '          <div class="btn" onclick="btn_change_amount(\'-\')">-</div>' +
    '          <div class="amount-product" data-value="1">1</div>' +
    '          <div class="btn" onclick="btn_change_amount(\'+\')">+</div>' +
    "        </div>" +
    "      </div>" +
    "" +
    "" +
    '      <div id="page-product-briefing-info">' +
    '        <div id="page-product-briefing-info-name">' +
    "          <p>" + product.name + "</p>" +
    "        </div>" +
    "        " +
    '        <div id="page-product-briefing-info-rating-stars">' +
    '          <i class="fas fa-star select"></i>' +
    '          <i class="fas fa-star select"></i>' +
    '          <i class="fas fa-star select"></i>' +
    '          <i class="fas fa-star select-haft"></i>' +
    '          <i class="fas fa-star"></i>' +
    "        </div>" +
    "" +
    '        <div id="page-product-briefing-info-price">' +
    "          <p>" + addCommaToPrice(product.price) + "</p>" +
    "        </div>" +
    "" +
    '        <div id="page-product-briefing-info-specifications">' +
    "          <p>CPU: Apple M1 Pro, 200GB/s memory bandwidth.</p>" +
    "          <p>RAM: 16 GB.</p>" +
    "          <p>Ổ cứng: 512 GB SSD.</p>" +
    "          <p>Màn hình: 16.2 inch, Liquid Retina XDR display (3456 x 2234), 120Hz.</p>" +
    "          <p>Card màn hình: Card tích hợp, 16 core-GPU.</p>" +
    "          <p>Cổng kết nối: Jack tai nghe 3.5 mm, 3 x Thunderbolt 4 USB-C, HDMI.</p>" +
    "        </div>" +
    "" +
    '        <div id="page-product-briefing-info-add-to-cart" onclick="addToCart(\''+product.id+'\')">' +
    "          Thêm vào giỏ hàng" +
    "        </div>" +
    "" +
    // '        <div id="page-product-briefing-info-buy-now">' +
    // "          Mua ngay" +
    // "        </div>" +
    "" +
    "      </div>" +
    "  </div>" +
    "" +
    "</div>";
    document.querySelector('#wrapper').innerHTML = str;
}
