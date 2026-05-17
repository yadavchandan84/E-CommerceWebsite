# 🛍️ Full‑Stack E‑Commerce App

A modern **full-stack e-commerce web application** built with **React (frontend)** and **Node.js + Express + Sequelize (backend)**.  
Supports **shopping cart**, **orders**, **delivery options**, and **tracking**, with persistence via SQLite in production.

---

**<h2>Table of Contents</h2>**

### •	 <ins>Features</ins>

### •	 <ins>Demo</ins>

### •	 <ins>Documentation</ins>

### •	 <ins>Usage</ins>

### •	 <ins>Tech Stack</ins>

### •	 <ins>Project Structure</ins>

### •	 <ins>Getting Started</ins>

### •	 <ins>Environment Variables</ins>

### •	 <ins>Commit History Highlights</ins>

### •	 <ins>Future Enhancements</ins>

### •	 <ins>Contributing</ins>

### •	 <ins>Contact</ins>

---

## ✨ Features

### 🖥️ Frontend (React + SPA)
- Built with **React + React Router** for smooth navigation (Home, Cart, Checkout, Orders, Tracking).
- Interactive **cart system** (add, update, delete, auto-feedback messages).
- **Delivery options** selector with shipping costs and estimated delivery times.
- **Search bar** with keyword filtering across products.
- Async API calls with **Axios**, using `async/await`.
- Reusable UI components for headers, order summary, delivery dates.
- **NotFoundPage** for invalid routes.
- SPA fallback to `index.html` for deep links.

### ⚙️ Backend (Node.js + Express + Sequelize)
- RESTful JSON API endpoints:
  - `/api/products` – list/search products  
  - `/api/delivery-options` – shipping choices  
  - `/api/cart-items` – CRUD cart operations  
  - `/api/orders` – create & fetch user orders  
  - `/api/payment-summary` – compute total + taxes  
  - `/api/reset` – reset database with seed data  
- **Sequelize** v6 models:
  - `Product` (UUID, rating, keywords as array getter/setter)  
  - `Order` (UUID, products array, computed totals, order time)  
  - `CartItem` (productId, qty, deliveryOptionId)  
  - `DeliveryOption` (id, delivery days, priceCents)  
- Default DB: **SQLite (via sql.js-as-sqlite3)** with persistence to `database.sqlite`.  
- Production-ready: Switches to **AWS RDS MySQL/Postgres** via `DB_TYPE` and `RDS_*` env vars.  
- Static asset serving: `/images` and SPA build output (`dist`).  

### 📦 Persistence
- SQLite is in-memory by default; Sequelize model hooks export DB changes to **`database.sqlite`** for durability.  
- Seed data for products, delivery options, cart, and orders auto-created on first run or via `/api/reset`.

### 💳 Payments & Orders
- **Payment summary endpoint**:
  - Subtotals products  
  - Adds delivery charges  
  - Applies 10% tax and returns computed totals  
- **Orders**:
  - Created from the cart  
  - Stores product list as JSON  
  - Cleans up cart after checkout

---

## Demo

https://github.com/user-attachments/assets/d14bb479-bdb4-43ab-b98c-a15ad2222ef4

---

## Documentation
Here's a list of all the URL Paths you can use with this backend and what each URL Path does.

