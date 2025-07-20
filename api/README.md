# NESL-IT API

A minimal Express + TypeScript API with JWT authentication and role-based authorization.

## Features
- **POST /login**: Returns a signed JWT for hardcoded users (admin/user)
- **DELETE /posts/:id**: Protected endpoint, only accessible by admin
- Custom `authorize(roles: string[])` middleware for role-based access
- Unit tests with Jest

## Hardcoded Users
- Admin: `{ id: 'u2', role: 'admin', username: 'admin1', password: 'pass2' }`
- User: `{ id: 'u1', role: 'user', username: 'user1', password: 'pass1' }`

## Getting Started

### 1. Install dependencies
```sh
npm install
```

### 2. Run the API (dev mode with auto-reload)
```sh
npm run dev
```

### 3. Run tests
```sh
npm test
```

## Usage (with Postman)

### Login
- **POST** `http://localhost:3000/api/login`
- Body (JSON):
  ```json
  { "username": "admin1", "password": "pass2" }
  ```
 ```json 
 { "username": "user1", "password": "pass1" }
 ```

- Copy the `token` from the response.

### Delete Post (admin only)
- **DELETE** `http://localhost:3000/posts/123`
- Header: `Authorization: Bearer <token>`

## Project Structure
```
src/
  controllers/
  middleware/
  routes/
  types/
  utils/
  __tests__/
```

## Custom Middleware
- `authorize(roles: string[])`: Checks JWT and role, blocks unauthorized access

## Environment
- JWT secret defaults to `supersecretkey` (set `JWT_SECRET` in env for production)
