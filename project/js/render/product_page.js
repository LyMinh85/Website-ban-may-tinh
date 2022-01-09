function openSanPhamPage() {
  let navbar = document
    .querySelector(".header-navbar")
    .querySelectorAll(".item");
  navbar.forEach((element) => {
    if (element.dataset.link == "products") element.classList.add("active");
    else element.classList.remove("active");
  });


  let url = window.location.href.split('&')[2];
  let priceFrom;
  let priceTo;
  if(url == undefined)
  {
    priceFrom = "";
    priceTo = "";
  }
  else
  {
    url = url.split('-');
    
    priceFrom = url[0];
    priceTo = url[1];
  }

    
  let str =
    '<div class="page-product-container">' +
    '<div class="filter">' +
    '    <div class="filter-header">Bộ lọc</div>' +
    displayBrand() +
    '    <div class="filter-with-price">' +
    "      <div>Khoảng giá</div>" +
    '      <input type="text" onkeyup="addCommaNumberFormat(0)" value="' + addCommaToPrice(priceFrom)  + '" placeholder="Từ">' +
    '      <input type="text" onkeyup="addCommaNumberFormat(1)" value="' + addCommaToPrice(priceTo) + '" placeholder="Đến">' +
    '      <div class="error-text"></div>' +
    "    </div>" +
    '    <div class="filter-btn" onclick="checkKhoangGia()">Lọc</div>' +
    "</div>" +
    '<div class="page-product-list-wrapper">' +
    '  <div class="headline">' +
    "    <h3>Sản phẩm</h3>" +
    "  </div>" +
    '  <ul class="products">' +
    "  </ul>" +
    '  <div class="page-container">' +
    "  </div>" +
    '</div>' +
    '</div>';
  document.getElementById("wrapper").innerHTML = str;

  // document.querySelector('.dropdown').addEventListener('click', function(){
  //   document.querySelector('.dropdown').querySelector('.dropdown-content').classList.toggle('show');
  // });
  showListProductInShop();
}