**Products, Delivery Options**
- [GET /api/products](#get-apiproducts)
- [GET /api/delivery-options](#get-apidelivery-options)

**Cart**
- [GET /api/cart-items](#get-apicart-items)
- [POST /api/cart-items](#post-apicart-items)
- [PUT /api/cart-items/:productId](#put-apicart-itemsproductid)
- [DELETE /api/cart-items/:productId](#delete-apicart-itemsproductid)

**Orders**
- [GET /api/orders](#get-apiorders)
- [POST /api/orders](#post-apiorders)
- [GET /api/orders/:orderId](#get-apiordersorderid)

**Payment Summary, Reset**
- [GET /api/payment-summary](#get-apipayment-summary)
- [POST /api/reset](#post-apireset)
  
### GET /api/products
Returns a list of products.

**Query Parameters:**
- `search=...` (optional): Search term to find products by name or keywords

**Response:**
```js
[
  {
    "id": "uuid",
    "image": "string",
    "name": "string",
    "rating": {
      "stars": "number",
      "count": "number"
    },
    "priceCents": "number",
    "keywords": ["string"]
  }
]
```

### GET /api/delivery-options
Returns a list of all delivery options.

**Query Parameters:**
- `expand=estimatedDeliveryTime` (optional): includes estimated delivery times

**Response:**
```js
[
  {
    "id": "string",
    "deliveryDays": "number",
    "priceCents": "number",
    // Only included when expand=estimatedDeliveryTime
    "estimatedDeliveryTimeMs": "number"
  }
]
```

### GET /api/cart-items
Returns all items in the cart.

**Query Parameters:**
- `expand=product` (optional): include full product details

**Response:**
```js
[
  {
    "productId": "uuid",
    "quantity": "number",
    "deliveryOptionId": "string",
      // product object, only when expand=product
    "product": "object"
  }
]
```

### POST /api/cart-items
Adds a product to the cart.

**Request:**
```js
{
  "productId": "uuid",
  // Must be between 1 and 10
  "quantity": "number"
}
```

**Response:**
```js
{
  "productId": "uuid",
  "quantity": "number",
  "deliveryOptionId": "string",
}
```

### PUT /api/cart-items/:productId
Updates a cart item.

**URL Parameters:**
- `productId`: ID of the product to update

**Request:**
```js
{
   // Optional, must be ≥ 1
  "quantity": "number",
  
   // Optional
  "deliveryOptionId": "string"
}
```

**Response:**
```js
{
  "productId": "uuid",
  "quantity": "number",
  "deliveryOptionId": "string",
}
```

### DELETE /api/cart-items/:productId
Removes an item from the cart.

**URL Parameters:**
- `productId`: ID of the product to remove

**Response:**
- Status: 204 (No response)

### GET /api/orders
Returns all orders, sorted by most recent first.

**Query Parameters:**
- `expand=products` (optional): include full product details

**Response:**
```js
[
  {
    "id": "uuid",
    "orderTimeMs": "number",
    "totalCostCents": "number",
    "products": [
      {
        "productId": "uuid",
        "quantity": "number",
        "estimatedDeliveryTimeMs": "number",
         // product object, only when expand=products
        "product": "object"
      }
    ]
  }
]
```

### POST /api/orders
Creates a new order from the current cart items.

**Response:**
```js
{
  "id": "uuid",
  "orderTimeMs": "number",
  "totalCostCents": "number",
  "products": [
    {
      "productId": "uuid",
      "quantity": "number",
      "estimatedDeliveryTimeMs": "number",
    }
  ]
}
```
- Side effect: Cart is emptied

### GET /api/orders/:orderId
Returns a specific order.

**URL Parameters:**
- `orderId`: ID of the order

**Query Parameters:**
- `expand=products` (optional): include full product details

**Response:**
```js
{
  "id": "uuid",
  "orderTimeMs": "number",
  "totalCostCents": "number",
  "products": [
    {
      "productId": "uuid",
      "quantity": "number",
      "estimatedDeliveryTimeMs": "number",
        // product object, only when expand=products
      "product": "object"
    }
  ]
}
```

### GET /api/payment-summary
Calculates and returns the payment summary for the current cart.

**Response:**
```js
{
  "totalItems": "number",
  "productCostCents": "number",
  "shippingCostCents": "number",
  "totalCostBeforeTaxCents": "number",
  "taxCents": "number",
  "totalCostCents": "number"
}
```

### POST /api/reset
Resets the database to its default state.

**Response:**
- Status: 204 No Response
 
---

## Usage
- Browse products, filter via search, and add items to the cart.
- Update quantities, remove items, and choose delivery options.
- Proceed to checkout to create an order.
- View orders and track them with estimated delivery dates.
- Review payment summary for subtotal, shipping, tax, and total.

---

## 🚀 Tech Stack

**Frontend:**  
- React, React Router DOM  
- Axios (REST API integration)  

**Backend:**  
- Node.js (ES modules, top-level `await`)  
- Express (REST routing, JSON parsing, CORS, static middleware)  
- Sequelize ORM  
- SQLite (dev) / MySQL or Postgres (AWS RDS for prod)  

**Other Tools:**  
- ESLint (Airbnb-style rules; ES2021, Node + Browser env)  
- Nodemon (dev reload)  
- Archiver (bundling)  
- Patch-package  

---

## 📂 Project Structure

### Overview

The ecommerce backend has been reorganized following the Model-View-Controller (MVC) architecture pattern for better code organization, maintainability, and separation of concerns.

### Directory Structure

```
ecommerce-backend/
├── models/                 # Data models (Sequelize)
├── controllers/            # Business logic layer
├── views/                 # Presentation layer
├── routes/                # URL routing layer
├── defaultData/          # Seed data
├── images/              # Static assets
├── server.js            # Application entry point
└── package.json
```

### Benefits of MVC Structure

1. **Maintainability**: Code organized by function
2. **Testability**: Controllers tested independently
3. **Scalability**: Easy to add new features
4. **Team Development**: Multiple developers can work simultaneously
5. **Reusability**: Controllers and models reused across views/routes

---

## 🔧 Getting Started

### 1. Install dependencies
npm install

### 2. Run in development(frontend)
- cd ecommerce-project
- npm run dev

### Starts **Express backend** with **Nodemon**  
- cd ecommerce-backend (In another terminal)
- npm run dev

---

## 🌐 Environment Variables

| Variable         | Description                            | Example                  |
|------------------|----------------------------------------|--------------------------|
| `PORT`           | Server port                            | `3000`                   |
| `DB_TYPE`        | Database dialect (`sqlite`/`mysql`/`postgres`) | `sqlite`        |
| `RDS_HOSTNAME`   | AWS RDS Host (prod only)               | `mydb.xxxxx.rds.amazonaws.com` |
| `RDS_USERNAME`   | Database username                      | `admin`                  |
| `RDS_PASSWORD`   | Database password                      | `secret`                 |
| `RDS_DB_NAME`    | DB name                                | `ecommerce`              |
| `RDS_PORT`       | DB port                                | `3306` (MySQL)           |

---

## 🛠️ Future Enhancements
- 🔐 User authentication and accounts  
- 🛒 Persistent carts per user  
- 💳 Payment gateway integration (Stripe/PayPal)  
- 📊 Admin dashboard for products & orders  
- 🔍 Full‑text / fuzzy search  

---

## Contributing
Contributions are welcome. Please fork the repository and open a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## Contact
For support or inquiries, please open an issue or email: ramnath2544@gmail.com.
