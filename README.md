# club1911 API

Node.js + Express backend with a clean architecture style structure, PostgreSQL support, Swagger docs, OTP-based customer authentication, and bearer-protected profile access.

## Stack

- Node.js
- Express
- PostgreSQL
- JWT
- Swagger

## Local setup

Install dependencies:

```bash
npm install
```

Use your local PostgreSQL user in `.env`:

```env
PORT=3000
NODE_ENV=development
DB_CLIENT=postgres
DATABASE_URL=postgresql://user@localhost:5432/club1911
JWT_SECRET=club1911-dev-secret
OTP_EXPIRY_MINUTES=5
```

Create the database and schema:

```bash
createdb club1911
psql -d club1911 -f src/infrastructure/db/postgres/schema.sql
```

Run the server:

```bash
npm run dev
```

## Vercel

The app is ready for Vercel serverless deployment.

- Entry point: `api/index.js`
- Routing: `vercel.json`
- Swagger: `/api-docs`

Set these env vars on Vercel:

```env
DB_CLIENT=postgres
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret
OTP_EXPIRY_MINUTES=5
```

## Swagger

Open locally:

- `http://localhost:3000/api-docs`
- `http://localhost:3000/api-docs/json`

## Main endpoints

- `GET /api/health`
- `GET /api/customer`
- `POST /api/customer/create`
- `POST /api/customer/sendOtp`
- `POST /api/customer/authenticate`
- `GET /api/customer/getProfile`
- `GET /api/customer/getQRCode`
- `PATCH /api/customer/cashback/:actcd`

## Customer creation

Allowed payload:

```json
{
  "name": "NAME NAME",
  "mobile": "1234567",
  "countryCode": "AA",
  "email": "mm@example.com"
}
```

Required fields:

- `name`
- `mobile`
- `countryCode`

Notes:

- `email` is optional
- duplicate `mobile` is rejected
- `actcd` is generated as `countryCode + incremented number`
- trailing commas in JSON payloads are tolerated

Example response:

```json
{
  "success": true,
  "message": "Customer created successfully.",
  "error": "",
  "data": {
    "message": "Customer created successfully."
  }
}
```

## Authentication flow

### 1. Send OTP

Request:

```json
{
  "mobile": "1234567",
  "countryCode": "AA"
}
```

Response:

```json
{
  "success": true,
  "message": "OTP sent successfully.",
  "error": "",
  "data": {
    "message": "OTP sent successfully.",
    "otp_expiry_minutes": 5,
    "mobile": "1234567"
  }
}
```

Current OTP is hardcoded to:

```text
000000
```

### 2. Authenticate

Request:

```json
{
  "mobile": "1234567",
  "otp": "000000"
}
```

Response returns a JWT bearer token:

```json
{
  "success": true,
  "message": "Authentication successful.",
  "error": "",
  "data": {
    "message": "Authentication successful.",
    "token": "jwt-token",
    "token_type": "Bearer",
    "expires_in": 31536000,
    "customer": {
      "actcd": "AA1",
      "name": "NAME NAME",
      "mobile": "1234567",
      "email": "mm@example.com"
    }
  }
}
```

### 3. Profile

Use the token from `authenticate` as bearer token:

```http
Authorization: Bearer <token>
```

Call:

```text
GET /api/customer/getProfile
```

### 4. Get QR code

Use the same bearer token and call:

```text
GET /api/customer/getQRCode
```

## Postman

Collection file:

- `postman/club1911.postman_collection.json`

## Project structure

```text
src/
  app/
    use-cases/
      customer/
  domain/
    entities/
    repositories/
  infrastructure/
    config/
    db/
    docs/
    repositories/
    services/
  interfaces/
    http/
      controllers/
      middleware/
      routes/
  shared/
```
