function addCommaToPrice(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function disableFormatComma(x)
{
    let str = x.toString().split(",");
    let result = "";
    for(let i = 0; i < str.length; i++)
        result += str[i];
    return result;
}

//Đối tượng hãng
function Brand(name) {
    this.name = name;
    this.amount = 0;
  }
  
var brandArray = [
    new Brand("Apple"),
    new Brand("Asus"),
    new Brand("Dell"),
    new Brand("HP"),
    new Brand("Lenovo"),
    new Brand("Acer"),
    new Brand("MSI"),
];
  

//Đối tượng product
function product(id, name, brand, price, img, specification)
{
    this.id = id;
    this.name = name;
    this.img = img;
    this.brand = brand;
    this.price = price;
    this.specification = specification;
}


//Đối tượng tài khoản
function User(username, password, fullname, email, phone, address, avatar)
{
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.avatar = avatar;
}

function Cart(product, quantity)
{
    this.product = product;
    this.quantity = quantity;
}

function Bill(id, username, address, date, cartArray, totalMoney)
{
    this.id = id;
    this.username = username;
    this.address = address;
    this.date = date;
    this.cartArray = cartArray;
    this.totalMoney = totalMoney;
}

var cartArray = null;

var billArray = null;

var userArray = [
    {
        username: "admin",
        password: "admin",
        fullname: "Lý Tuấn Minh",
        email: "minh@gmail.com",
        phone: "0905827643",
        address: "TP.HCM",
        avatar: "Picture/Klee-Stichker.jpg"
    },
    {
        username: "minh",
        password: "123456",
        fullname: "Minh Lý Tuấn",
        email: "minh1234@gmail.com",
        phone: "0902834678",
        address: "TP.HCM",
        avatar: "Picture/Klee-Stichker.jpg"
    }
];

//Danh sách các sản phẩm
var productArray = [
    {
        "id": "0001",
        "name": "MacBook Pro 14 M1 Pro 2021/14 core-GPU",
        "img": "Picture/2021-m-p-14-inch.jpg",
        "brand": "Apple",
        "price": "54990000"
    },
    {
        "id": "0002",
        "name": "MacBook Pro 14 M1 Pro 2021/16-core GPU",
        "img": "Picture/2021-m-p-14-inch.jpg",
        "brand": "Apple",
        "price": "64990000"
    },
    {
        "id": "0003",
        "name": "MacBook Pro 16 M1 Pro 2021/16 core-GPU",
        "img": "Picture/macbook-pro-14-m1-pro-2021-bac-1.jpg",
        "brand": "Apple",
        "price": "69990000"
    },
    {
        "id": "0004",
        "name": "MacBook Pro 16 M1 Max 2021/32 core-GPU",
        "img": "Picture/macbook-pro-14-m1-pro-2021-bac-1.jpg",
        "brand": "Apple",
        "price": "90990000"
    },
    {
        "id": "0005",
        "name": "MacBook Pro M1 2020",
        "img": "Picture/macbook-pro-m1-2020-silver-01-org.jpg",
        "brand": "Apple",
        "price": "31740000"
    },
    {
        "id": "0006",
        "name": "MacBook Air M1 2020 7-core GPU",
        "img": "Picture/macbook-air-m1-2020-silver-01-org.jpg",
        "brand": "Apple",
        "price": "26040000"
    },
    {
        "id": "0007",
        "name": "MacBook Air M1 2020 8-core GPU",
        "img": "Picture/macbook-air-m1-2020-silver-01-org.jpg",
        "brand": "Apple",
        "price": "31240000"
    },
    {
        "id": "0008",
        "name": "Asus ROG Zephyrus G14 Alan Walker R9 5900HS (K2064T)U",
        "img": "Picture/1.jpg",
        "brand": "Asus",
        "price": "42490000"
    },
    {
        "id": "0009",
        "name": "Asus TUF Gaming FX516PE i7 11370H (HN005T)",
        "img": "Picture/2.jpg",
        "brand": "Asus",
        "price": "28990000"
    },
    {
        "id": "0010",
        "name": "Asus TUF Gaming FX706HE i7 11800H (HX011T)",
        "img": "Picture/3.jpg",
        "brand": "Asus",
        "price": "30990000"
    },
    {
        "id": "0011",
        "name": "Asus ZenBook UX325EA i5 1135G7 (KG363T)",
        "img": "Picture/4.jpg",
        "brand": "Asus",
        "price": "22570000"
    },
    {
        "id": "0012",
        "name": "Asus ZenBook UX371EA i7 1165G7 (HL494TS)",
        "img": "Picture/5.jpg",
        "brand": "Asus",
        "price": "39390000"
    },
    {
        "id": "0013",
        "name": "HP Omen 15 ek0078TX i7 10750H (26Y68PA)",
        "img": "Picture/6.jpg",
        "brand": "HP",
        "price": "56990000"
    },
    {
        "id": "0014",
        "name": "HP ZBook Firefly 14 G8 i7 1165G7 (275W0AV)",
        "img": "Picture/7.jpg",
        "brand": "HP",
        "price": "41590000"
    },
    {
        "id": "0015",
        "name": "HP EliteBook X360 830 G8 i7 1165G7 (3G1A4PA)",
        "img": "Picture/8.jpg",
        "brand": "HP",
        "price": "41290000"
    },
    {
        "id": "0016",
        "name": "HP Envy 13 ba1031TU i7 1165G7 (2K0B7PA)",
        "img": "Picture/9.jpg",
        "brand": "HP",
        "price": "33690000"
    },
    {
        "id": "0017",
        "name": "HP Pavilion Gaming 15 dk1159TX i7 10750H (31J36PA)",
        "img": "Picture/10.jpg",
        "brand": "HP",
        "price": "28490000"
    },
    {
        "id": "0018",
        "name": "Lenovo Yoga 9 14ITL5 i7/1185G7 (82BG006EVN)",
        "img": "Picture/11.jpg",
        "brand": "Lenovo",
        "price": "46990000"
    },
    {
        "id": "0019",
        "name": "Lenovo YOGA Slim 7 Carbon 13ITL5 i7 1165G7",
        "img": "Picture/12.jpg",
        "brand": "Lenovo",
        "price": "32740000"
    },
    {
        "id": "0020",
        "name": "Lenovo ThinkBook 14s Yoga ITL i7 1165G7 (20WE004EVN)",
        "img": "Picture/13.jpg",
        "brand": "Lenovo",
        "price": "26490000"
    },
    {
        "id": "0021",
        "name": "Laptop Lenovo Ideapad Gaming 3 15IMH05 i7 10750H",
        "img": "Picture/14.jpg",
        "brand": "Lenovo",
        "price": "24640000"
    },
    {
        "id": "0022",
        "name": "Lenovo Thinpad X1 Nano i5 1130G7",
        "img": "Picture/15.jpg",
        "brand": "Lenovo",
        "price": "46499000"
    },
    {
        "id": "0023",
        "name": "Dell XPS 13 9310 i7 1165G7 (JGNH62)",
        "img": "Picture/16.jpg",
        "brand": "Dell",
        "price": "56990000"
    },
    {
        "id": "0024",
        "name": "Dell Gaming G15 5515 R7 5800H (70258051)",
        "img": "Picture/17.jpg",
        "brand": "Dell",
        "price": "33390000"
    },
    {
        "id": "0025",
        "name": "Dell Inspiron 7501 i5 10300H (N5I5012W)",
        "img": "Picture/18.jpg",
        "brand": "Dell",
        "price": "30490000"
    },
    {
        "id": "0026",
        "name": "Dell Latitude 3520 i7 1165G7 (70261780)",
        "img": "Picture/19.jpg",
        "brand": "Dell",
        "price": "29440000"
    },
    {
        "id": "0027",
        "name": "Dell Vostro 3400 i7 1165G7 (V4I7015W)",
        "img": "Picture/20.jpg",
        "brand": "Dell",
        "price": "24690000"
    },
    {
        "id": "0028",
        "name": "MSI Gaming GE66 Raider 11UH i7 11800H (259VN)",
        "img": "Picture/21.jpg",
        "brand": "MSI",
        "price": "75190000"
    },
    {
        "id": "0029",
        "name": "MSI Gaming GS66 Stealth 11UG i7 11800H (219VN)",
        "img": "Picture/22.jpg",
        "brand": "MSI",
        "price": "62490000"
    },
    {
        "id": "0030",
        "name": "MSI Summit E16 Flip A11UCT i7 1195G7 (082VN)",
        "img": "Picture/23.jpg",
        "brand": "MSI",
        "price": "44640000"
    },
    {
        "id": "0031",
        "name": "MSI Prestige 15 A11SC i7 1185G7 (052VN)",
        "img": "Picture/24.jpg",
        "brand": "MSI",
        "price": "34990000"
    },
    {
        "id": "0032",
        "name": "MSI GF75 Thin 10SCXR i7 10750H (068VN)",
        "img": "Picture/25.jpg",
        "brand": "MSI",
        "price": "22490000"
    },
    {
        "id": "0033",
        "name": "Acer Predator Triton 300 PT315 53 71DJ i7 11800H",
        "img": "Picture/26.jpg",
        "brand": "Acer",
        "price": "46990000"
    },
    {
        "id": "0034",
        "name": "Acer Nitro 5 Gaming AN515 57 5831 i5 11400H",
        "img": "Picture/27.jpg",
        "brand": "Acer",
        "price": "31390000"
    },
    {
        "id": "0035",
        "name": "Acer Swift 5 SF514 53T 720R i7 8565U (NX.H7HSV002)",
        "img": "Picture/28.jpg",
        "brand": "Acer",
        "price": "26290000"
    },
    {
        "id": "0036",
        "name": "Acer Aspire 7 Gaming A715 42G R6ZR R5 5500U",
        "img": "Picture/29.jpg",
        "brand": "Acer",
        "price": "20490000"
    },
    {
        "id": "0037",
        "name": "Acer Predator Helios PH315 54 75YD i7 11800H",
        "img": "Picture/30.jpg",
        "brand": "Acer",
        "price": "36990000"
    }
]