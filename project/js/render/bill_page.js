function renderBillPage()
{
    checkBillLocalStorage();

    let str = 
    '<div class="bill-wrapper">' + 
    '  <div class="bill-heading">' + 
    '   <p>Đơn hàng</p>' + 
    '  </div>' + 
    '' + 
    '  <div class="bill-content">' + 
    '    <div class="bill-table">' +
    '      <div class="row head"> ' + 
    '        <div class="item-viewDetail">Xem chi tiết</div> ' + 
    '        <div class="item-ID">Người đặt</div> ' + 
    '        <div class="item-address">Địa chỉ đặt hàng</div> ' + 
    '        <div class="item-date">Ngày đặt</div> ' + 
    '        <div class="item-total">Tổng tiền</div> ' + 
    '        <div class="bill-table-remove">Xóa</div>' + 
    '      </div>';
    
    if(billArray != null)
    {
        let user = JSON.parse(localStorage.getItem('user'));
        billArray.forEach(element => {
            if(user.username == element.username)
            {
                str +=
                '   <div class="bill-container" data-bill_id="' + element.id + '" >' +
                '      <div class="row"> ' + 
                '        <div class="item-viewDetail"><div class="btn" onclick="openDetailBill(\'' + element.id + '\')">Xem</div></div> ' + 
                '        <div class="item-ID">' + element.username + '</div> ' + 
                '        <div class="item-address">' + element.address + '</div> ' +
                '        <div class="item-date">' + element.date + '</div> ' + 
                '        <div class="item-total">' + addCommaToPrice(element.totalMoney) + '</div> ' + 
                '        <div class="bill-table-remove"><img src="Picture/close-icon.png" onclick="removeBill(\'' + element.id + '\')"></div>' + 
                '      </div>' + 
                '      <div class="inline-table">';
    
                str +=
                '        <div class="cart-table-in-bill-table">' + 
                '          <div class="row head"> ' + 
                '            <div class="item-thumbnail"></div> ' + 
                '            <div class="item-product">Sản phẩm</div> ' + 
                '            <div class="item-price">Giá</div> ' + 
                '            <div class="item-quantity">Số lượng</div> ' + 
                '          </div>';
            
                let carts = element.cartArray;
                carts.forEach(cart => {
                    str +=
                    '          <div class="row"> ' + 
                    '            <div class="item-thumbnail"><img src="'+ cart.product.img + '"></div> ' + 
                    '            <div class="item-product">' + cart.product.name + '</div> ' + 
                    '            <div class="item-price">' + cart.product.price + '</div> ' + 
                    '            <div class="item-quantity">' + cart.quantity + '</div> ' + 
                    '          </div>';
                });
    
            
                str +=
                '       </div>' +
                '      </div>' +
                '   </div>';
            }

            
        });
    }

    str +=
    '   </div>' + 
    '  </div>' + 
    '</div>';
    
    
    document.querySelector('#wrapper').innerHTML = str;
}

function openDetailBill(id)
{
    let billTable = document.querySelector('.bill-table');
    let billContainer = billTable.querySelectorAll('.bill-container');

    billContainer.forEach(element => {
        if(element.dataset.bill_id == id)
            element.querySelector('.inline-table').classList.toggle('opened');
    });
}