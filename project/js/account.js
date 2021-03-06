//Event
let account_flow = document.querySelector('.account-flow');
let account_login = account_flow.querySelector('.account-login');
let account_register = account_flow.querySelector('.account-register');

if(localStorage.getItem("user") === null)
    document.querySelector('.shopping-cart').addEventListener('click', function(){openLogin()});
else
{
    document.querySelector('#goToBill').style.display = "block";
    document.querySelector('.shopping-cart').addEventListener('click', function(){openCartSide()});
}
    

document.querySelector('#btnLogin').addEventListener('click', function(){openLogin()});

document.querySelector('#btnRegister').addEventListener('click', function(){openRegister()});

document.querySelector('#btnXuat').addEventListener('click', function()
{
    localStorage.removeItem("user");
    localStorage.removeItem('cart');
    window.location.href = "index.html?home";
})

function addCloseAccountEvent()
{
    let close_icons = account_flow.querySelectorAll(".close-icon");
    close_icons.forEach(element => {
        element.addEventListener('click', function(){closeAccount()})
    });
}

function openLogin()
{
    account_flow.classList.toggle('display');
    renderLogin();
    account_login.style.display = "block";
    addCloseAccountEvent();
    account_login.querySelector('.account-button').addEventListener('click', function(){login();});
}

function openRegister()
{
    account_flow.classList.toggle('display');
    renderRegister();
    account_register.style.display = "block";
    addCloseAccountEvent();
    account_register.querySelector('.account-button').addEventListener('click', function(){register();});
}

function closeAccount()
{
    account_flow.classList.toggle('display');
    account_login.style.display = "none";
    account_register.style.display = "none";
}

