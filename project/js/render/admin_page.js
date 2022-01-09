//File này dùng để inner code html của admin vào index.html

function openAdminPage()
{
    str = 
    '  <body id="body">' + 
    '    <div class="sidebar">' + 
    '      <div class="sidebar-logo">' + 
    '        <a href="#">' + 
    '          <!-- <span class="fas fa-cat"></span> -->' + 
    '          <img src="Picture/logo.jpg">' + 
    '        </a>' + 
    '      </div>' + 
    '' + 
    '      <div class="sidebar-menu">' + 
    '        <ul>' + 
    '          <li>' + 
    '            <a class="sidebar-menu-container active" onclick="clickMenu(1)">' + 
    '              <span class="fas fa-th-large"></span>' + 
    '              <span class="sidebar-menu-title">Sản phẩm</span>' + 
    '            </a>' + 
    '          </li>' + 
    '' + 
    '          <li>' + 
    '            <a class="sidebar-menu-container" onclick="clickMenu(2)">' + 
    '              <span class="fas fa-users"></span>' + 
    '              <span class="sidebar-menu-title">Users</span>' + 
    '            </a>' + 
    '          </li>' + 
    '          <li>' + 
    '            <a class="sidebar-menu-container" onclick="clickMenu(3)">' + 
    '              <span class="fas fa-file-invoice-dollar"></span>' + 
    '              <span class="sidebar-menu-title">Đơn hàng</span>' + 
    '            </a>' + 
    '          </li>' + 
    '          <li>' + 
    '            <a class="sidebar-menu-container" onclick="clickMenu(4)">' + 
    '              <span class="fas fa-chart-line"></span>' + 
    '              <span class="sidebar-menu-title">Thống Kê</span>' + 
    '            </a>' + 
    '          </li>' + 
    '' + 
    '          <li>' + 
    '            <a href="?home" class="sidebar-menu-container" onclick="clickMenu(4)">' + 
    '              <span class="fas fa-sign-out-alt"></span>' + 
    '              <span class="sidebar-menu-title">Thoát</span>' + 
    '            </a>' + 
    '          </li>' + 
    '' + 
    '        </ul>' + 
    '      </div>' + 
    '    </div>' + 
    '' + 
    '    <div class="main-content">' + 
    '      <div class="topbar">' + 
    '        <div class="hamburger__toggle" onclick="toggleSideBar()">' + 
    '          <span class="hamburger__icon"></span>' + 
    '        </div>' + 
    '        <div class="topbar-search" onkeyup="searchInProductTable()">' + 
    '          <label>' + 
    '            <input type="text" placeholder="Tìm kiếm trong bảng..." id="searchInput">' + 
    '            <i class="fas fa-search"></i>' + 
    '          </label>' + 
    '        </div>' + 
    '        <div class="topbar-add-product">' + 
    '          <button class="add-product" style="font-family: FontAwesome;" onclick="displayModalAddProduct(modalAddProduct)">&#xf055</button>' + 
    '        </div>' + 
    '' + 
    '      </div>' + 
    '' + 
    '      <div class="product-container">' + 
    '' + 
    '      </div>' + 
    '    </div>' + 
    '' + 
    '' + 
    '' + 
    '' + 
    '    <script src="admin.js"></script>' + 
    '  </body>' + 
    '</html>'; 
    
    document.getElementById('content').innerHTML = str;
    
    document.querySelector('#admin-modal').innerHTML = 
    '<!-- Modal thêm sản phẩm -->' + 
    '<div class="modal fade" id="modalAddProduct">' + 
    '</div>' + 
    '' + 
    '<!-- Modal xoá sản phẩm -->' + 
    '<div class="modal fade" id="removeModal">' + 
    '  <div class="modal-dialog">' + 
    '    <div class="modal-content">' + 
    '      <div class="modal-header">' + 
    '        <h5 class="modal-title" id="">Xóa sản phẩm</h5>' + 
    '        <button type="button" class="close" onclick="closeModal()">' + 
    '          <span>&times;</span>' + 
    '        </button>' + 
    '      </div>' + 
    '      <div class="modal-body">' + 
    '' + 
    '      </div>' + 
    '      <div class="modal-footer">' + 
    '        <button type="button" class="btn" onclick="closeModal()">Đóng</button>' + 
    '        <button type="button" class="btn">Xác định</button>' + 
    '      </div>' + 
    '    </div>' + 
    '  </div>' + 
    '</div>' + 
    '    <div class="modal-overlay" id="modal-overlay">' + 
    '    </div>' + 
    '' + 
    '' + 
    '<!-- Modal sửa sản phẩm -->' + 
    '<div class="modal fade" id="changeModal">' + 
    '  <div class="modal-dialog">' + 
    '    <div class="modal-content">' + 
    '      <div class="modal-header">' + 
    '        <h5 class="modal-title" id="">Sửa sản phẩm</h5>' + 
    '        <button type="button" class="close" onclick="closeModal()">' + 
    '          <span>&times;</span>' + 
    '        </button>' + 
    '      </div>' + 
    '      <div class="modal-body">' + 
    '        <form id="frm-change-product">' + 
    '          <label>Tên sản phẩm</label><br>' + 
    '          <input class="input" type="text" ><br>' + 
    '' + 
    '          <label>Giá tiền</label><br>' + 
    '          <input class="input" type="text"><br>' + 
    '          ' + 
    '          <label>Hãng</label><br>' + 
    '          <select class="input">' + 
    '            <option>Apple</option>' + 
    '            <option>Asus</option>' + 
    '            <option>HP</option>' + 
    '            <option>Lenovo</option>' + 
    '            <option>Dell</option>' + 
    '            <option>MSI</option>' + 
    '            <option>Acer</option>' + 
    '          </select><br>' + 
    '' + 
    '          <img id="change-product-image" src="Picture/Sample-laptop.png" height="200px" width="300px">' + 
    '' + 
    '          <label>Thêm ảnh</labe><br>' + 
    '          <input class="input" type="text" id="file-upload-change-image">' + 
    '        </form>' + 
    '      </div>' + 
    '      <div class="modal-footer">' + 
    '        <button type="button" class="btn" onclick="closeModal()">Đóng</button>' + 
    '        <button type="button" class="btn" onclick="change_product()">Xác định</button>' + 
    '      </div>' + 
    '    </div>' + 
    '  </div>' + 
    '</div>';

    showListProduct();

    document.querySelector('#footer').style.display = "none";
}
