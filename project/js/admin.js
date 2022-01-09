
//Toggle sidebar
function toggleSideBar()
{
    let sidebar = document.getElementsByClassName("sidebar")[0];
    let main_content = document.getElementsByClassName("main-content")[0];
    let sidebar_menu_title = document.getElementsByClassName("sidebar-menu-title");
    let topbar = document.getElementsByClassName("topbar")[0];
    let button = document.querySelector(".hamburger__toggle");
    button.classList.toggle("toggled");

    sidebar.classList.toggle("toggle");
    main_content.classList.toggle("toggle");
    topbar.classList.toggle("toggle");

    for(let i = 0; i < sidebar_menu_title.length; i++)
        sidebar_menu_title[i].classList.toggle("toggle");
}

//Dùng để khi click vào mỗi mục trong menu sẽ thêm class active
function clickMenu(index)
{
    let active = document.getElementsByClassName('sidebar-menu-container');
    for(let i = 0; i < active.length; i++)
        active[i].classList.remove('active');
    active[index-1].classList.add('active');


    if(index == 1)
    {
        document.querySelector('.topbar-add-product').style.display = "block";
        showListProduct();
    }
    else if(index == 2)
    {
        document.querySelector('.topbar-add-product').style.display = "none";
        showListUser();
    }
    else if(index == 3)
    {
        document.querySelector('.topbar-add-product').style.display = "none";
        showListDonHang();
    }    
    else if(index == 4)
    {
        document.querySelector('.topbar-add-product').style.display = "none";
        showListThongKe();
    }
        

}

//Hiển thị dropdown
function showDropDown_filter_brand() {
    let dropdown = document.querySelector('.dropdown-filter-brand').querySelector('.dropdown-filter-content');
    dropdown.classList.toggle('show');
}

function showDropDown_filter_price() {
    let dropdown = document.querySelector('.dropdown-filter-price').querySelector('.dropdown-filter-content');
    dropdown.classList.toggle('show');
    
}

function filterBrandInProduct()
{
    let select = document.querySelector('.locHangTrongThongKe').querySelector('select');
    showListProduct(select.value);
}

//Hiển thị bảng product trong admin
function showListProduct(brand)
{
    //Kiểm tra local storage có rỗng ko, nếu rỗng thêm vào local storage giá trị mặc định
    let productStorage = localStorage.getItem("product");
    if(productStorage === null)
        localStorage.setItem("product", JSON.stringify(productArray));
    
    
    productArray = JSON.parse(productStorage);

    var str = "";

    str +=
    '   <div class="locHangTrongThongKe">' +
    '       <label for="locHang">Xem theo các hãng: </label>' + 
    '       <select onchange="filterBrandInProduct()">';
    if(brand == "All" || brand == undefined)
        str += '           <option value="All" selected>Tất cả</option>';
    else
        str += '           <option value="All" selected>Tất cả</option>';

    for(let i = 0; i < brandArray.length; i++)
    {
        if(brand == brandArray[i].name)
            str += '       <option value="' + brandArray[i].name + '" selected>' + brandArray[i].name + '</option>';
        else
            str += '       <option value="' + brandArray[i].name + '">' + brandArray[i].name + '</option>';
    }

    str +=
    '       </select>' +
    '   </div>';

    //Các thẻ đầu bảng
    str += '<thead><tr><td>ID</td><td>Image</td><td>Name</td><td>Brand</td><td>Price</td><td>Tùy chọn</td></tr></thead>\n';

    for (let i = productArray.length - 1; i >= 0; i--) {
        const element = productArray[i];
        if(productArray[i].brand == brand || brand == "All" || brand == undefined)
        {
        let temp = '<td>' + element.id + '</td>\n' +
                    '<td>' + '<img src="' + element.img  + '" />'  + '</td>\n' +
                    '<td>' + element.name + '</td>\n' +
                    '<td>' + element.brand + '</td>\n' +
                    '<td>' + addCommaToPrice(element.price) + '</td>\n' +
                    '<td>' +
                    '<button class="btn change fas fa-edit" onclick="displayChangeModal(\'' + productArray[i].id + '\')"></button>' +
                    '<button class="btn delete fas fa-trash-alt" onclick="displayRemoveModal(\'' + productArray[i].id + '\')"></button>' +
                    '</td>\n';
        temp = '\n<tr>' + temp + '\n</tr>';
        str += temp;
        }
    }

    str = '<table id="productTable">\n' + str + '\n</table>';

    //Inner vào html
    document.querySelector('.product-container').innerHTML = str;
}

