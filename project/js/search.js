document.querySelector("#home-searchbar").addEventListener("keyup", function(event)
{
    if(event.keyCode === 13)
        changeUrl();
});

function changeUrl()
{
    let input = document.querySelector("#home-searchbar");

    console.log("hi");
    
    window.location.href = "?" + "search?" +  input.value + "&1";
}

//Thanh tìm kiếm trong home và product page
function render_search_page() {
    let url = window.location.href;

    //VD: index.html?search?asd&1
    let input = url.split("?")[2];

    //Tách theo & tiếp
    input = input.split("&");

    let url1 = window.location.href.split('&')[2];
    let priceFrom;
    let priceTo;
    if(url1 == undefined)
    {
      priceFrom = "";
      priceTo = "";
    }
    else
    {
      url1 = url1.split('-');
      
      priceFrom = url1[0];
      priceTo = url1[1];
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
    

    let filterProducts = [];


    let d = 0;

    //Nếu có tìm theo khoảng giá
    if (input[2] != undefined) 
    {
      let filterPrice = input[2].split("-");

      priceFrom = parseInt(filterPrice[0], 10);
      priceTo = parseInt(filterPrice[1], 10);


      for(let i = 0; i < productArray.length; i++)
      {
          if(productArray[i].name.toUpperCase().indexOf(input[0].toUpperCase()) != -1 || productArray[i].brand.toUpperCase().indexOf(input[0].toUpperCase()) != -1)
          {
              if(productArray[i].price >= priceFrom && productArray[i].price <= priceTo)
                 filterProducts.push(productArray[i]);
          }
      }
    }
    else
    {
      for(let i = 0; i < productArray.length; i++)
      {
          if(productArray[i].name.toUpperCase().indexOf(input[0].toUpperCase()) != -1 ||
             productArray[i].brand.toUpperCase().indexOf(input[0].toUpperCase()) != -1)
            filterProducts.push(productArray[i]);
      }
    }


    console.log(filterProducts);


    let s = '';
  
    //Tính toán các sản phẩm nào xuất ra trong trang này
    let currentPage = parseInt(input[1], 10);
    let numberProcductInOnePage = 8;
    let begin = (currentPage - 1) * numberProcductInOnePage + 1;
    let end = (currentPage) * numberProcductInOnePage;
    console.log(begin  + " " + end);

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
      for(let i = begin - 1; i <= Math.min(end - 1, filterProducts.length - 1); i++)
      {
        //Ko có lọc thì lấy hết, nếu lọc thì so sánh với brand của sản phẩm
          s += 
          '<li>' +
          '<div class="">'+
              '<div class="product-top">'+
              '<a href="?product-info?' + filterProducts[i].id + '" class="product thumb">'+
                     '<img src="' + filterProducts[i].img + '" alt="">'+
               '</a>'+
            '</div>'+
            '<div class="product-info">'+
              '<a href="?product-info?' + filterProducts[i].id + '" class="product-cat">' + filterProducts[i].brand + '</a>'+
             '<a href="?product-info?' + filterProducts[i].id + '" class="product-name">' + filterProducts[i].name + '</a>'+
              '<div class="product-price">' + addCommaToPrice(filterProducts[i].price) + '</div>'+
            '</div>'+
          ' </div>'+
          '</li>';
    
      }
    }



    document.querySelector('.headline').innerHTML = '<h3>' + begin + '-' + Math.min(end, filterProducts.length) + " trong (" + filterProducts.length + ') kết quả cho từ khóa: "' + input[0] + '"</h3>';
  
  
    //Inner chuỗi html vào list sản phẩm 
    let listProduct = document.querySelector(".products");
    listProduct.innerHTML = s;
  
    //Tính toán chia số trang
    let numberPage = filterProducts.length / 8;
    let contentPageNumber = "";
    //Nếu ko có tìm kiếm theo khoảng giá
    if(input[2] == undefined)
    {
      for(let i = 0; i < numberPage; i++)
      {
        //Theo định dang <li class="page-number"><a href="?search?input&i"></a></li>
        //Nếu là trang hiện tại thì thêm class select
        if(currentPage == i + 1)
          contentPageNumber += '<li class="page-number select">' + ' <a href="?search?' + input[0] + '&' + (i+1) + '">' + (i+1) + '</a> ' + '</li>';
        else
          contentPageNumber += '<li class="page-number">' + ' <a href="?search?' + input[0] + '&' + (i+1) + '">' + (i+1) + '</a> ' + '</li>';
      }
    }
    else
    {
      for(let i = 0; i < numberPage; i++)
      {
        //Theo định dang <li class="page-number"><a href="?search?input&i&10-10000"></a></li>
        //Nếu là trang hiện tại thì thêm class select
        if(currentPage == i + 1)
          contentPageNumber += '<li class="page-number select">' + ' <a href="?search?' + input[0] + '&' + (i+1) + '&' + priceFrom + '-' + priceTo + '">' + (i+1) + '</a> ' + '</li>';
        else
          contentPageNumber += '<li class="page-number">' + ' <a href="?search?' + input[0] + '&' + (i+1)  + '&' + priceFrom + '-' + priceTo + '">' + (i+1) + '</a> ' + '</li>';
      }
    }

  
    //inner kết quả vào html
    contentPageNumber = '<ul>' + contentPageNumber  + ' </ul>'
    document.querySelector('.page-container').innerHTML = contentPageNumber;

}
