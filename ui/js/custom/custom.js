// Define your api here
const productListApiUrl = "http://127.0.0.1:2001/getProducts";
const uomListApiUrl = "http://127.0.0.1:2001/getUOM";
const productSaveApiUrl = "http://127.0.0.1:2001/insertProduct";
const productDeleteApiUrl = "http://127.0.0.1:2001/deleteProduct";
const orderListApiUrl = "http://127.0.0.1:2001/getAllOrders";
const orderSaveApiUrl = "http://127.0.0.1:2001/insertOrder";

// For product drop in order
const productsApiUrl = "https://fakestoreapi.com/products";

function callApi(method, url, data) {
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text(); // or .json() if expecting JSON
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("API call failed:", error);
    });
}

function calculateValue() {
  let total = 0;
  document.querySelectorAll(".product-item").forEach((item) => {
    const qtyInput = item.querySelector(".product-qty");
    const priceInput = item.querySelector("#product_price");
    const itemTotalInput = item.querySelector("#item_total");

    let qty = parseFloat(qtyInput.value) || 0;
    let price = parseFloat(priceInput.value) || 0;

    const totalPrice = price * qty;
    itemTotalInput.value = totalPrice.toFixed(2);

    total += totalPrice;
  });

  const grandTotalInput = document.querySelector("#product_grand_total");
  if (grandTotalInput) {
    grandTotalInput.value = total.toFixed(2);
  }
}

function orderParser(order) {
  return {
    id: order.id,
    date: order.employee_name,
    orderNo: order.employee_name,
    customerName: order.employee_name,
    cost: parseInt(order.employee_salary),
  };
}

function productParser(product) {
  return {
    id: product.id,
    name: product.employee_name,
    unit: product.employee_name,
    price: product.employee_name,
  };
}

function productDropParser(product) {
  return {
    id: product.id,
    name: product.title,
  };
}
