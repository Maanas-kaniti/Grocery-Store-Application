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
