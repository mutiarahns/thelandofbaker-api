# The Land of Baker API

## Rest API Specification

The Land of Baker API uses REST API endpoints to communicate with the backend.

| Endpoint                    | Method | Description                  |
| --------------------------- | ------ | ---------------------------- |
| /api/products               | GET    | Get all products             |
| /api/products/:id           | GET    | Get product by id            |
| /api/products               | POST   | Create a new product         |
| /api/products/:id           | PUT    | Update a product by id       |
| /api/products/:id           | DELETE | Delete a product by id       |
| /api/products/search/:query | GET    | Search for products by query |

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