//Hiển thị list product trong mục sản phẩm ở trang chủ
function showListProductInShop() {
  checkLocalStorageProduct();

  //Lấy nội dung tách ra sau ? của url
  let url = window.location.href;
  let str = url.split("?");

  //Tách tiếp theo dấu & str[0] là brand, str[1] là số trang
  str = str[2].split("&");

  //Chèn tựa đề brand nếu có lọc còn không ghi sản phẩm
  let cartegory = str[0];
  let currentPage = parseInt(str[1], 10);
  if (cartegory == "sanpham")
    document.querySelector(".headline").innerHTML =
      "<h3>" + "Sản phẩm" + "</h3>";
  else
    document.querySelector(".headline").innerHTML =
      "<h3>" + cartegory + "</h3>";

  //Thêm class active vào icon brand để biết đang lọc theo brand nào
  let a_item = document
    .querySelector(".list-categories")
    .querySelectorAll(".item");

  if(str[0] == "sanpham")
    a_item[0].classList.add("active");

  a_item.forEach(function (element) {
    if (element.dataset.brand == cartegory) element.classList.add("active");
  });

  let s = "";
  let numberProcducts = 0;
  let filterProducts = [];

  let priceFrom;
  let priceTo;

  if (str[2] != undefined) 
  {
    let filterPrice = str[2].split("-");

    priceFrom = parseInt(filterPrice[0], 10);
    priceTo = parseInt(filterPrice[1], 10);

        //đếm số sản phẩm cần xuất
        for (let i = productArray.length - 1; i >= 0; i--) 
        {
          //Ko có lọc thì lấy hết, nếu lọc thì so sánh với brand của sản phẩm
          if (
            (str[0] == productArray[i].brand ||
            str[0] == "sanpham") &&
            (productArray[i].price >= priceFrom && productArray[i].price <= priceTo)
          ) {

            filterProducts.push(productArray[i]);
            numberProcducts++;
          }
        }
  } 
  else 
  {
    //đếm số sản phẩm cần xuất
    for (let i = productArray.length - 1; i >= 0; i--) 
    {
      //Ko có lọc thì lấy hết, nếu lọc thì so sánh với brand của sản phẩm
      if (
        str[0] == productArray[i].brand ||
        str[0] == "sanpham"
      ) {
        filterProducts.push(productArray[i]);
        numberProcducts++;
      }
    }
  }

  if(filterProducts.length == 0)
  {
      begin = 0;
      end = 0;
      document.querySelector(".products").style.display = "block";
      s += 
      '<div style="height: 50%; width: 50%; margin: 0 auto;">'+
      '<img src="Picture/Help.png" style="height: 100%; width: 100%;">'
      '</div>';
  }
  else
  {

  //localStorage.getItem("filterProducts") === null ? localStorage.setItem(JSON.parse(filterProducts)) : [];

  //Tính toán các sản phẩm nào xuất ra trong trang này
  
  console.log("Current page = " + currentPage);
  let numberProcductInOnePage = 8;
  let begin = (currentPage - 1) * numberProcductInOnePage + 1;
  let end = currentPage * numberProcductInOnePage;
  console.log(begin + " " + end);

  for (let i = begin - 1;i <= Math.min(end - 1, filterProducts.length - 1);i++) {
    //Ko có lọc thì lấy hết, nếu lọc thì so sánh với brand của sản phẩm
    s +=
      "<li>" +
      '<div class="">' +
      '<div class="product-top">' +
      '<a href="?product-info?' +
      filterProducts[i].id +
      '" class="product thumb">' +
      '<img src="' +
      filterProducts[i].img +
      '" alt="">' +
      "</a>" +
      "</div>" +
      '<div class="product-info">' +
      '<a href="?product-info?' +
      filterProducts[i].id +
      '" class="product-cat">' +
      filterProducts[i].brand +
      "</a>" +
      '<a href="?product-info?' +
      filterProducts[i].id +
      '" class="product-name">' +
      filterProducts[i].name +
      "</a>" +
      '<div class="product-price">' +
      addCommaToPrice(filterProducts[i].price) +
      "đ</div>" +
      "</div>" +
      " </div>" +
      "</li>";
  }
}

  //Inner chuỗi html vào list sản phẩm
  let listProduct = document.querySelector(".products");
  listProduct.innerHTML = s;

  console.log("Current page = " + currentPage);
  //Tính toán chia số trang
  let numberPage = numberProcducts / 8;
  let contentPageNumber = "";

  console.log("str[2] = " + str[2]);
  if(str[2] == undefined)
  {
    for (let i = 0; i < numberPage; i++) {
      //Theo định dang <li class="page-number"><a href="?product?brand&i"></a></li>
      //Nếu là trang hiện tại thì thêm class select
      console.log(currentPage);
      if (currentPage == (i + 1))
        contentPageNumber += '<li class="page-number select">' +
          ' <a href="?product?' + cartegory + "&" + (i + 1) + '">' + (i + 1) +
          "</a> " +"</li>";
      else
        contentPageNumber +=
          '<li class="page-number">' +
          ' <a href="?product?' +
          cartegory +
          "&" +
          (i + 1) +
          '">' +
          (i + 1) +
          "</a> " +
          "</li>";
    }
  }
  else
  {
    for (let i = 0; i < numberPage; i++) {
      //Theo định dang <li class="page-number"><a href="?product?brand&i&10-100000"></a></li>
      //Nếu là trang hiện tại thì thêm class select
      console.log("enter");
      if (currentPage == (i + 1))
        contentPageNumber += '<li class="page-number select">' +
          ' <a href="?product?' + cartegory + "&" + (i + 1) + '&' + priceFrom + '-' + priceTo + '">' + (i + 1) +
          "</a> " +"</li>";
      else
        contentPageNumber +=
          '<li class="page-number">' +
          ' <a href="?product?' + cartegory + "&" + (i + 1)  + '&' + priceFrom + '-' + priceTo + '">' + (i + 1) + "</a> " + "</li>";
    }
  }


  //inner kết quả vào html
  contentPageNumber = "<ul>" + contentPageNumber + " </ul>";
  document.querySelector(".page-container").innerHTML = contentPageNumber;
}

//Trả về chuỗi html để hiển thị các hãng
function displayBrand() {
  checkLocalStorageProduct();
  let s = 
  ' <div class="list-categories-header">Hãng</div>' +
  '<div class="list-categories">' +
  '<a href="?product?sanpham&1" class="item"> Tất cả (' +
  productArray.length +
  ") </a>";

  for (let i = 0; i < productArray.length; i++) {
    for (let j = 0; j < brandArray.length; j++) {
      if (productArray[i].brand == brandArray[j].name) {
        brandArray[j].amount++;
        break;
      }
    }
  }

  for (let index = 0; index < brandArray.length; index++) {
    let temp =
      '<a href="?product?' +
      brandArray[index].name +
      '&1" class="item" data-brand="' +
      brandArray[index].name +
      '">' +
      brandArray[index].name +
      " (" +
      brandArray[index].amount +
      ") </a>";
    s += temp;
  }

  s += "  </div>";

  return s;
}

function renderFilter() {
  let s = '<div class="filter">';
}
