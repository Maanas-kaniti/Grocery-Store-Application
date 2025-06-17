let productPrices = {};

document.addEventListener("DOMContentLoaded", function () {
  // Fetch product list and populate dropdown
  fetch(productListApiUrl)
    .then((res) => res.json())
    .then((response) => {
      productPrices = {};
      if (response) {
        let options = `<option value="">--Select--</option>`;
        response.forEach((product) => {
          options += `<option value="${product.product_id}">${product.name}</option>`;
          productPrices[product.product_id] = product.price_per_unit;
        });

        document.querySelectorAll(".product-box select").forEach((select) => {
          select.innerHTML = options;
        });
      }
    });
});

// Add More Button
document.getElementById("addMoreButton").addEventListener("click", function () {
  const productBoxHTML = document.querySelector(".product-box").innerHTML;
  const container = document.querySelector(".product-box-extra");

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("row");
  tempDiv.innerHTML = productBoxHTML;
  container.appendChild(tempDiv);

  const removeBtn = tempDiv.querySelector(".remove-row");
  if (removeBtn) removeBtn.classList.remove("hideit");

  const price = tempDiv.querySelector(".product-price");
  if (price) price.textContent = "0.0";

  const qty = tempDiv.querySelector(".product-qty");
  if (qty) qty.value = "1";

  const total = tempDiv.querySelector(".product-total");
  if (total) total.textContent = "0.0";
});

// Remove row
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-row")) {
    const row = e.target.closest(".row");
    if (row) row.remove();
    calculateValue();
  }
});

// On product selection change
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("cart-product")) {
    const productId = e.target.value;
    const price = productPrices[productId] || 0;
    const row = e.target.closest(".row");
    if (row) {
      const priceInput = row.querySelector("#product_price");
      if (priceInput) priceInput.value = price;
      calculateValue();
    }
  }
});

// On quantity change
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("product-qty")) {
    calculateValue();
  }
});

// Save Order
document.getElementById("saveOrder").addEventListener("click", function () {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const entries = [...formData.entries()];

  const requestPayload = {
    customer_name: null,
    grand_total: null,
    order_details: [],
  };

  let lastDetail = null;

  entries.forEach(([name, value]) => {
    switch (name) {
      case "customerName":
        requestPayload.customer_name = value;
        break;
      case "product_grand_total":
        requestPayload.grand_total = value;
        break;
      case "product":
        lastDetail = {
          product_id: value,
          quantity: null,
          total_price: null,
        };
        requestPayload.order_details.push(lastDetail);
        break;
      case "qty":
        if (lastDetail) lastDetail.quantity = value;
        break;
      case "item_total":
        if (lastDetail) lastDetail.total_price = value;
        break;
    }
  });

  callApi("POST", orderSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});