//Hàm hiển thị modal thêm sản phẩm
function displayModalAddProduct(modal)
{
    // Get the modal
    let modal_overlay = document.getElementById('modal-overlay');
    modal.style.display='block';
    modal_overlay.style.display = 'block';
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
        }
    }

    let modalBody =     
    '  <div class="modal-dialog">' + 
    '    <div class="modal-content">' + 
    '      <div class="modal-header">' + 
    '        <h5 class="modal-title" id="exampleModalLabel">Thêm sản phẩm</h5>' + 
    '        <button type="button" class="close" onclick="closeModal()">' + 
    '          <span>&times;</span>' + 
    '        </button>' + 
    '      </div>' + 
    '      <div class="modal-body">' + 
    '          <form id="frm-add-product">' + 
    '            <label>Tên sản phẩm</label><br>' + 
    '            <input class="input" type="text"><br>' + 
    '' + 
    '            <label>Giá tiền</label><br>' + 
    '            <input class="input" type="text"><br>' + 
    '            <div class="error-text"></div> '+
    '            ' + 
    '            <label>Hãng</label><br>' + 
    '            <select class="input">' + 
    '              <option>Apple</option>' + 
    '              <option>Asus</option>' + 
    '              <option>HP</option>' + 
    '              <option>Lenovo</option>' + 
    '              <option>Dell</option>' + 
    '              <option>MSI</option>' + 
    '              <option>Acer</option>' + 
    '            </select><br>' + 
    '' + 
    '            <img id="add-product-image" src="Picture/Sample-laptop.png" height="200px" width="300px">' + 
    '' + 
    '            <label>Thêm ảnh</labe><br>' + 
    '              <div>' + 
    '                <input class="input" type="file" title=" " id="fileUpload"/>' + 
    '                <span id=\'val\'></span>' + 
    '                <span id=\'button\'>Select File</span>' + 
    '              </div>' + 
    '            ' + 
    '      ' + 
    '          </form>' + 
    '' + 
    '' + 
    '      </div>' + 
    '      <div class="modal-footer">' + 
    '        <button type="button" class="btn" onclick="closeModal()">Đóng</button>' + 
    '        <button type="button" class="green-background btn" onclick="add_product(\'Picture/Sample-laptop.png\')">Thêm sản phẩm</button>' + 
    '      </div>' + 
    '    ' + 
    '    </div>' + 
    '    ' + 
    '  </div>';

    modal.innerHTML = modalBody;
    
    let footer = modal.querySelector('.modal-footer');
    let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
    '<button type="button" class="green-background btn" onclick="add_product(\'Picture/Sample-laptop.png\')">Thêm sản phẩm</button>';
    footer.innerHTML = str;
}

//Hàm hiển thị modal xóa sản phẩm
function displayRemoveModal(id)
{
    // Get the modal
    let removeModal = document.getElementById('removeModal');
    let modal_overlay = document.getElementById('modal-overlay');    
    removeModal.style.display='block';
    modal_overlay.style.display = 'block';

    removeModal.querySelector('.modal-content').style.margin = '100px 0 0 0';
    removeModal.querySelector('.modal-body').style.height = '0px';

    let footer = removeModal.querySelector('.modal-footer');
    let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
    '<button type="button" class="btn red-background" onclick="delete_product(\'' + id + '\')">Xác định</button>'
    footer.innerHTML = str;
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == removeModal) {
            closeModal();
            }
        }   
}

