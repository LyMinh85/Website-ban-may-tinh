function renderPage() {
  let url = window.location.href;
  let str = url.split("?");

  console.log(str);

  switch(str[1])
  {
    case "home":
      openHomePage();
      break;
    case "admin":
      openAdminPage();
      break;
    case "product":
      openSanPhamPage();
      break;
    case "product-info":
      render_product_info_page();
      break;
    case "search":
      render_search_page();
      break;
    case "cart":
      render_cart_page();
      break;
    case "bill":
      renderBillPage();
      break;
    default:
      window.location.href = "index.html?home";
      break;
  }

  checkLocalStorageProduct();
  checkUserLocalStorage();

  if(str[1] != "admin")
    renderFooter();

}

function renderFooter()
{
  let str = 
  '<p style="color: white;">Liên hệ</p>'+
  '<div class="icon-thanh-vien">'+
  '  <div>'+
  '    <img src="Picture/Klee-Stichker.jpg">'+
  '    <div class="ten-thanh-vien">Lý Tuấn Minh</div>'+
  '  </div>'+
  '</div>';

  str =     '<div id="footer" style="text-align: center">' + str + '</div>';
  document.querySelector('#renderFooter').innerHTML = str;
}

//Hàm để kết thúc load
function loaded() {
  document.querySelector("body").classList.toggle("loaded");
}


renderPage();

window.onload = function () {
  // setTimeout(loaded, 700);
  
  
  



};
