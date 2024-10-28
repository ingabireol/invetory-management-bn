# 📦 Inventory Management API

A simple RESTful API for managing products in an inventory system, built using **NestJS** and **PostgreSQL**. This project allows you to add, update, delete, and view products, with a logging feature to track changes.

---

## 📋 Table of Contents
- [Project Setup](#-project-setup)
- [API Endpoints](#-api-endpoints)
- [Testing Instructions](#-testing-instructions)
- [Additional Notes](#-additional-notes)

---

## 🚀 Project Setup

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
First, clone the repository to your local machine:

git clone https://github.com/ingabireol/invetory-management-bn.git
cd invetory-management-bn

### 2. Install Dependencies
Install all required dependencies:

npm install


### 3. Database Configuration
Ensure you have PostgreSQL running. Then, set up environment variables for database connection in a .env file:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=inventory_db

### 4. Run Migrations
To set up the necessary tables, run migrations:

npm run typeorm migration:run

### 5. Start the Application
Start the NestJS application:

npm run start

## 📌 API Endpoints

## ➕ Add New Product
Endpoint: POST /product
Description: Adds a new product to the inventory. Each product name must be unique.
Request Body:
{
  "name": "Sample Product",
  "quantity": 10,
  "category": "Electronics"
}

## 🔄 Update Product Quantity

Endpoint: PATCH /products/:id
Description: Updates the quantity of an existing product. Quantity must be 0 or greater.
Request Body:
{
  "quantity": 20
}

## ❌ Delete Product
Endpoint: DELETE /product/:id
Description: Deletes a product by its ID.
Response: Confirms deletion or returns an error if the product ID does not exist.

## 📄 View Products
Endpoint: GET /product
Description: Retrieves a list of all products.
Response: Returns an array of products with their details.

## 🔍 Filter Products
Endpoint: GET /product/filter-by-category
Description: Filters products by category or quantity range.
Query Parameters:
category (optional): Filters products by the specified category.

Endpoint: GET /product/filter-by-quantity-less-than?quantity
Description: Filters products by category less than
Query Parameters:
category (optional): Filters products by the specified category.

Endpoint: GET /product/filter-by-quantity-range
Description: Filters products by range of quantity
Query Parameters:
min : minimum quantity.
max : maximum quantity.

## Example Request:

GET /product/filter-by-quantity-range?min=2&max=5

## 🧪 Testing Instructions
To test the API, you can use Postman, cURL, or any API testing tool.

## Add Product:

curl -X POST http://localhost:3000/product -H "Content-Type: application/json" -d '{"name": "Sample Product", "quantity": 10, "category": "Electronics"}'

## Update Product Quantity:
curl -X PATCH http://localhost:3000/product/1 -H "Content-Type: application/json" -d '{"quantity": 20}'

## Delete Product:
curl -X DELETE http://localhost:3000/product/1