function onlyNumberKey(evt) {
          
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

//N???u ???? ????ng nh???p
if(!(localStorage.getItem("user") === null))
{
    let user = JSON.parse(localStorage.getItem("user"));
    let parent = document.querySelector(".user-icon");

    parent.firstElementChild.style.display = "none";

    document.getElementById("tenUser").innerText = user.username;

    parent.querySelector('.user-img').style.display = "block";
    parent.querySelector('.user-img').src = user.avatar;

    document.querySelector('#index-user').style.display = "block";
    document.querySelector('#index-none').style.display = "none";

    if(user.username == "admin")
        document.querySelector('.isAdminUser').style.display = "block";
}



function checkInputNull(inputContainer, inputValue)
{
    if(inputValue == "")
    {
        inputContainer.querySelector('.error-text').innerHTML = "*M???c n??y kh??ng ???????c ????? tr???ng";
        return false;
    }
    inputContainer.querySelector('.error-text').innerHTML = "";
    return true;
}

function login()
{
    let inputs = document.querySelector('.account-login').querySelectorAll('.account-input-container');
    let username_container = inputs[0];
    let password_container = inputs[1];

    let username = username_container.querySelector('.account-input').value;
    let password = password_container.querySelector('.account-input').value;

    //Ki???m tra c?? nh???p ?????y ????? ch??a
    let bool1 = checkInputNull(username_container, username);
    let bool2 = checkInputNull(password_container, password);

    if(bool1 == false || bool2 == false)
        return false;

    //Ki???m tra v?? update local storage
    checkUserLocalStorage();

    //L???y user c?? username v???a nh???p
    let user = userArray.find(element => element.username == username);

    let btn_container = document.querySelector('.account-login').querySelector('.account-button-container');
    
    //N???u ko c?? user ???? ho???c sai m???t kh???u
    if(user == undefined || user.password != password)
    {
        btn_container.querySelector('.error-text').innerHTML = "*T??n ????ng nh???p ho???c m???t kh???u kh??ng ????ng";
        return;    
    }
    btn_container.querySelector('.error-text').innerHTML = "";

    localStorage.setItem('user', JSON.stringify(user));
    location.reload();
}

function register()
{
    let inputs = document.querySelector('.account-register').querySelectorAll('.account-input-container');
    let username_container = inputs[0];
    let fullname_container = inputs[1];
    let password_container = inputs[2];
    let password_re_enter_container = inputs[3];
    let email_container = inputs[4];
    let phone_container = inputs[5];
    let address_container = inputs[6];

    let username = username_container.querySelector('.account-input').value;
    let fullname = fullname_container.querySelector('.account-input').value;
    let password = password_container.querySelector('.account-input').value;
    let password_re_enter = password_re_enter_container.querySelector('.account-input').value;
    let email = email_container.querySelector('.account-input').value;
    let phone = phone_container.querySelector('.account-input').value;
    let address = address_container.querySelector('.account-input').value;

    bool = true;
    if(username.length <= 3)
    {
        username_container.querySelector('.error-text').innerHTML = "*T??n ????ng nh???p ph???i l???n h??n 3 k?? t???";
        bool = false;
    }
    else
        username_container.querySelector('.error-text').innerHTML = "";

    if(password < 6)
    {
        password_container.querySelector('.error-text').innerHTML = "*M???t kh???u ph???i l???n h??n 6 k?? t???";
        bool = false;
    }
    else
        password_container.querySelector('.error-text').innerHTML = "";
    
    if(password_re_enter < 6 || password_re_enter != password)
    {
        password_re_enter_container.querySelector('.error-text').innerHTML = "*Nh???p l???i m???t kh???u kh??ng ????ng";
        bool = false;
    }
    else
        password_re_enter_container.querySelector('.error-text').innerHTML = "";

    if(fullname.length <= 6)
    {
        fullname_container.querySelector('.error-text').innerHTML = "*H??? t??n ph???i l???n h??n 6 k?? t???";
        bool = false;
    }
    else
        fullname_container.querySelector('.error-text').innerHTML = "";

    if(!isEmail(email))
    {
        email_container.querySelector('.error-text').innerHTML = "Email kh??ng ????ng";
        bool = false;
    }
    else
        email_container.querySelector('.error-text').innerHTML = "";

    if(phone.length < 9)
    {
        phone_container.querySelector('.error-text').innerHTML = "S??? ??i???n tho???i kh??ng ????ng";
        bool = false;
    }
    else
        phone_container.querySelector('.error-text').innerHTML = "";

    if(address.length < 4)
    {
        address_container.querySelector('.error-text').innerHTML = "?????a ch??? kh??ng ????ng";
        bool = false;
    }
    else
        address_container.querySelector('.error-text').innerHTML = "";


    if(bool == false)
        return;

    //Ki???m tra v?? update local storage
    checkUserLocalStorage();

    //L???y user c?? username v???a nh???p
    let user = userArray.find(element => element.username == username);
    
    //N???u c?? username ????
    if(user != undefined)
    {
        username_container.querySelector('.error-text').innerHTML = "*T??n ????ng nh???p ???? c??";
        return;    
    }
    username_container.querySelector('.error-text').innerHTML = "";

    let newUser = new User(username, password, fullname, email, phone, address, "Picture/qiqi.png");
    
    //Push new user to array and update local storage
    userArray.push(newUser);
    localStorage.setItem("listUsers", JSON.stringify(userArray));


    checkUserLocalStorage();

    location.reload();
}




//Render account login modal
function renderLogin()
{
    let str = 
    '  <img class="close-icon" src="Picture/close-icon.png"/>' + 
    '  <div class="account-header">' + 
    '    <p>????ng nh???p</p>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p t??n ????ng nh???p" type="text"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p m???t kh???u" type="password"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-button-container">' + 
    '    <button class="account-button">????ng nh???p</button>' + 
    '    <div class="error-text"></div>' + 
    '  </div>';
    
    document.querySelector('.account-login').innerHTML = str;
    
}

function renderRegister()
{
    str = 
    '  <img class="close-icon" src="Picture/close-icon.png"/>' + 
    '  <div class="account-header">' + 
    '    <p>????ng k??</p>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p t??n ????ng nh???p" type="text"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p t??n ?????y ?????" type="text"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p m???t kh???u" type="password"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p l???i m???t kh???u" type="password"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p email" type="text"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p s??? ??i???n tho???i" type="text" onkeypress="return onlyNumberKey(event)"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-input-container">' + 
    '    <input class="account-input" placeholder="Nh???p ?????a ch???" type="text"></input>' + 
    '    <div class="error-text"></div>' + 
    '  </div>' + 
    '  <div class="account-button-container">' + 
    '    <button class="account-button">????ng k??</button>' + 
    '    <div class="error-text"></div>' + 
    '  </div>';
    
    document.querySelector('.account-register').innerHTML = str;
}

function isEmail(email)
{
    return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}