# Deployment Guide

## 1) Deploy backend (Render or Railway)

1. Push this project to GitHub.
2. Create a new Web Service on Render or a new Service on Railway.
3. Use:
   - Build command: `npm install`
   - Start command: `npm start`
4. Set environment variables from `.env.example`:
   - `PORT`
   - `NODE_ENV=production`
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

## 2) Connect hosted MySQL

Use a managed MySQL service (Railway MySQL, PlanetScale, Aiven, etc.) and copy credentials into backend environment variables.

Example production DB values:

- `DB_HOST=your-mysql-host`
- `DB_PORT=3306`
- `DB_USER=your-mysql-user`
- `DB_PASSWORD=your-strong-password`
- `DB_NAME=school_management`

## 3) Create schema in hosted DB

Run this SQL on hosted MySQL:

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  INDEX idx_schools_lat_lng (latitude, longitude)
);
```

## 4) Verify after deploy

1. Open `GET /health`
2. Test `POST /addSchool`
3. Test `GET /listSchools?lat=...&lng=...`
