# URL Shortener

A simple Node.js application that allows users to shorten long URLs into compact, easy-to-share links. The service generates a unique short code for each original URL and redirects users to the original address when the short link is accessed. This project demonstrates the use of Express.js, MongoDB, and RESTful API principles.

## Features

- Shorten any valid URL
- Redirect short URLs to the original address
- Track number of visits and visit history
- Analytics endpoint for each short URL
- Request logging middleware

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ramajan-tahashildar/URL_Shortener.git
   cd URL_Shortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     ```
     MONGODATABASE_URL="YOUR_MONGODB_CONNECTION_STRING"
     ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

## API Usage

### Shorten a URL

- **Endpoint:** `POST /api/url/`
- **Body:**  
  ```json
  {
    "redirectUrl": "https://example.com"
  }
  ```
- **Response:**  
  ```json
  {
    "message": "ShortURL created successfully",
    "url": "shortID",
    "status": "success"
  }
  ```

### Redirect to Original URL

- **Endpoint:** `GET /api/url/:shortID`
- **Response:** Redirects to the original URL.

### Get Analytics

- **Endpoint:** `GET /api/url/analytics/:shortID`
- **Response:**  
  ```json
  {
    "totalVisitCounter": 5,
    "visitHistory": [
      { "timestamp": 1720099200000 },
      ...
    ],
    "status": "success"
  }
  ```

## Project Structure

- `index.js` – Entry point, sets up Express, routes, middleware, and DB connection.
- `routes/routes.js` – API route definitions.
- `controllers/url.js` – Business logic for URL shortening, redirection, and analytics.
- `models/url.js` – Mongoose schema for URLs.
- `middleware/index.js` – Request logging middleware.
- `connection.js` – MongoDB connection logic.

## License

MIT
