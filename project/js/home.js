document.querySelector('.user-icon').addEventListener("click", function()
{
    document.querySelector('.user-icon').querySelector('.dropdown-content').classList.toggle("show");
})

document.querySelector('.header-navbar').querySelectorAll('.item').forEach(element => {
    let url = window.location.href.split("?")[1];
    if(element.dataset.link == url)
        element.classList.add("active");
    else
        element.classList.remove("active");
});

function addCommaNumberFormat(index)
{
    let input = document.querySelector('.filter-with-price').querySelectorAll('input');
    input[index].value = addCommaToPrice(disableFormatComma(input[index].value));
}


function checkKhoangGia()
{
    let input = document.querySelector('.filter-with-price').querySelectorAll('input');
    
    let priceFrom = disableFormatComma(input[0].value);
    let priceTo = disableFormatComma(input[1].value);

    input[0].classList.remove('error');
    input[1].classList.remove('error');

    if(priceFrom == '')
    {
        input[0].classList.add('error');
        input[0].placeholder = 'Vui lòng nhập giá';
        return;
    }

    if(isNaN(priceFrom))
    {
        console.log(input[0].value);
        input[0].classList.add('error');
        input[0].placeholder = 'Vui lòng nhập giá bằng số';
        return;
    }

    if(priceTo == '')
    {
        input[1].classList.add('error');
        input[1].placeholder = 'Vui lòng nhâpj giá';
        return;
    }

    if(isNaN(priceTo))
    {
        input[1].classList.add('error');
        input[1].placeholder = 'Vui lòng nhập giá bằng số';
        return;
    }

    if(priceFrom < 0)
    {
        input[0].classList.add('error');
        return;
    }

    if(priceTo < 0)
    {
        input[1].classList.add('error');
        return;
    }

    let str = window.location.href.split('&');

    console.log(str);

    if(str[2] == undefined)
    {
        window.location.href += '&' + priceFrom + '-' + priceTo;
    }
    else 
    {
        str[2] = '&' + priceFrom + '-' + priceTo;
        window.location.href = str[0] + "&" + str[1] + str[2];
    }

    
    return;
}