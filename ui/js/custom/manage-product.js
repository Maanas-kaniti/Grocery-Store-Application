const productModal = document.getElementById("productModal");
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
});

// Save Product
document.getElementById("saveProduct").addEventListener("click", function () {
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

  callApi("POST", productSaveApiUrl, {
    data: JSON.stringify(requestPayload),
  });
});

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
    }
  }
});

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
}
