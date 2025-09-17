<<<<<<< HEAD

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

# Enjoy managing your grocery store!

# Grocery Store Database Schema

## 1. `uom` (Unit of Measure Table)

**Columns:**

- `uom_id` → Primary Key, auto-increment.
- `uom_name` → Describes the unit (e.g., "kg", "litre", "each").

**Purpose:** Stores all possible units of measurement so products don’t repeat the same text everywhere.  
**Normalization Benefit:** If you ever change "kilogram" to "kg", you update it once in this table instead of across all products.

---

## 2. `products` (Products Table)

**Columns:**

- `product_id` → Primary Key, auto-increment.
- `name` → Product name (e.g., "Toothpaste", "Rice").
- `uom_id` → Foreign Key referencing `uom(uom_id)`.
- `price_per_unit` → Cost of a single unit (decimal with 2 places).

**Purpose:** Stores the product catalog. Each product must have a valid unit (linked to `uom`).

---

## 3. `orders` (Orders Table)

**Columns:**

- `order_id` → Primary Key, auto-increment.
- `customer_name` → Name of the buyer.
- `total` → Total cost of the order.
- `datetime` → When the order was placed.

**Purpose:** Represents one order (the "header"). Think of it like a receipt with summary details.

---

## 4. `order_details` (Order Line Items Table)

**Columns:**

- `order_id` → Foreign Key referencing `orders(order_id)`.
- `product_id` → Foreign Key referencing `products(product_id)`.
- `quantity` → Amount purchased (e.g., 2.5 kg).
- `total_price` → Price for that product line (`quantity × product price`).

**Purpose:** Breaks down each order into line items. Each row = one product in that order.

---

## 🔗 Relationships Between Tables

### `uom` → `products`

- **Type:** One-to-Many
- One `uom` (e.g., “kg”) can be linked to many products (Rice, Wheat, Sugar).
- A product must belong to exactly one `uom`.

### `products` → `order_details`

- **Type:** One-to-Many
- A product can appear in many orders.
- Each `order_details` entry must reference a valid product.

### `orders` → `order_details`

- **Type:** One-to-Many
- One order can have multiple line items.
- Each `order_details` record belongs to exactly one order.

---

## 📌 Overall Schema Structure

```
uom ⟶ products ⟶ order_details ⟵ orders
```

This is a **classic e-commerce schema**:

- `orders` = header
- `order_details` = line items
- `products` = catalog
- `uom` = supporting reference table

---

## ✅ Example Data

- In `uom`:  
  `(1, 'kg'), (2, 'each')`

- In `products`:  
  `(101, 'Rice', 1, 50.00), (102, 'Toothpaste', 2, 30.00)`

- In `orders`:  
  `(201, 'Alice', 110.00, '2025-09-15 14:00:00')`

- In `order_details`:  
  `(201, 101, 2.0, 100.00)` → Alice bought 2 kg Rice  
  `(201, 102, 1.0, 30.00)` → Alice bought 1 Toothpaste

**Order total = 130.00 ✅**

---

## 📊 ER Diagram

### Basic ER Diagram

- One `uom` → Many `products`
- One `product` → Many `order_details`
- One `order` → Many `order_details`

### Normalized ERD (Crow’s Foot Notation)

- **UOM → Products:** One UOM can be linked to many Products.
- **Products → OrderDetails:** One Product can appear in many Order Details.
- **Orders → OrderDetails:** One Order can have many Order Details.

This layout mirrors a professional database ERD with clear **1-to-many cardinalities**.
