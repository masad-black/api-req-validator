# API Request Validator

A lightweight, flexible middleware for validating API requests in Express applications.

## Features

- 🔍 Validate request body, query parameters
- 🛡️ Type checking and data validation
- 🔄 Type conversion

## Installation

```bash
npm install api-request-validator
# or
yarn add api-request-validator
```

## Quick Start

```javascript
const express = require("express");
const { validateRequest } = require("api-request-validator");

const app = express();
app.use(express.json());

// Define a validation schema
const userSchema = {
  body: {
    username: { type: "string", required: true, minLength: 3 },
    email: { type: "string", required: true, format: "email" },
    age: { type: "number", minimum: 18 },
  },
  query: {
    fields: { convert: "string" },
  },
};

// Use as middleware in your route
app.post("/users", validateRequest(userSchema), (req, res) => {
  // If execution reaches here, the request is valid
  res.status(201).json({ message: "User created", user: req.body });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## Schema Definition

### Data Types

- `string`: String values with optional constraints
- `number`: Numeric values with optional ranges
- `boolean`: Boolean values

### Common Rules

```javascript
{
  // String rules
  username: {
    type: 'string',           // Data type
    required: true,           // Field must be present
    minLength: 3,             // Minimum length
    maxLength: 50,            // Maximum length
    pattern: '^[A-Za-z0-9]+$' // RegExp pattern
  },

  // Number rules
  age: {
    type: 'number',
    minimum: 18,              // Minimum value (>=)
    maximum: 100,             // Maximum value (<=)
    integer: true             // Must be an integer
  },

}
```

### Format Validation

```javascript
{
  email: { type: 'string', format: 'email' },
  website: { type: 'string', format: 'url' },
  birthdate: { type: 'string', format: 'date' },
  uuid: { type: 'string', format: 'uuid' }
}
```

## Configuration Options

```javascript
const options = {
  strict: false, // If true, rejects fields not in schema
};

app.post("/users", validateRequest(userSchema, options), (req, res) => {
  // Handler code
});
```

## Error Handling

When validation fails, the middleware returns a 400 Bad Request response:

```json
{
  "status": "error",
  "errors": [
    "username must be at least 3 characters long",
    "email must be a valid email address"
  ]
}
```

## License

MIT