//Hàm hiển thi modal sửa đổi sản phẩm
function displayChangeModal(id)
{
    // Get the modal
    let changeModal = document.getElementById('changeModal');
    let modal_overlay = document.getElementById('modal-overlay');

    changeModal.style.display='block';
    modal_overlay.style.display = 'block';

    let footer = changeModal.querySelector('.modal-footer');

    console.log(id);

    let index = productArray.findIndex(x => x.id == id);
    let obj = productArray[index];

    let s = '<label>Tên sản phẩm</label><br>' + 
            '<input class="input" type="text" value="' + obj.name + '" ><br>' +
    '<label>Giá tiền</label><br>'+
    '<input class="input" type="text" value="' + obj.price + '"><br>'+
    '            <div class="error-text"></div> '+
    '<label>Hãng</label><br>' +
    '<select class="input">';

    var temp = ['Apple', 'Asus', 'HP', 'Lenovo', 'Dell', 'MSI', 'Acer'];
    for(let i = 0; i < temp.length; i++)
    {
        if(temp[i] == obj.brand)
            s += '<option selected>' + temp[i] + '</option>';
        else
            s += '<option>' + temp[i] + '</option>';
    }
    s += '</select><br>' +
    '<img id="change-product-image" src="' + obj.img + '" height="200px" width="300px">' +
    '<label>Thêm ảnh</labe><br>' +
    '<div>' +
    '<input class="input" type="file" title=" " id="file-upload-change-image" value="' + obj.img + '"/>' +
    '<span id="val"></span>' +
    '<span id="button">Select File</span>' +
    '</div>';

    
    let frmChange = document.getElementById('frm-change-product');
    frmChange.innerHTML = s;

    let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
    '<button type="button" class="btn orange-background" onclick="change_product(\'' + id + '\')">Xác định</button>'
    footer.innerHTML = str;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == changeModal) {
               closeModal();
            }
        }   
}

//Hàm đóng tất cả modal
function closeModal()
{
    // Get the modal
    let modal = document.getElementById('modalAddProduct');
    let removeModal = document.getElementById('removeModal');
    let changeModal = document.getElementById('changeModal');
    let modal_overlay = document.getElementById('modal-overlay');

    modal.style.display = "none";
    removeModal.style.display = "none";
    changeModal.style.display = "none";
    modal_overlay.style.display = 'none';
}

//Hàm tạo id tiếp theo trong list product
function get_product_id()
{
    let idProduct = productArray[productArray.length-1].id;
    let size = parseInt(idProduct, 10) + 1;
    let n = size.toString();
    let number_zeo = 4 - n.length;
    for(let i = 0; i < number_zeo; i++)
        n = '0' + n;
    return n;
}

//Hiển thị hình ảnh vừa chọn trong input file lên
function showUploadImage()
{
    //Lay 1 file
    let file = input.files[0];
    document.getElementById('add-product-image').src = URL.createObjectURL(file);
}

//Nút thêm sản phẩm
function add_product(img)
{
    //Lấy frm thêm sản phẩm
    let frm = document.getElementById('frm-add-product');
    let input = frm.elements[frm.length-1];

    //Thêm event để khi có sự thay trong input sẽ gọi hàm showUploadImage
    input.addEventListener('change', showUploadImage);
    let id = get_product_id();
    let name = frm.elements[0].value;
    let price = frm.elements[1].value;
    let brand = frm.elements[2].value;

    console.log(price);

    if(name == "")
        name = "undefined";
    
    if(isNaN(price) || price == "")
    {
        console.log(frm.elements[2]);
        frm.querySelector('.error-text').innerHTML = "Giá chỉ được nhập số";
        return;
    }

    //Tạo đối tượng mới với các thuộc tính vừa ghi trong modal thêm sản phẩm
    let item = new product(id, name, brand, price, img);

    //Đẩy đối tượng đó vào mảng 
    productArray.push(item);
    //Set lại local storage
    localStorage.setItem("product", JSON.stringify(productArray));
    
    //Hiển thị lại list sản phẩm
    showListProduct();
    closeModal();
}

//Nút xóa sản phẩm
function delete_product(str)
{
    let product;
    console.log(str);
    //str = id của sản phẩm

    //Tìm index của id sản phẩm
    let index = productArray.findIndex(x => x.id == str);

    console.log(index);

    //Xóa sản phẩm đó theo index trong mảng
    productArray.splice(index, 1);


    //Cật nhập lại local storage
    localStorage.setItem("product", JSON.stringify(productArray));

    //Xuất local storage
    showListProduct();
    closeModal();
}

//Nút sửa sản phẩm, tham số input là số id của sản phẩm
function change_product(input)
{
    let frmChange = document.getElementById('frm-change-product');

    let name = frmChange.elements[0].value;
    let price = frmChange.elements[1].value;
    let brand = frmChange.elements[2].value;
    let img = document.getElementById('change-product-image').src;
    console.log(img)

    console.log(name);

    if(name == "")
        name = "undefined";

    if(isNaN(price) || price == "")
    {
        frmChange.querySelector('.error-text').innerHTML = "Giá chỉ được nhập số";
        return;
    }

    //Tìm index của sản phẩm
    let index = productArray.findIndex(x => x.id == input);
    console.log(input);
    
    //Gán các thuộc tính trong modal vào sản phẩm ở index vừa tìm
    productArray[index].name = name;
    productArray[index].price = price;
    productArray[index].brand = brand;
    productArray[index].img = img;
    console.log(img);

    
    //Update
    localStorage.setItem("product", JSON.stringify(productArray));

    //Hiển thị
    showListProduct();
    closeModal();
}

