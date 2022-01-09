//Hàm dùng để tăng giảm số lượng mặt hàng cần mua, dk => 1 và <= 99
function btn_change_amount(option) {
  let amount = document
    .querySelector("#page-product-briefing-left-amount")
    .querySelector(".amount-product");
  let i = parseInt(amount.dataset.value, 10);
  if (option == "-" && i > 1) {
    i--;
    amount.dataset.value = i;
    amount.innerHTML = i;
  } else if (option == "+" && i < 99) {
    i++;
    amount.dataset.value = i;
    amount.innerHTML = i;
  }
}
