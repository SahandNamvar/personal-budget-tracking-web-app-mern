## Personal Budget Tacking App (MERN Stack)

### Overview
This repository contain the source code for my personal budget tracking and management web application. Developed as part of a graduate-level course project in computer science, the app is built using MongoDB, Express.js, React and Node.js.

### Features
+ CRUD Operations: Full support for creating, reading, updating, and deleting expense and income transactions. 
+ User Authentication: Safeguard user data and privacy. 
+ Server-Side Filtering: Advanced MongoDB queries for comprehensive server-side filtering of transactions and user data. 
+ Date Range Filters: Allow users to analyze transactions within specific periods of time. 
+ Transaction Analysis: Provide insights into transactions based on count, amount, and total turnover.
+ Category-Based Analysis: Users can view and analyze statistics for both income and expense transactions based on category type. 

### Technologies Used
+ Frontend:
    + React
    + React Router DOM
    + Ant Design (React UI Library)
    + Axios
    + Moment.js
    + AOS (Animate On Scroll Library)

+ Backend:
    + Node.js
    + Express.js
    + MongoDB
    + Mongoose
    + Bcrypt (Password Hashing)
    + Validator (Input Validation)

### Installation & Setup
1. Clone the repository:
    + git clone `https://github.com/SahandNamvar/personal-budget-tracking-web-app-mern.git`
2. Install dependencies for both the client and server:
    + Navigate to each directory and run the command `npm install`
3. Start the development server:
    + In the backend folder (root directory) run the command `nodemon server.js`
        + NodeJS Server runs on Port `3001` 
    + In the client folder, run the command `npm start`
        + React App runs on Default Port `3000`

## Code Explanation

#### client (frontend code structure)
+ public - This directory contains static assets
+ src - This directory contains source code for the React app
    + components - Reusable React components used throughout the app
    + pages - React components representing different pages/views
    + resources - Additional static resources
    + App.js - Root component of the application
    + index.js - Entry point for the React application, where the root component (<App /> is rendered into the DOM)

#### models
+ transaction.js
This file defines a Mongoose schema and model for the transaction entity. The schema specifies the structure of the transaction document in the MongoDB database. It includes fields such as amount, type, category, date, description, and user_id, each with their respective data types and optional constraints such as required.

    The amount field stores the transaction amount as a number and is required.
    The type field represents the type of transaction (e.g., income or expense) and is required.
    The category field stores the category of the transaction and is required.
    The date field stores the date of the transaction and is required.
    The description field stores an optional description of the transaction.
    The user_id field stores the ID of the user associated with the transaction and is required.

The schema is then compiled into a model using mongoose.model(), which creates a collection in the MongoDB database named "transactions" (pluralized form of the model name "Transaction") based on the schema definition. Finally, the model is exported to be used elsewhere in the application, allowing for operations such as creating, querying, updating, and deleting transaction documents in the database.

+ user.js
This file defines a Mongoose schema and model for the user entity. The schema specifies the structure of the user document in the MongoDB database. It includes fields such as name, email, and password, each with their respective data types and optional constraints such as required and unique. The name and email fields are both required, with the email field set to unique to ensure each user has a unique email address. The password field is also required for user authentication purposes.

The schema is then compiled into a model using mongoose.model(), which creates a collection in the MongoDB database named "users" (pluralized form of the model name "User") based on the schema definition. Finally, the model is exported to be used elsewhere in the application.

#### routes
+ transactionsRoute.js
This file defines several routes related to managing transactions.

    /add-transaction: This route handles a POST request to add a new transaction to the database. It expects parameters such as amount, type, category, date, description, and user_id in the request body. It performs validations on the input fields and then creates a new transaction object using the Transaction model and saves it to the database.

    /edit-transaction: This route handles a POST request to edit an existing transaction in the database. It expects parameters similar to the add-transaction route. It finds the transaction by its unique identifier (_id) in the request body and updates its fields with the provided values.

    /delete-transaction: This route handles a POST request to delete an existing transaction from the database. It finds the transaction by its unique identifier (_id) in the request body and deletes it from the database.

    /get-all-transactions: This route handles a POST request to retrieve all transactions associated with a specific user. It expects parameters such as frequency, type, and user_id in the request body. Based on the provided parameters, it constructs a query to retrieve transactions from the database, filtering by date range, transaction type, and user_id.

Each route includes error handling to gracefully handle any errors that may occur during the process and provides appropriate status codes and error messages in the response. Overall, these routes allow for the creation, editing, deletion, and retrieval of transactions in the database.

+ usersRoute.js
This file defines two routes related to user authentication: /login and /register. For the /login route, it expects a POST request containing an email and password in the request body. It validates the email format and checks if the email exists in the database. If the email exists, it compares the provided password with the hashed password stored in the database using bcrypt for password hashing. If the passwords match, it sends back the user object (excluding the password) to the client. If any validation fails or errors occur during the process, appropriate error messages and status codes are sent back to the client.

For the /register route, it expects a POST request containing a name, email, and password in the request body. Similar to the login route, it performs validations on the input fields, checks if the email already exists in the database, and ensures the password meets certain criteria (e.g., strength). If all validations pass, it hashes the password using bcrypt, creates a new user object with the provided details, saves it to the database, and sends a success message to the client. Again, it handles errors gracefully, sending appropriate error responses with status codes if any occur during the process.

#### dbConnect.js
This dbConnect.js file establishes a connection to a MongoDB database using Mongoose, a MongoDB object modeling tool for Node.js. It imports the Mongoose library and initiates a connection to the specified MongoDB database URI using the mongoose.connect() method. The URI includes credentials for accessing the database hosted on MongoDB Atlas. The connection instance (connection) listens for events such as connection errors and successful connections. If an error occurs during connection, it logs the error message to the console. 

#### server.js
This server.js file is the entry point for the backend server built with Express.js. It begins by importing necessary dependencies such as Express, the database connection module (dbConnect), and the path module. It initializes an Express application, parses incoming JSON requests, and defines routes for handling user and transaction data, utilizing separate route modules (usersRoute and transactionsRoute). It then configures the server to listen on a specified port, defaulting to port 3001 if not specified via the PORT environment variable. Additionally, in production mode, it serves the static React frontend from the client/build directory and ensures that all GET requests are directed to the index.html file to enable client-side routing. Finally, it starts the server and listens for incoming connections, logging a message to the console upon successful startup.

## Screenshots
+ Login Page
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.39.21 PM.png)

+ Sign Up Page
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.39.39 PM.png)

+ Homepage
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.54.34 PM.png)

+ Transaction Frequency Selector
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.55.36 PM.png)

+ Transaction Type Selector
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.55.59 PM.png)

+ Add New Transaction
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.57.12 PM.png)

+ Edit Transaction
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.57.42 PM.png)

+ Table View Analytics
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.58.10 PM.png)
![](./imgs/screenshots/Screenshot%202024-05-28%20at%208.58.26 PM.png)