//Tìm kiếm giá trị trong td
function findTable(td, txtValue, filter)
{
    //Loop các cột trong hàng
    for(let i = 0; i < td.length; i++)
    {
        //Cho txtvalue = giá trị của các cột
        txtValue = td[i].textContent || td[i].innerText;
        //Chuyển giá trị các cột thành chữ hoa rồi tìm kiếm theo filter(giá trị trong thanh tìm kiếm)
        //Nếu đúng trả về true
        if (txtValue.toUpperCase().indexOf(filter) > -1)
            return true;
    }
    return false;
}

//Tìm kiếm trong table
function searchInProductTable()
{
    var input, filter, table, tr, td, i, txtValue;
    //Lấy đối tượng của thanh tìm kiếm
    input = document.getElementById("searchInput");
    
    //Cho filter = giá trị của thanh tìm kiếm
    filter = input.value.toUpperCase();

    //Lấy đối tượng của table và tr
    table = document.getElementById("productTable");
    tr = table.getElementsByTagName("tr");

    //Loop theo mỗi dòng
    for (i = 1; i < tr.length; i++) {
        //lấy các đối tượng td trong hàng
      td = tr[i].getElementsByTagName("td");
      //Nếu td ko rỗng
      if (td) {
            //Nếu true hiển thị hàng này, false ko hiển thị hàng này
            if (findTable(td, txtValue, filter)) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
      }       
    }
}


function showListUser()
{
    //Kiểm tra local storage có rỗng ko, nếu rỗng thêm vào local storage giá trị mặc định
    checkLocalStorageUserAndUserInfo();

    taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
    thongTinNguoiDung = JSON.parse(localStorage.getItem("thongTinNguoiDung"));

    var str = "";

    //Các thẻ đầu bảng
    str += '<thead><tr style="background-color: var(--purple-color);"><td>Hình ảnh</td><td>Tên đăng nhập</td><td>Mật khẩu</td><td>Tên người dùng</td><td>Địa chỉ</td><td>SDT</td><td>Email</td><td>Tùy chọn</td></tr></thead>\n';

    console.log(taiKhoan);

    for (let i = taiKhoan.length - 1; i >= 0; i--) {
        let element = taiKhoan[i];
        let elementInfo = thongTinNguoiDung[0];

        for(let j = 0; j < thongTinNguoiDung.length; j++)
            if(element.tenDangNhap == thongTinNguoiDung[j].tenDangNhap)
                elementInfo = thongTinNguoiDung[j];
        
        let temp = '<td>' + '<img style="height: 60px; width: 60px; border-radius: 50%;" src="' + elementInfo.img  + '" />'  + '</td>\n' +
                    '<td>' + element.tenDangNhap + '</td>\n' +
                    '<td>' + element.matKhau + '</td>\n' +
                    '<td>' + elementInfo.tenNguoiDung + '</td>\n' +
                    '<td>' + elementInfo.diaChi + '</td>\n' +
                    '<td>' + elementInfo.soDienThoai + '</td>\n' +
                    '<td>' + elementInfo.email + '</td>\n' +
                    '<td>' +
                    '<button class="btn change fas fa-edit" onclick="displayChangeUserModal(\'' + element.tenDangNhap + '\')"></button>' +
                    '<button class="btn delete fas fa-trash-alt" onclick="displayRemoveUserModal(\'' + element.tenDangNhap + '\')"></button>' +
                    '</td>\n';
        temp = '\n<tr>' + temp + '\n</tr>';
        str += temp;
    }

    str = '<table id="productTable" class="users">\n' + str + '\n</table>';

    //Inner vào html
    document.querySelector('.product-container').innerHTML = str;
}



