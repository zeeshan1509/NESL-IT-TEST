# NESL-IT API
#API FOLDER
A minimal Express + TypeScript API with JWT authentication and role-based authorization.

# Api Folder: Express app
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
- **POST** `http://localhost:3001/api/login`
- Body (JSON):
  ```json
  { "username": "admin1", "password": "pass2" }
  ```
 ```json 
 { "username": "user1", "password": "pass1" }
 ```

- Copy the `token` from the response.

### Delete Post (admin only)
- **DELETE** `http://localhost:3001/posts/123`
- Header: `Authorization: Bearer <token>`

## API Authentication Flow
- Both admin and user login APIs return a JWT token upon successful authentication.
- Use the returned token as a Bearer token in the Authorization header when calling protected endpoints, such as the DELETE API.

Example:
1. Login as admin or user to receive a token.
2. Use the token in requests to protected endpoints:
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

# Web Folder: React Frontend

The `web/ReactFeed` folder contains the frontend code for the React Feed application.

### Running the Frontend

To start the frontend development server, navigate to the `web/ReactFeed` directory and run:

### 1. Install dependencies
```sh
npm install
```

### 2. Run the APP
```sh
npm run dev
```

### Environment Setup

Set the environment variable `VITE_API_URL` in a `.env` file inside `web/ReactFeed` to specify the backend API URL. For example:

```
VITE_API_URL=http://localhost:3001
```

If `VITE_API_URL` is not set, the frontend will default to `http://localhost:3001` as the backend URL.

# DB Folder Structure

The `db` folder contains:
- `pipeline/`: Contains pipeline-related scripts.
- `SchemaDesign/`: Contains schema design files, including `SchemaDesign.json`.
- `performance.txt`: Contains suggestions to improve database performance.

# Debug Folder

The `debug` folder contains `postControllerFix.ts`, which documents problem identification in the provided code snippet, offers improvement suggestions, and includes the improved code.



