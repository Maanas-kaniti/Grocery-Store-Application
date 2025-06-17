const productModal = document.getElementById("productModal");

document.addEventListener("DOMContentLoaded", function () {
  // Fetch and populate product table
  fetch(productListApiUrl)
    .then((res) => res.json())
    .then((response) => {
      if (response) {
        let table = "";
        response.forEach((product) => {
          table += `
            <tr data-id="${product.product_id}" data-name="${product.name}" data-unit="${product.uom_id}" data-price="${product.price_per_unit}">
              <td>${product.name}</td>
              <td>${product.uom_name}</td>
              <td>${product.price_per_unit}</td>
              <td><span class="btn btn-xs btn-danger delete-product">Delete</span></td>
            </tr>
          `;
        });
        const tbody = document.querySelector("table tbody");
        if (tbody) tbody.innerHTML = table;
      }
    });
});

// Save Product
document.getElementById("saveProduct").addEventListener("click", function () {
  const formData = new FormData(document.getElementById("productForm"));
  const requestPayload = {
    product_name: formData.get("name"),
    uom_id: formData.get("uoms"),
    price_per_unit: formData.get("price"),
  };

  callApi("POST", productSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});

// Delete product
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-product")) {
    const tr = event.target.closest("tr");
    const productId = tr.getAttribute("data-id");
    const productName = tr.getAttribute("data-name");

    const isDelete = confirm(`Are you sure to delete ${productName} item?`);
    if (isDelete) {
      callApi("POST", productDeleteApiUrl, { product_id: productId });
    }
  }
});

// Modal event handling
if (productModal) {
  productModal.addEventListener("hide.bs.modal", function () {
    document.getElementById("id").value = "0";
    document.getElementById("name").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("price").value = "";
    productModal.querySelector(".modal-title").textContent = "Add New Product";
  });

  productModal.addEventListener("show.bs.modal", function () {
    // Populate UOM dropdown
    fetch(uomListApiUrl)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          let options = '<option value="">--Select--</option>';
          response.forEach((uom) => {
            options += `<option value="${uom.uom_id}">${uom.uom_name}</option>`;
          });
          document.getElementById("uoms").innerHTML = options;
        }
      });
  });
}