function displayRemoveUserModal(id)
{
    // Get the modal
    let removeModal = document.getElementById('removeModal');
    let modal_overlay = document.getElementById('modal-overlay');    
    removeModal.style.display='block';
    modal_overlay.style.display = 'block';

    removeModal.querySelector('.modal-title').innerHTML = "Xóa user";

    removeModal.querySelector('.modal-content').style.margin = '100px 0 0 0';
    removeModal.querySelector('.modal-body').style.height = '0px';

    let footer = removeModal.querySelector('.modal-footer');
    let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
    '<button type="button" class="btn red-background" onclick="delete_user(\'' + id + '\')">Xác định</button>'
    footer.innerHTML = str;
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == removeModal) {
            closeModal();
            }
        }   
}

function displayChangeUserModal(id)
{
    // Get the modal
    let changeModal = document.getElementById('changeModal');
    let modal_overlay = document.getElementById('modal-overlay');

    changeModal.style.display='block';
    modal_overlay.style.display = 'block';

    changeModal.querySelector('.modal-title').innerHTML = "Thay đổi user";

    let footer = changeModal.querySelector('.modal-footer');


    let index = taiKhoan.findIndex(x => x.tenDangNhap == id);
    let indexOfThongTin = thongTinNguoiDung.findIndex(y => y.tenDangNhap == id);
    let obj = taiKhoan[index];
    let elementInfo = thongTinNguoiDung[indexOfThongTin];


    let s = 
    '<label>Tên đăng nhập</label><br>' + 
    '<input class="input" type="text" value="' + obj.tenDangNhap + '" ><br>' +
    '<div class="error-text"></div>' +
    '<label>Mật khẩu</label><br>'+
    '<input class="input" type="text" value="' + obj.matKhau + '"><br>'+
    '<div class="error-text"></div>' +
    '<label>Tên người dùng</label><br>'+
    '<input class="input" type="text" value="' + elementInfo.tenNguoiDung + '"><br>'+
    '<div class="error-text"></div>' +
    '<label>Địa chỉ</label><br>'+
    '<input class="input" type="text" value="' + elementInfo.diaChi + '"><br>'+
    '<div class="error-text"></div>' +
    '<label>SDT</label><br>'+
    '<input class="input" type="text" value="' + elementInfo.soDienThoai + '"><br>'+
    '<div class="error-text"></div>' +
    '<label>Email</label><br>'+
    '<input class="input" type="text" value="' + elementInfo.email + '"><br>'+
    '<div class="error-text"></div>' +
    '<img id="change-product-image" src="' + elementInfo.img + '" height="200px" width="300px">' +
    '<label>Thêm ảnh</labe><br>' +
    '<div>' +
    '<input class="input" type="file" title=" " id="file-upload-change-image" value="' + elementInfo.img + '"/>' +
    '<span id="val"></span>' +
    '<span id="button">Select File</span>' +
    '</div>';
    
    let frmChange = document.getElementById('frm-change-product');
    frmChange.innerHTML = s;

    let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
    '<button type="button" class="btn orange-background" onclick="change_user(\'' + id + '\')">Xác định</button>'
    footer.innerHTML = str;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == changeModal) {
               closeModal();
            }
        }   
}


//Nút xóa sản phẩm
function delete_user(str)
{
    console.log(str);
    //str = id của sản phẩm

    //Tìm index của id sản phẩm
    let index = taiKhoan.findIndex(x => x.tenDangNhap == str);
    let indexOfThongTin = thongTinNguoiDung.findIndex(y => y.tenDangNhap == str);

    console.log(index);

    //Xóa sản phẩm đó theo index trong mảng
    taiKhoan.splice(index, 1);
    thongTinNguoiDung.splice(indexOfThongTin, 1);


    //Cật nhập lại local storage
    localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
    localStorage.setItem("thongTinNguoiDung", JSON.stringify(thongTinNguoiDung));

    //Xuất local storage
    showListUser();
    closeModal();
}

