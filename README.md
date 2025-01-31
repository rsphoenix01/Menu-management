Menu Management API
A Node.js + Express REST API for managing a menu with Categories, SubCategories, and Items.
Built with MongoDB and Mongoose to handle hierarchical data.

Table of Contents
Features
Tech Stack
Prerequisites
Getting Started
API Endpoints
Category Routes
SubCategory Routes
Item Routes
Project Structure
Short Q&A
License
Features
CRUD for Categories
Create new categories with optional tax configuration.
Edit category attributes (name, image, description, tax, etc.).
Retrieve categories by ID or name.
CRUD for SubCategories
Create subcategories under a specific category (inherits tax if not provided).
Edit subcategory attributes.
Retrieve subcategories individually, or under a specific category.
CRUD for Items
Create items under a category or subcategory.
Calculates totalAmount as baseAmount - discount.
Retrieve items by ID or name, or by parent category/subcategory.
Edit item attributes (discount, tax, etc.).
Search Items
Search items by name (case-insensitive).
Tech Stack
Node.js (Express.js)
MongoDB (Mongoose ODM)
JavaScript (ES6+)
Optional: Postman or cURL for testing
Prerequisites
Node.js (v14+)
npm or yarn
MongoDB running locally or via a cloud provider (e.g., MongoDB Atlas)
Getting Started
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/your-username/menu-management.git
cd menu-management
Install Dependencies:

bash
Copy
Edit
npm install
Configure Database:

The default connection string in config/db.js is:
js
Copy
Edit
mongoose.connect('mongodb://localhost:27017/menu_management');
Change this if needed (for a cloud DB).
Start MongoDB:

If running locally, ensure mongod is running.
Run the Application:

bash
Copy
Edit
npm start
By default, the server runs at http://localhost:5000.
Test Endpoints:

Use Postman or similar tool to send requests to http://localhost:5000/...
API Endpoints
Category Routes
Create Category

POST /category
Body Example:
json
Copy
Edit
{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "Hot and cold drinks",
  "taxApplicable": true,
  "tax": 10,
  "taxType": "percentage"
}
Response: Created category object.
Get All Categories

GET /category
Get Category by Name or ID

GET /category/:identifier
If :identifier is a valid ObjectId, searches by _id; otherwise searches by name.
Edit Category

PUT /category/:id
Body Example:
json
Copy
Edit
{ "description": "New description" }
SubCategory Routes
Create SubCategory under a Category

POST /subcategory/:categoryId
Body Example:
json
Copy
Edit
{
  "name": "Tea",
  "image": "https://example.com/tea.jpg",
  "description": "All types of tea"
}
Inherits tax from the parent category if not provided.
Get All SubCategories

GET /subcategory
Get All SubCategories under a Category

GET /subcategory/bycategory/:categoryId
Get SubCategory by Name or ID

GET /subcategory/:identifier
Edit SubCategory

PUT /subcategory/:id
Item Routes
Create Item

Under a Category: POST /item/category/:categoryId
Under a SubCategory: POST /item/subcategory/:subCategoryId
Body Example:
json
Copy
Edit
{
  "name": "Green Tea",
  "image": "https://example.com/greentea.jpg",
  "description": "Smooth, mild flavor",
  "baseAmount": 100,
  "discount": 10
}
Get All Items

GET /item
Get Items under a Category

GET /item/bycategory/:categoryId
Get Items under a SubCategory

GET /item/bysubcategory/:subCategoryId
Get Item by Name or ID

GET /item/:identifier
Edit Item

PUT /item/:id
Body Example:
json
Copy
Edit
{
  "discount": 20
}
totalAmount recalculates to baseAmount - discount.
Search Items by Name

GET /item/search?name=someTerm
Case-insensitive match.
Project Structure
bash
Copy
Edit
menu-management/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── categoryController.js
│   ├── subCategoryController.js
│   └── itemController.js
├── models/
│   ├── Category.js
│   ├── SubCategory.js
│   └── Item.js
├── routes/
│   ├── categoryRoutes.js
│   ├── subCategoryRoutes.js
│   └── itemRoutes.js
├── server.js              # Main express server
├── package.json
└── README.md
Short Q&A
1. Which database did you choose and why?

MongoDB, because its flexible document model aligns well with hierarchical data like categories and items, and Mongoose makes it easy to define schemas and relationships.
2. 3 Things Learned from This Assignment?

Setting up a structured REST API in Node.js and Express.
Managing parent-child relationships (category → subcategory → item) using Mongoose.
Handling default logic (e.g., tax inheritance) across different levels.
3. Most Difficult Part?

Managing the relationships between categories, subcategories, and items, especially where items can belong either directly to a category or via a subcategory.
4. What Would You Do Differently Given More Time?

Implement authentication, additional validations, better error handling, and deploy to a cloud service with CI/CD.
