function getBillID()
{
    checkBillLocalStorage();


    if(billArray == null)
        return "0001";
    
    let idPrev = billArray[billArray.length - 1].id;
    let size = parseInt(idPrev, 10) + 1;
    let n = size.toString();
    let number_zeo = 4 - n.length;
    for(let i = 0; i < number_zeo; i++)
        n = '0' + n;
    return n;
}

function getDateNow()
{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

document.querySelector('#goToBill').addEventListener('click', function()
{
    window.location.href = "index.html?bill";
});


function removeBill(id)
{
    checkBillLocalStorage();

    let billIndex = billArray.findIndex(x => x.id == id);

    billArray.splice(billIndex, 1);

    localStorage.setItem('bills', JSON.stringify(billArray));

    location.reload();
}