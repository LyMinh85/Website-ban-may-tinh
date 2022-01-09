let perPage = 8;
let currentPage = 1;
let start = 0;
let end = perPage;
let count = [];

var filterMode = false;
function enableFilter() {
    if (getInputValue('filter') == 'filter') {
        count = [];
        filterMode = false;
    }
    else filterMode = true;
    console.log(filterMode);
}
function disableFilter() {
    filterMode = false;
    console.log(filterMode);
}
function innerProduct() {
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let productContent = '';
    let linkTrademark = '';
    let titleTrademark = '';

    //lấy url và tách bằng ?
    var url = window.location.href;
    var id = url.split('?');
    console.log(id)

    //Lấy tên thương hiệu
    let id1 = JSON.stringify(id[1]).split(/[^a-zA-Z]+/);
    trademarkProduct = id1[1];
    console.log(trademarkProduct);

    //kiểm tra đang tìm kiếm
    let id3 = JSON.stringify(id[3]).split(/[^a-zA-Z]+/);
    id3 = id3[1];
    console.log(id3);

    //lấy tên sản phẩm
    let id2 = JSON.stringify(id[2]).split(/[^a-zA-Z]+/);
    var nameProduct = '';
    for (var i = 1; i < id2.length; i++) {
        nameProduct += id2[i] + ' ';
    }
    nameProduct = nameProduct.toUpperCase();
    console.log(nameProduct)

    //Không tìm kiếm => Inner hết
    if (id3 != 'find') {
        if (filterMode == true) {
            console.log(getInputValue('filter'));
            if (getInputValue('filter') == 'low') {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) > parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
            else {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) < parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
        }

        product.forEach((productItem, index) => {
            index++;
            if (productItem.trademark == trademarkProduct.toUpperCase()) {
                count.push(index);
                console.log(count.length)
                if (count.length > start && count.length <= end) {
                    productContent += `<div class="cartegory-right-cotent-item">
                    <a href="detail-product.html? '+ ${productItem.trademark} +' '+${productItem.idproduct}+'">
                        <img style="width:80%" src="img/${productItem.img}"/>
                        <h1>${productItem.name}</h1>
                        <p>${productItem.money}.000 đ</p>
                    </a>
                    </div>`;
                    linkTrademark = <p>${productItem.trademark}</p>;
                    titleTrademark = <p>${productItem.trademark}</p>;
                }
            }

        });
        document.getElementById('cartegory-right-cotent').innerHTML = productContent;
        document.getElementById('link-trademark').innerHTML = linkTrademark;
        document.getElementById('title-trademark').innerHTML = titleTrademark;
    }
    //Nếu đang tìm kiếm => lọc tên
    else {
        if (filterMode == true) {
            console.log(getInputValue('filter'));
            count = [];
            if (getInputValue('filter') == 'low') {
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) > parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
            else {
                count = [];
                for (var i = 0; i < product.length - 1; i++)
                    for (var j = i + 1; j < product.length; j++) {
                        if (parseFloat(product[i].money, 3) < parseFloat(product[j].money, 3)) {
                            var tmp = product[i];
                            product[i] = product[j];
                            product[j] = tmp;
                        }
                    }
            }
        }
    }
    console.log(nameProduct)
    product.forEach((productItem) => {
        if (productItem.trademark == trademarkProduct.toUpperCase() && nameProduct.search(productItem.name.toUpperCase()) != -1) {
            productContent += `<div class="cartegory-right-cotent-item">
                    <a href="detail-product.html? '+ ${productItem.trademark} +' '+${productItem.idproduct}+'">
                        <img style="width:80%" src="img/${productItem.img}"/>
                        <h1>${productItem.name}</h1>
                        <p>${productItem.money}.000 đ</p>
                    </a>
                    </div>`;
            linkTrademark = <p>${productItem.trademark}</p>;
            titleTrademark = <p>${productItem.trademark}</p>;
        }
    });
    document.getElementById('cartegory-right-cotent').innerHTML = productContent;
    document.getElementById('link-trademark').innerHTML = linkTrademark;
    document.getElementById('title-trademark').innerHTML = titleTrademark;

}
innerProduct();
let totalPage = Math.ceil(count.length / perPage)
function getCurrentPage(currentPage) {
    count = [];
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
}
function renderPage() {
    let page = ``;
    for (let i = 1; i <= totalPage; i++) {
        page += <a onclick='clickPage()' style="margin:0 10px; cursor: pointer"><li>${i}</li></a>;
    }
    document.getElementById('page').innerHTML = page;
}
function clickPage() {
    const currentPages = document.querySelectorAll('#page a');
    for (let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', () => {
            let value = i + 1;
            currentPage = value;
            getCurrentPage(currentPage);
            innerProduct();
        })
    }
}
function nextPage() {
    currentPage++;
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    getCurrentPage(currentPage)
    innerProduct();
}
function prevPage() {
    currentPage--;
    if (currentPage <= 1) {
        currentPage = 1;
    }
    getCurrentPage(currentPage)
    innerProduct();
}