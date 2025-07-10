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
    calculateValue();
  }
});

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

document.addEventListener("change", function (e) {
  if (e.target.classList.contains("product-qty")) {
    calculateValue();
  }
});

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

  callApi("POST", orderSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});
