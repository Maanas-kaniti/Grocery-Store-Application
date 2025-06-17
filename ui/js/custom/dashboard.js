document.addEventListener("DOMContentLoaded", function () {
  // JSON data by API call for order table
  fetch(orderListApiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        let table = "";
        let totalCost = 0;

        data.forEach((order) => {
          totalCost += parseFloat(order.total);
          table += `
            <tr>
              <td>${order.datetime}</td>
              <td>${order.order_id}</td>
              <td>${order.customer_name}</td>
              <td>${parseFloat(order.total).toFixed(2)} Rs</td>
            </tr>
          `;
        });

        table += `
          <tr>
            <td colspan="3" style="text-align: end"><b>Total</b></td>
            <td><b>${totalCost.toFixed(2)} Rs</b></td>
          </tr>
        `;

        const tbody = document.querySelector("table tbody");
        if (tbody) {
          tbody.innerHTML = table;
        }
      }
    })
    .catch((error) => console.error("Error fetching order data:", error));
});