//Nút sửa sản phẩm, tham số input là số id của sản phẩm
function change_user(input)
{
    let frmChange = document.getElementById('frm-change-product');

    let tenDangNhap = frmChange.elements[0].value;
    let matKhau = frmChange.elements[1].value;
    let tenNguoiDung = frmChange.elements[2].value;
    let diaChi = frmChange.elements[3].value;
    let SDT =frmChange.elements[4].value;
    let email =frmChange.elements[5].value;
    let img = document.getElementById('change-product-image').src;
    console.log(img)

    let check = true;
    if(tenDangNhap.length < 5)
    {
        frmChange.querySelectorAll('.error-text')[0].innerHTML = "Tên Đăng Nhập Phải Lớn Hơn 5 kí tự";
        check = false;
    }

    if(matKhau.length < 7)
    {
        frmChange.querySelectorAll('.error-text')[1].innerHTML = "Mật Khẩu Phải Lớn Hơn 7 Kí tự";
        check = false;
    }
    
    if(tenNguoiDung < 4)
    {
        frmChange.querySelectorAll('.error-text')[2].innerHTML = "Tên Người Dùng Phải Lớn Hơn 4 kí tự";
        check = false;
    }

    if(!isVietnamesePhoneNumber(SDT))
    {
        frmChange.querySelectorAll('.error-text')[4].innerHTML = "Sai số điện thoại";
        check = false;
    }

    if(!isEmail(email))
    {
        frmChange.querySelectorAll('.error-text')[5].innerHTML = "Email sai định dạng";
        check = false;
    }

    if(check==false)
        return;

    //Tìm index của sản phẩm
    let index = taiKhoan.findIndex(x => x.tenDangNhap == input);
    let indexOfThongTin = thongTinNguoiDung.findIndex(y => y.tenDangNhap == input);
    console.log(input);
    
    //Gán các thuộc tính trong modal vào sản phẩm ở index vừa tìm
    taiKhoan[index].tenDangNhap = tenDangNhap;
    taiKhoan[index].matKhau = matKhau;
    thongTinNguoiDung[indexOfThongTin].tenNguoiDung = tenNguoiDung;
    thongTinNguoiDung[indexOfThongTin].diaChi = diaChi;
    thongTinNguoiDung[indexOfThongTin].soDienThoai = SDT;
    thongTinNguoiDung[indexOfThongTin].email = email;
    console.log(img);

    
    //Update
    localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan));
    localStorage.setItem("thongTinNguoiDung", JSON.stringify(thongTinNguoiDung));

    //Hiển thị
    showListUser();
    closeModal();
}

function isEqualDate(d1, d2)
{
    if(d1.getDay() == d2.getDay() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear())
        return true;
    return false;
}

function showListDonHang(dateFrom, dateTo)
{
    // //Kiểm tra local storage có rỗng ko, nếu rỗng thêm vào local storage giá trị mặc định
    // checkLocalStorageUserAndUserInfo();

    let listDonHang = JSON.parse(localStorage.getItem("lichSuMuaHang"));

    var str = "";


    str +=
    '<div class="filterDateInDonHang">' + 
    '  <div class="error-text"></div>' +
    '  <div class="headText">Xem đơn hàng trong khoảng thời gian</div>' + 
    '  <label>Từ</label>' + 
    '  <input type="date" />' + 
    '  <label>Đến</label>' + 
    '  <input type="date" />' + 
    '  <div class="filter-btn" onclick="filterDateDonHang()">Xem</div>'
    '</div>';

    //Các thẻ đầu bảng
    str += '<thead><tr style="background-color: var(--purple-color);"><td>ID</td><td>Khách hàng</td><td>Hình ảnh</td><td>Sản phẩm</td><td>Giá</td><td>SL</td><td>Tổng tiền</td><td>Ngày đặt hàng</td><td>Tình trạng</td><td>Xử lý</td></tr></thead>\n';


    for (let i = listDonHang.length - 1; i >= 0; i--) {

        
        let element = listDonHang[i];
        let date = new Date(element.ngayDatHang);
        if(dateFrom == undefined || dateFrom == undefined || (date >= dateFrom && date <= dateTo) || isEqualDate(date, dateFrom) || isEqualDate(date, dateTo))
        {
            let colorStrTinhTrangDonHang;
            if(element.tinhTrangDonHang == "Chưa Xử Lí")
                colorStrTinhTrangDonHang = '<td class="waiting-check">' + element.tinhTrangDonHang + '</td>\n';
            else
                colorStrTinhTrangDonHang = '<td class="checked">' + element.tinhTrangDonHang + '</td>\n';
            
            let temp = 
                        '<td>' + element.maDonHang  + '</td>\n' +
                        '<td>' + element.nguoiDatHang.tenDangNhap  + '</td>\n' +
                        '<td>' + '<img  src="' + element.c.iteam.img  + '" />' +  '</td>\n' +
                        '<th style="width: 20%; word-wrap: break-word;">' + element.c.iteam.name  + '</th>\n' +
                        '<td>' + addCommaToPrice(element.c.iteam.price) + '</td>\n' +
                        '<td>' + element.c.quantity + '</td>\n' +
                        '<td>' + addCommaToPrice(element.c.quantity * element.c.iteam.price) + '</td>\n' +
                        '<td>' + element.ngayDatHang.split("T")[0] + '</td>\n' +
                        colorStrTinhTrangDonHang +
                        '<td>' + 
                        '<button style="margin-left: 10px" class="add-product fas fa-check-circle" onclick="displayCheckDonHangModal(\'' + element.maDonHang + '\')"></button>' +
                        '</td>\n';
            temp = '\n<tr>' + temp + '\n</tr>';
            str += temp;
        }
    }


    str = '<table id="productTable">\n' + str + '\n</table>';

    //Inner vào html
    document.querySelector('.product-container').innerHTML = str;
}


