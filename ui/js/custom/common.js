// Define your api here
const productListApiUrl = "http://127.0.0.1:200/getProducts";
const uomListApiUrl = "http://127.0.0.1:200/getUOM";
const productSaveApiUrl = "http://127.0.0.1:200/insertProduct";
const productDeleteApiUrl = "http://127.0.0.1:200/deleteProducts";
const orderListApiUrl = "http://127.0.0.1:200/getAllOrders";
const orderSaveApiUrl = "http://127.0.0.1:200/insertOrder";
const orderDeleteApiUrl = "http://127.0.0.1:200/deleteOrder";

// For product drop in order
const productsApiUrl = "https://fakestoreapi.com/products";

async function callApi(method, url, data) {
  try {
    let options = { method };
    if (method === "POST" && data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      options.body = formData;
    }
    const response = await fetch(url, options);
    if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("API call failed:", error);
  }
}

function calculateValue() {
  let total = 0;
  document.querySelectorAll(".product-item").forEach(function (item) {
    const qty = parseFloat(item.querySelector(".product-qty").value);
    const price = parseFloat(item.querySelector(".product-price").value);
    const itemTotal = price * qty;
    item.querySelector(".product-total").value = itemTotal.toFixed(2);
    total += itemTotal;
  });
  document.getElementById("product_grand_total").value = total.toFixed(2);
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

//To enable bootstrap tooltip globally
// document.addEventListener('DOMContentLoaded', function() {
//     const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
//     tooltipTriggerList.map(function (tooltipTriggerEl) {
//         return new bootstrap.Tooltip(tooltipTriggerEl);
//     });
// });
