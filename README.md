# The Land of Baker API

## Rest API Specification

The Land of Baker API uses REST API endpoints to communicate with the backend.

| Endpoint          | Method | Description                  |
| ----------------- | ------ | ---------------------------- |
| /products         | GET    | Get all products             |
| /products/:slug   | GET    | Get product by slug          |
| /products         | POST   | Create a new product         |
| /products/:id     | PATCH  | Update a product by id       |
| /products/:id     | DELETE | Delete a product by id       |
| /search?q=keyword | GET    | Search for products by query |

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
