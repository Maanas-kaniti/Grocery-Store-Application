# Grocery Store Management System (GSMS)

A simple web-based system for managing grocery store products and orders.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- pip (Python package manager)
- MySQL (or compatible database)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Grocery-Store
```

### 2. Set Up the Database

- Create a MySQL database (e.g., `grocery_store`).
- Create the following tables:

```sql
CREATE TABLE uom (
  uom_id INT PRIMARY KEY AUTO_INCREMENT,
  uom_name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  uom_id INT,
  price_per_unit DECIMAL(10,2),
  FOREIGN KEY (uom_id) REFERENCES uom(uom_id)
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(100),
  total DECIMAL(10,2),
  datetime DATETIME
);

CREATE TABLE order_details (
  order_id INT,
  product_id INT,
  quantity DECIMAL(10,2),
  total_price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

- Update your database connection settings in `backend/sql_connection.py` as needed.

### 3. Install Python Dependencies

```bash
pip install flask flask-cors mysql-connector-python
```

### 4. Start the Backend Server

```bash
cd backend
python server.py
```

### 5. Open the Frontend

- Open `ui/index.html` in your browser.

---

## 📁 Project File Structure

```
Grocery-Store/
  backend/
    orders_dao.py         # Order-related DB logic
    products_dao.py       # Product-related DB logic
    server.py             # Flask backend server
    sql_connection.py     # DB connection helper
    uom_dao.py            # Unit of measurement logic
  ui/
    images/               # Place your images here (e.g., bg.jpg)
    index.html            # Dashboard (orders overview)
    manage-product.html   # Product management UI
    order.html            # Order creation UI
    js/
      custom/
        common.js         # Shared JS logic
        dashboard.js      # Dashboard JS logic
        manage-product.js # Product management JS
        order.js          # Order page JS
  README.md
```

---

## 🗄️ Database Table Relationships

- **products**
  - `uom_id` → **uom**(`uom_id`)
- **order_details**
  - `order_id` → **orders**(`order_id`)
  - `product_id` → **products**(`product_id`)

### Entity-Relationship Diagram (Textual)

```
[uom]
  |--< (uom_id)
  |
[products] --< (product_id)
  |           ^
  |           |
[order_details] >-- (order_id) -- [orders]
```

---

## 🖼️ Adding Images

- Place your images in the `ui/images/` directory.
- To reference an image in the README, use a relative path. Example:

```
![Background](ui/images/bg.jpg)
```

---

## ℹ️ Notes

- Do **not** commit `__pycache__` or `.pyc` files. Add these to your `.gitignore`.
- For any issues, check your database connection and ensure the backend server is running before using the frontend.

---

Enjoy managing your grocery store!
