const productModal = document.getElementById("productModal");
<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", async function () {
  //JSON data by API call
  try {
    const response = await fetch(productListApiUrl);
    const data = await response.json();

    if (data) {
      let table = "";
      data.forEach(function (product) {
        table +=
          '<tr data-id="' +
          product.product_id +
          '" data-name="' +
          product.name +
          '" data-unit="' +
          product.uom_id +
          '" data-price="' +
          product.price_per_unit +
          '">' +
          "<td class='text-center px-6 py-4'>" +
          product.name +
          "</td>" +
          "<td class='text-center px-6 py-4'>" +
          product.uom_name +
          "</td>" +
          "<td class='text-center px-6 py-4'>" +
          product.price_per_unit +
          "</td>" +
          '<td class="text-center px-6 py-4"><button class="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg delete-product">Delete</button></td></tr>';
      });

      const tableBody = document.getElementById("productsTableBody");
      if (tableBody) {
        tableBody.innerHTML = table;
      }
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
=======

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
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
});

// Save Product
document.getElementById("saveProduct").addEventListener("click", function () {
<<<<<<< HEAD
  // If we found id value in form then update product detail
  const form = document.getElementById("productForm");
  const formData = new FormData(form);
  const data = Array.from(formData.entries());

  const requestPayload = {
    product_name: null,
    uom_id: null,
    price_per_unit: null,
  };

  for (let i = 0; i < data.length; ++i) {
    const element = data[i];
    switch (element[0]) {
      case "name":
        requestPayload.product_name = element[1];
        break;
      case "uoms":
        requestPayload.uom_id = element[1];
        break;
      case "price":
        requestPayload.price_per_unit = element[1];
        break;
    }
  }

=======
  const formData = new FormData(document.getElementById("productForm"));
  const requestPayload = {
    product_name: formData.get("name"),
    uom_id: formData.get("uoms"),
    price_per_unit: formData.get("price"),
  };

>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
  callApi("POST", productSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});

<<<<<<< HEAD
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-product")) {
    const tr = e.target.closest("tr");
    const data = {
      product_id: tr.dataset.id,
    };
    const isDelete = confirm(
      "Are you sure to delete " + tr.dataset.name + " item?"
    );
    if (isDelete) {
      callApi("POST", productDeleteApiUrl, data);
=======
// Delete product
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-product")) {
    const tr = event.target.closest("tr");
    const productId = tr.getAttribute("data-id");
    const productName = tr.getAttribute("data-name");

    const isDelete = confirm(`Are you sure to delete ${productName} item?`);
    if (isDelete) {
      callApi("POST", productDeleteApiUrl, { product_id: productId });
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
    }
  }
});

<<<<<<< HEAD
// Reset modal when closed
function resetProductModal() {
  document.getElementById("id").value = "0";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("modalTitle").textContent = "Add New Product";
}

// Load UOM data when modal is opened
async function loadUOMData() {
  //JSON data by API call
  try {
    const response = await fetch(uomListApiUrl);
    const data = await response.json();

    if (data) {
      let options = '<option value="">--Select--</option>';
      data.forEach(function (uom) {
        options +=
          '<option value="' + uom.uom_id + '">' + uom.uom_name + "</option>";
      });

      const uomsSelect = document.getElementById("uoms");
      if (uomsSelect) {
        uomsSelect.innerHTML = options;
      }
    }
  } catch (error) {
    console.error("Failed to fetch UOMs:", error);
  }
=======
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
>>>>>>> 6c51447b3151ec8e30dd04cbc5502c70fe3db86f
}
