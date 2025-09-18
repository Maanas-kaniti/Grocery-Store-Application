document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(orderListApiUrl);
    const data = await response.json();

    if (data) {
      let table = "";
      let totalCost = 0;

      data.forEach(function (order, idx) {
        totalCost += parseFloat(order.total);
        const detailsRowId = `order-details-${order.order_id}`;
        table +=
          "<tr>" +
          "<td class='text-center px-6 py-4'>" +
          order.datetime +
          "</td>" +
          "<td class='text-center px-6 py-4'>" +
          order.order_id +
          "</td>" +
          "<td class='text-center px-6 py-4'>" +
          order.customer_name +
          "</td>" +
          "<td class='text-center px-6 py-4'>" +
          order.total.toFixed(2) +
          " Rs</td>" +
          "<td class='text-center px-6 py-4'>" +
          '<button onclick="deleteOrder(' +
          order.order_id +
          ')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200">' +
          '<i class="zmdi zmdi-delete"></i> Delete' +
          "</button>" +
          "</td>" +
          // Expand/collapse button
          `<td class='text-center px-2 py-4'>` +
          `<button onclick="toggleOrderDetails('${detailsRowId}')" class="text-primary-600 hover:text-primary-900 focus:outline-none">` +
          `<i class="zmdi zmdi-caret-down"></i>` +
          `</button>` +
          `</td>` +
          "</tr>";

        // Expandable details row (hidden by default)
        table +=
          `<tr id="${detailsRowId}" class="hidden bg-blue-50">` +
          `<td colspan="6" class="px-6 py-4">` +
          `<div class="overflow-x-auto">` +
          `<table class="w-full text-sm">` +
          `<thead><tr>` +
          `<th class='px-2 py-2 text-left'>Product</th>` +
          `<th class='px-2 py-2 text-left'>Quantity</th>` +
          `<th class='px-2 py-2 text-left'>Price/Unit</th>` +
          `<th class='px-2 py-2 text-left'>Total</th>` +
          `</tr></thead>` +
          `<tbody>` +
          (order.order_details && order.order_details.length > 0
            ? order.order_details
                .map(
                  (prod) =>
                    `<tr>` +
                    `<td class='px-2 py-1'>${prod.product_name}</td>` +
                    `<td class='px-2 py-1'>${prod.quantity}</td>` +
                    `<td class='px-2 py-1'>${prod.price_per_unit}</td>` +
                    `<td class='px-2 py-1'>${prod.total_price}</td>` +
                    `</tr>`
                )
                .join("")
            : `<tr><td colspan='4' class='text-center text-gray-400'>No products</td></tr>`) +
          `</tbody></table></div></td></tr>`;
      });

      table +=
        '<tr><td colspan="4" class="text-center px-6 py-4"><b>Total</b></td><td class="text-center px-6 py-4"><b>' +
        totalCost.toFixed(2) +
        " Rs</b></td></tr>";

      const tableBody = document.getElementById("ordersTableBody");
      if (tableBody) {
        tableBody.innerHTML = table;
      }
    }
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
});

async function deleteOrder(orderId) {
  if (confirm("Are you sure you want to delete this order?")) {
    try {
      const formData = new FormData();
      formData.append("order_id", orderId);

      const response = await fetch(orderDeleteApiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Order deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed to delete order. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete order. Please try again.");
    }
  }
}

// Add this function to toggle details
window.toggleOrderDetails = function (rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.classList.toggle("hidden");
  }
};
