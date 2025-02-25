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

