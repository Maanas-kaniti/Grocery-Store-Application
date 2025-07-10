<<<<<<< HEAD
const productPrices = {};

document.addEventListener("DOMContentLoaded", async function () {
  //Json data by api call for order table
  try {
    const response = await fetch(productListApiUrl);
    let data = await response.json();
    console.log(data);
    if (data) {
      let options =
        '<select value="" class="cart-product"><option value="--select--">--Select--</option></select>';
      data.forEach(function (product) {
        options +=
          '<option value="' +
          product.product_id +
          '">' +
          product.name +
          "</option>";
        productPrices[product.product_id] = product.price_per_unit;
        console.log(productPrices);
      });

      const productBox = document.querySelector(".product-box");
      if (productBox) {
        const select = productBox.querySelector("select");
        if (select) {
          select.innerHTML = options;
        }

        // Add the first product item to the order
        const productBoxExtra = document.querySelector(".product-box-extra");
        if (productBoxExtra) {
          const productItem = productBox.querySelector(".product-item");
          if (productItem) {
            const clonedItem = productItem.cloneNode(true);
            productBoxExtra.appendChild(clonedItem);
          }
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});

document.getElementById("addMoreButton").addEventListener("click", function () {
  const productBox = document.querySelector(".product-box");
  const productBoxExtra = document.querySelector(".product-box-extra");

  if (productBox && productBoxExtra) {
    const productItem = productBox.querySelector(".product-item");
    if (productItem) {
      const clonedItem = productItem.cloneNode(true);

      // Reset the cloned item
      const priceInput = clonedItem.querySelector(".product-price");
      const qtyInput = clonedItem.querySelector(".product-qty");
      const totalInput = clonedItem.querySelector(".product-total");
      const removeBtn = clonedItem.querySelector(".remove-row");
      const productSelect = clonedItem.querySelector(".cart-product");

      if (priceInput) priceInput.value = "0.00";
      if (qtyInput) qtyInput.value = "1";
      if (totalInput) totalInput.value = "0.00";
      if (removeBtn) removeBtn.classList.remove("hideit");
      if (productSelect) productSelect.value = "";

      productBoxExtra.appendChild(clonedItem);
    }
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-row")) {
    e.target.closest(".product-item").remove();
=======
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
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
    calculateValue();
  }
});

<<<<<<< HEAD
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("cart-product")) {
    const product_id = e.target.value;
    const price = productPrices[product_id];
    const row = e.target.closest(".product-item");
    const priceInput = row.querySelector(".product-price");
    if (priceInput) {
      priceInput.value = price;
    }
    calculateValue();
  }
});

=======
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
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("product-qty")) {
    calculateValue();
  }
});

<<<<<<< HEAD
document.getElementById("saveOrder").addEventListener("click", function () {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const data = Array.from(formData.entries());

  const requestPayload = {
    customer_name: null,
    total: null,
    order_details: [],
  };

  for (let i = 0; i < data.length; ++i) {
    const element = data[i];
    let lastElement = null;

    switch (element[0]) {
      case "customerName":
        requestPayload.customer_name = element[1];
        break;
      case "product_grand_total":
        requestPayload.grand_total = element[1];
        break;
      case "product":
        requestPayload.order_details.push({
          product_id: element[1],
          quantity: null,
          total_price: null,
        });
        break;
      case "qty":
        lastElement =
          requestPayload.order_details[requestPayload.order_details.length - 1];
        lastElement.quantity = element[1];
        break;
      case "item_total":
        lastElement =
          requestPayload.order_details[requestPayload.order_details.length - 1];
        lastElement.total_price = element[1];
        break;
    }
  }
=======
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
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f

  callApi("POST", orderSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});
