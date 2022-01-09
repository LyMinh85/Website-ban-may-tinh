function render_cart_page()
{
    checkCartLocalStorage();


    let str = 
    '<div class="cart-wrapper">' + 
    '          ' + 
    '  <div class="cart-heading">' + 
    '    <p>Giỏ hàng</p>' + 
    '  </div>' + 
    '  ' + 
    '  <div class="cart-content">' + 
    '    <div class="cart-content-left">' + 
    '      <div class="cart-table">' + 
    '        <table>' + 
    '          <thead>' + 
    '            <tr class="cart-table-head">' + 
    '              <td class="cart-table-thumbnail"></td>' + 
    '              <td class="cart-table-product">Sản phẩm</td>' + 
    '              <td class="cart-table-price">Giá</td>' + 
    '              <td class="cart-table-quantity">Số lượng</td>' + 
    '              <td class="cart-table-remove">Xóa</td>' + 
    '            </tr>' + 
    '          </thead>' + 
    '' + 
    '          <tbody>';

    let totalMoney = 0;
    if(cartArray != null)
    {
        cartArray.forEach(element => {
            str +=  
            '            <tr class="cart-table-item" data-product_id = "' + element.product.id + '">' + 
            '              <td class="cart-table-thumbnail"><img src="' + element.product.img + '"></td>' + 
            '              <td class="cart-table-product"><a href="index.html?product-info?' + element.product.id + '+ "> ' + element.product.name +  '</a></td>' + 
            '              <td class="cart-table-price">' + addCommaToPrice(element.product.price) + '</td>' + 
            '              <td class="cart-table-quantity">' + 
            '                <input class="quantity-minus" type="button" value="-" onclick="cart_quantity_minus(\'' + element.product.id + '\')"><input class="quantity" type="text" value="' + element.quantity + '" onkeypress="return onlyNumberKey(event)"><input class="quantity-plus" type="button" value="+" onclick="cart_quantity_plus(\'' + element.product.id + '\')">' + 
            '              </td>' + 
            '              <td class="cart-table-remove"><img src="Picture/close-icon.png" onclick="cart_table_remove(\'' + element.product.id + '\')"></td>' + 
            '            </tr>';
            totalMoney += Number(element.product.price) * Number(element.quantity);
        });
    }


    str +=
    '          </tbody>' + 
    '' + 
    '        </table>' + 
    '      </div>' + 
    '    </div>' + 
    '' + 
    '    <div class="cart-content-right">' + 
    '' + 
    '      <div class="cart-total-heading">' + 
    '        <p>Giỏ hàng</p>' + 
    '      </div>' + 
    '' + 
    '      <div class="cart-total">' + 
    '        <p>' + 
    '          Tổng tiền: <span class="cart-total-price">' + addCommaToPrice(totalMoney) + '</span>' + 
    '        </p>' + 
    '      </div>' + 
    '' + 
    '      <div class="cart-buy" onclick="openModalBuyCart()">' + 
    '        Đặt hàng' + 
    '      </div>' +
    '' + 
    '       <div class="cart-buy-modal-flow">' +
    '         <div class="cart-buy-modal-content">' +
    '         </div>' +
    '       </div>' + 
    '' + 
    '  </div>' + 
    '' + 
    '  ' + 
    '</div>';

    document.querySelector('#wrapper').innerHTML = str;


    let element = document.querySelector('.cart-buy');
    let position = element.getBoundingClientRect();
    let x = Number(position.left) - 50;
    let y = Number(position.top) - 200;

    let cartBuyFLow = document.querySelector('.cart-buy-modal-flow');
    let cartBuyContent = cartBuyFLow.querySelector('.cart-buy-modal-content');
    
    cartBuyContent.style.left = x + 'px';
    cartBuyContent.style.top = y + 'px';

}