function displayCheckDonHangModal(id)
{
        // Get the modal
        let removeModal = document.getElementById('removeModal');
        let modal_overlay = document.getElementById('modal-overlay');    
        removeModal.style.display='block';
        modal_overlay.style.display = 'block';
    
        removeModal.querySelector('.modal-title').innerHTML = "Xử lý đơn hàng";
    
        removeModal.querySelector('.modal-content').style.margin = '100px 0 0 0';
        removeModal.querySelector('.modal-body').style.height = '0px';
    
        let footer = removeModal.querySelector('.modal-footer');
        let str = '<button type="button" class="btn" onclick="closeModal()">Đóng</button>' +
        '<button type="button" class="btn green-background" onclick="checkDonHang(\'' + id + '\')">Xác định</button>'
        footer.innerHTML = str;
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == removeModal) {
                closeModal();
                }
            }   
}

function checkDonHang(id)
{
    let listDonHang = JSON.parse(localStorage.getItem("lichSuMuaHang"));
    let index = listDonHang.findIndex(x => x.maDonHang == id);

    listDonHang[index].tinhTrangDonHang = "Đã xử lý";

    
    localStorage.setItem("lichSuMuaHang", JSON.stringify(listDonHang));
    
    showListDonHang();
    closeModal();
}


function filterDateDonHang()
{
    let input = document.querySelector('.filterDateInDonHang').querySelectorAll('input');

    if(input[0].value == "" || input[1].value == "")
    {
        document.querySelector('.filterDateInDonHang').querySelector('.error-text').innerHTML = "Chưa có nhập ngày tháng năm";
        return;
    }
    else
    {
        document.querySelector('.filterDateInDonHang').querySelector('.error-text').innerHTML = "";
    }

    let dateFrom = new Date(input[0].value);
    let dateTo = new Date(input[1].value);

    console.log("Date from: " + dateFrom);
    console.log("Date to: " + dateTo);


    showListDonHang(dateFrom, dateTo);

}

function filterDateThongKe()
{
    let input = document.querySelector('.filterDateInThongKe').querySelectorAll('input');

    if(input[0].value == "" || input[1].value == "")
    {
        document.querySelector('.').querySelector('.error-text').innerHTML = "Chưa có nhập ngày tháng năm";
        return;
    }
    else
    {
        document.querySelector('.filterDateInThongKe').querySelector('.error-text').innerHTML = "";
    }

    let dateFrom = new Date(input[0].value);
    let dateTo = new Date(input[1].value);

    let select = document.querySelector('.locHangTrongThongKe').querySelector('select');

    showListThongKe(dateFrom, dateTo, select.value);

}

