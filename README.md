# Invoice API Documentation

A RESTful API built with Node.js, Express, and MongoDB for managing invoices and generating PDF documents.

## Features

- Create, read, update, and delete invoices
- Generate PDF invoices
- MongoDB data persistence
- Input validation
- PDF generation with custom formatting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Create Invoice
- **POST** `/api/invoices`
- Creates a new invoice
- Request body example:
```json
{
  "invoiceNumber": "INV-2023-001",
  "dueDate": "2024-02-01",
  "client": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": "123 Business Ave, New York, NY 10001"
  },
  "items": [
    {
      "description": "Website Development",
      "quantity": 1,
      "price": 2000,
      "amount": 2000
    },
    {
      "description": "SEO Services",
      "quantity": 10,
      "price": 100,
      "amount": 1000
    }
  ],
  "subtotal": 3000,
  "tax": 300,
  "total": 3300
}
```

### Get All Invoices
- **GET** `/api/invoices`
- Returns a list of all invoices

### Get Single Invoice
- **GET** `/api/invoices/:id`
- Returns a specific invoice by ID

### Update Invoice
- **PUT** `/api/invoices/:id`
- Updates an existing invoice
- Request body example:
```json
{
  "status": "paid",
  "items": [
    {
      "description": "Website Development",
      "quantity": 1,
      "price": 2500,
      "amount": 2500
    }
  ],
  "subtotal": 2500,
  "tax": 250,
  "total": 2750
}
```

### Delete Invoice
- **DELETE** `/api/invoices/:id`
- Deletes an invoice by ID

### Generate PDF
- **GET** `/api/invoices/:id/pdf`
- Generates and returns a PDF version of the invoice

## API Performance Testing with Postman

To ensure that the API performs optimally, Postman can be used to conduct various performance tests. Below are key tests and their use cases:

### 1. **Load Testing**
- **Purpose:** Determines how the API handles a high number of requests over a period of time.
- **Use Case:** Simulate 100+ concurrent users accessing the invoice API to ensure system stability.
- **How to Test:**
  - Use Postman's Collection Runner to send multiple requests.
  - Analyze response times and failure rates.

### 2. **Response Time Testing**
- **Purpose:** Measures the time taken for the API to respond to requests.
- **Use Case:** Ensure that API responses are within acceptable limits (e.g., <200ms for basic queries).
- **How to Test:**
  - Send multiple requests and check the `responseTime` metric in Postman.
  - Identify endpoints that may need optimization.

### 3. **Stress Testing**
- **Purpose:** Tests API behavior under extreme conditions, such as high traffic spikes.
- **Use Case:** Assess how the API handles an unexpected surge in users (e.g., Black Friday sales).
- **How to Test:**
  - Gradually increase the number of requests per second in Postman.
  - Monitor for timeouts and API failures.

### 4. **Benchmark Testing**
- **Purpose:** Establishes baseline performance metrics for comparison.
- **Use Case:** Monitor API performance trends over time and after updates.
- **How to Test:**
  - Set standard request-response benchmarks.
  - Use Postman to compare response times before and after code optimizations.

### 5. **Error Handling Testing**
- **Purpose:** Ensures the API properly handles invalid inputs and system errors.
- **Use Case:** Prevent security vulnerabilities and crashes due to bad requests.
- **How to Test:**
  - Send invalid JSON data, incorrect HTTP methods, and unauthorized requests.
  - Verify the correctness of error messages and status codes.

### **Images**

![Screenshot 2025-02-25 194720](https://github.com/user-attachments/assets/18833760-0281-49b8-b772-37a81396c327)

## Data Model

### Invoice Schema

```javascript
{
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  client: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  items: [{
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid', 'overdue'],
    default: 'draft'
  }
}
```

## Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Error Handling

The API returns error messages in the following format:
```json
{
  "message": "Error description here"
}
```

## PDF Generation

The PDF generation endpoint creates a formatted invoice document including:
- Company header
- Invoice details
- Client information
- Itemized list of products/services
- Totals (subtotal, tax, total)

## Development

The project uses the following dependencies:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `pdfkit` - PDF generation
- `nodemon` - Development auto-reload

