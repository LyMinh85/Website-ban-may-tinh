function checkLocalStorageProduct()
{
  let productStorage = localStorage.getItem("product");

  //Kiểm tra local storage nếu chưa có tạo mới
  if(productStorage === null)
      localStorage.setItem("product", JSON.stringify(productArray));
  
  productArray = JSON.parse(productStorage);
}

function checkUserLocalStorage()
{
  let userStorage = localStorage.getItem('listUsers');
  if(userStorage === null)
      localStorage.setItem('listUsers', JSON.stringify(userArray));
  userArray = JSON.parse(userStorage);
}

function checkCartLocalStorage()
{
  let cartStorage = localStorage.getItem('cart');
  if(cartStorage === null)
    localStorage.setItem('cart', JSON.stringify(cartArray));
  cartArray = JSON.parse(cartStorage);
  if(cartArray != null)
    document.querySelector('.fa-shopping-cart').innerHTML = '<div class="cart-product-quantity">' + cartArray.length + '</div>';

}

function checkBillLocalStorage()
{
  let billStorage = localStorage.getItem('bills');
  if(billStorage === null)
    localStorage.setItem('bills', JSON.stringify(billArray));
  billArray = JSON.parse(billStorage);
}