function showListThongKe(dateFrom, dateTo, brand)
{
    // //Kiểm tra local storage có rỗng ko, nếu rỗng thêm vào local storage giá trị mặc định
    // checkLocalStorageUserAndUserInfo();

    let listDonHang = JSON.parse(localStorage.getItem("lichSuMuaHang"));

    var str = "";


    str +=
    '<div class="filterDateInThongKe">' + 
    '  <div class="error-text"></div>' +
    '  <div class="headText">Xem thống kê trong khoảng thời gian</div>' + 
    '  <label class="chu">Từ</label>' + 
    '  <input type="date" />' + 
    '  <label class="chu">Đến</label>' + 
    '  <input type="date" />' + 
    '  <div class="filter-btn" onclick="filterDateThongKe()">Xem</div>' +
    '  <div class="anhthongke" ><img src="Picture/5031661.png" width="600" height="300" alt="" /></div>' +

    '   <div class="locHangTrongThongKe">' +
    '       <label for="locHang">Xem thống kê theo các hãng: </label>' + 
    '       <select onchange="filterBrandInThongKe()">';
    if(brand == "All" || brand == undefined)
        str += '           <option value="All" selected>Tất cả</option>';
    else
        str += '           <option value="All" selected>Tất cả</option>';

    for(let i = 0; i < brandArray.length; i++)
    {
        if(brand == brandArray[i].name)
            str += '       <option value="' + brandArray[i].name + '" selected>' + brandArray[i].name + '</option>';
        else
            str += '       <option value="' + brandArray[i].name + '">' + brandArray[i].name + '</option>';
    }

    str +=
    '       </select>' +
    '   </div>' +
    '</div>';

    
    let TongDoanhThu = 0;
    let tong = 0;
    let sumSL = 0;

    
    for (let i = listDonHang.length - 1; i >= 0; i--) {
        let element = listDonHang[i];
        let date = new Date(element.ngayDatHang);
        if(dateFrom == undefined || dateFrom == undefined || (date >= dateFrom && date <= dateTo) || isEqualDate(date, dateFrom) || isEqualDate(date, dateTo))
        {
            if(listDonHang[i].c.iteam.brand == brand || brand == "All" || brand == undefined)
            {
                if(element.tinhTrangDonHang == "Đã xử lý")
                {
                    tongDoanhThu = Number(element.c.iteam.price*element.c.quantity);
                    tong += tongDoanhThu;
                    sumSL+= element.c.quantity;
                }
            }
        }
    }

    str += '<thead><tr style="background-color: var(--purple-color); color: white;"><td></td><td></td><td></td><td></td><td>Số Lượng</td><td>Tổng tiền</td></thead>\n';

    str += '<tr>' + 
    '<td class="checked">Thống Kê Doanh thu</td>\n' +
    '<td></td>\n' +
    '<td></td>\n' +
    '<td></td>\n' +
    '<td class="checked">' + addCommaToPrice(sumSL)  + '</td>' + 
    '<td class="checked">' + addCommaToPrice(tong)  + '</td>\n' +
    '</tr>\n';

    str += '<tr style="background-color: var(--purple-color); color: white;"><td>Ngày Đặt Hàng</td><td>Sản Phẩm</td><td>Loại Hàng</td><td>Giá</td><td>Số Lượng</td><td>Tổng tiền</td>\n';


    for (let i = listDonHang.length - 1; i >= 0; i--) {

        
        let element = listDonHang[i];
        let date = new Date(element.ngayDatHang);
        if(dateFrom == undefined || dateFrom == undefined || (date >= dateFrom && date <= dateTo) || isEqualDate(date, dateFrom) || isEqualDate(date, dateTo))
        {
            if(listDonHang[i].c.iteam.brand == brand || brand == "All" || brand == undefined)
            {
                let colorStrTinhTrangDonHang;
                if(element.tinhTrangDonHang == "Chưa Xử Lí")
                    colorStrTinhTrangDonHang = '<td class="waiting-check">' + element.tinhTrangDonHang + '</td>\n';
                else
                    colorStrTinhTrangDonHang = '<td class="checked">' + element.tinhTrangDonHang + '</td>\n';
                
                    if(element.tinhTrangDonHang == "Đã xử lý"){
                                   let temp = 
                                           '<td>' + element.ngayDatHang.split("T")[0]  + '</td>\n' +    
                                           '<td>' + element.c.iteam.name  + '</td>\n' +
                                           '<td>' + element.c.iteam.brand  + '</td>\n' +
                                           '<td>' + addCommaToPrice(element.c.iteam.price) + '</td>\n' +
                                           '<td>' + element.c.quantity + '</td>\n' +
                                           '<td>' + addCommaToPrice(element.c.iteam.price*element.c.quantity) + '</td>\n';
                               temp = '\n<tr>' + temp + '\n</tr>';
                               tongDoanhThu = Number(element.c.iteam.price*element.c.quantity);
                               tong += tongDoanhThu;
                               str += temp;
                               sumSL+= element.c.quantity;
                    }
            }
        }
    }

    str = '<table id="productTable">\n' + str + '\n</table>';

    //Inner vào html
    document.querySelector('.product-container').innerHTML = str;
}


function filterBrandInThongKe()
{
    let select = document.querySelector('.locHangTrongThongKe').querySelector('select');
    showListThongKe(undefined, undefined, select.value);
}