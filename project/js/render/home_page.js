function openHomePage() {
  let navbar = document
    .querySelector(".header-navbar")
    .querySelectorAll(".item");
  navbar.forEach((element) => {
    if (element.dataset.link == "home") element.classList.add("active");
  });

  // document.getElementById('wrapper').innerHTML = '<div class="headline"><h3>TRANG CHỦ</h3>' +
  // '<div style="height: 50%; width: 50%; margin: 0 auto;">'+
  // '<img src="Picture/Help.png" style="height: 100%; width: 100%;">' +
  // '</div>' + '</div>';

  let str = "";
  for(let i = 0; i < brandArray.length; i++)
  {
    let count = 0;
    str += 
    '<div class="box-list">' +
    '<div class="box-title">' +
    brandArray[i].name +
    "</div>" +
    '<a href="?product?' + brandArray[i].name + '&1" class="show-all-products">Xem tất cả</a>' + 
    '  <ul class="products">';
    for(let j = 0; j < productArray.length; j++)
    {

        if(brandArray[i].name == productArray[j].brand)
        {
            if(count == 4)
                break;
            str +=
            "    <li>" +
            '      <div class="">' +
            '        <div class="product-top">' +
            '          <a href="?product-info?' + productArray[j].id + '" class="product thumb">' +
            '            <img src="' + productArray[j].img + '" alt="">' +
            "          </a>" +
            '        </div><div class="product-info">' +
            '          <a href="?product-info?' + productArray[j].id + '" class="product-cat">' + productArray[j].brand + '</a>' +
            '          <a href="?product-info?' + productArray[j].id + '" class="product-name">' + productArray[j].name + '</a>' +
            '          <div class="product-price">' + addCommaToPrice(productArray[j].price) + '</div>' +
            "        </div>" +
            "      </div>" +
            "    </li>";
            count++;
        }

    }
    str +=     
    "  </ul>";
    '</div>'
}

    document.querySelector('.home-content').innerHTML = str;


}
