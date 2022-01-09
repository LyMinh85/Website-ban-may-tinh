let cart_side_wrapper = document.querySelector('.cart-side-wrapper');
let cart_side_container = document.querySelector('.cart-side-container');
let cart_side_close_icon = cart_side_container.querySelector('.close-icon');

//event to open cart page
cart_side_container.querySelector('.cart-side-view-cart').addEventListener('click', function()
{
    window.location.href = 'index.html?cart';
});

cart_side_close_icon.addEventListener('click', function()
{
    closeCartSide();
});

checkCartLocalStorage();

function openCartSide()
{
    checkCartLocalStorage();
    cart_side_wrapper.classList.toggle('opened');
    cart_side_container.classList.toggle('opened');
    renderCartContent();
}

function closeCartSide()
{
    cart_side_wrapper.classList.toggle('opened');
    cart_side_container.classList.toggle('opened');
}

function addToCart(id)
{
    if(localStorage.getItem('user') === null) 
    {
        openLogin();
        return;
    }

    let quantity = document.querySelector('.amount-product').dataset.value;

    checkLocalStorageProduct();

    let product = productArray.find(obj => obj.id == id);


    let newCart = new Cart(product, quantity);

    checkCartLocalStorage();

    let hasCart = undefined;
    if(cartArray != null)
        hasCart = cartArray.find(x => x.product.id == newCart.product.id);

    //Chưa có trong giỏ hàng
    if(hasCart == undefined)
    {
        if(cartArray == null)
            cartArray = [newCart];
        else
            cartArray.push(newCart);
    }
    else
        hasCart.quantity = Number(hasCart.quantity) + Number(newCart.quantity);

    localStorage.setItem('cart', JSON.stringify(cartArray));
    openCartSide();
}

function renderCartContent()
{
    let str = "";

    let cartStorage = localStorage.getItem('cart');
    cartArray = JSON.parse(cartStorage);

    let totalMoney = 0;

    cartArray.forEach(element => {
        str += '<div class="product">' + 
        '  <img class="product-img" src="' + element.product.img + '">' + 
        '  <div class="left">' + 
        '    <div class="product-name">' + 
        element.product.name + 
        '    </div>' + 
        '    <div class="product-price">' + 
        '      <span class="quantity">' + element.quantity + '</span>x '+ addCommaToPrice(element.product.price) +'' + 
        '    </div>' + 
        '  </div>' + 
        '</div>';

        totalMoney += Number(element.product.price) * Number(element.quantity);
    });

    cart_side_container.querySelector('.cart-side-scroll').innerHTML = str;

    cart_side_container.querySelector('.cart-side-sum-money').querySelector('span').innerHTML = addCommaToPrice(totalMoney);
}

function cart_quantity_minus(id)
{
    checkCartLocalStorage();

    let index = cartArray.findIndex(x => x.product.id == id);

    let cart_table_item = document.querySelector('.cart-table').querySelectorAll('.cart-table-item');

    cart_table_item.forEach(element => {
      if(element.dataset.product_id == id)
      {
        let quantity = element.querySelector('.quantity');
        if(quantity.value > 1)
          quantity.value--;
          cartArray[index].quantity = quantity.value;
      }  
    })

    localStorage.setItem('cart', JSON.stringify(cartArray));
    render_cart_page();
}

function cart_quantity_plus(id)
{
    checkCartLocalStorage();

    let index = cartArray.findIndex(x => x.product.id == id);

    let cart_table_item = document.querySelector('.cart-table').querySelectorAll('.cart-table-item');

    cart_table_item.forEach(element => {
      if(element.dataset.product_id == id)
      {
          let quantity = element.querySelector('.quantity');
          if(quantity.value < 999)
            quantity.value++;
          cartArray[index].quantity = quantity.value;
      }  
    })

    localStorage.setItem('cart', JSON.stringify(cartArray));
    render_cart_page();
}

function cart_table_remove(id)
{
    checkCartLocalStorage();

    let index = cartArray.findIndex(x => x.product.id == id);

    cartArray.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cartArray));
    render_cart_page();
}



function openModalBuyCart()
{
    let width = Number(screen.width) / 2 - 200; 

    let cartBuyFLow = document.querySelector('.cart-buy-modal-flow');
    let cartBuyContent = cartBuyFLow.querySelector('.cart-buy-modal-content');


    cartBuyFLow.classList.toggle('opened');
    cartBuyContent.classList.toggle('opened');

    cartBuyContent.style.left = width + 'px';
    cartBuyContent.style.top = '100px';

    let user = JSON.parse(localStorage.getItem('user'));

    let str =
    '           <img class="close-icon" src="Picture/close-icon.png"/ onclick="closeModalBuyCart()">' +
    '           <div class="cart-buy-header">' +
    '               <p>Đặt hàng</p>' + 
    '           </div>' +
    '           <div class="cart-buy-user-info">' +
    '               <p>Tên đăng nhập: ' + user.username + '</p>' + 
    '               <p>Tên đầy đủ: ' + user.fullname + '</p>' + 
    '               <p>Số điện thoại: ' + user.phone + '</p>' + 
    '           </div>' +
    '           <div class="cart-buy-input-container">' + 
    '               <p>Địa chỉ giao hàng: </p>' + 
    '               <input class="cart-buy-input" placeholder="Nhập địa chỉ" type="text" value="' + user.address + '"></input>' + 
    '               <div class="error-text"></div>' + 
    '           </div>' + 
    '           <div class="cart-buy-button-container">' + 
    '               <button class="cart-buy-button" onclick="buyCartButton()">Đặt hàng</button>' + 
    '               <div class="error-text"></div>' + 
    '           </div>';

    document.querySelector('.cart-buy-modal-content').innerHTML = str;

}

function closeModalBuyCart()
{
    let cartBuyFLow = document.querySelector('.cart-buy-modal-flow');
    let cartBuyContent = cartBuyFLow.querySelector('.cart-buy-modal-content');


    cartBuyFLow.classList.toggle('opened');
    cartBuyContent.classList.toggle('opened');

    let element = document.querySelector('.cart-buy');
    let position = element.getBoundingClientRect();
    let x = Number(position.left) - 50;
    let y = Number(position.top) - 200;
    
    cartBuyContent.style.left = x + 'px';
    cartBuyContent.style.top = y + 'px';

}

function getCartTotalMoney()
{
    checkCartLocalStorage();
    let totalMoney = 0;
    cartArray.forEach(element => {
        totalMoney += Number(element.product.price) * Number(element.quantity);
    });
    return totalMoney;
}

function buyCartButton()
{
    checkBillLocalStorage();
    checkCartLocalStorage();

    let address_container = document.querySelector('.cart-buy-input-container');
    let address = address_container.querySelector('.cart-buy-input').value;

    if(address.length < 4)
    {
        address_container.querySelector('.error-text').innerHTML = "*Địa chỉ phải lớn hơn 4 ký tự";
        return;
    }
    address_container.querySelector('.error-text').innerHTML = "";

    if(cartArray == null)
    {
        address_container.querySelector('.error-text').innerHTML = "*Giỏ hàng chưa có sản phẩm";
        return;
    }
    address_container.querySelector('.error-text').innerHTML = "";


    let user = JSON.parse(localStorage.getItem('user'));

    let newBill = new Bill(getBillID(), user.username, address, getDateNow(), cartArray, getCartTotalMoney());


    if(billArray == null)
        billArray = [newBill];
    else
        billArray.push(newBill);

    localStorage.setItem('bills', JSON.stringify(billArray));

    localStorage.removeItem('cart');

    window.location.href = "index.html?bill";

}
