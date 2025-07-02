# URL_Shortener

A simple Node.js application that allows users to shorten long URLs into compact, easy-to-share links. The service generates a unique short code for each original URL and redirects users to the original address when the short link is accessed. This project demonstrates the use of Express.js, MongoDB (or any database), and basic RESTful API principles.

## Features

- Shorten any valid URL
- Redirect short URLs to the original address
- Track number of visits (optional)
- Simple REST API for integration

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure your database connection.
4. Start the server with `npm start`.

## Usage

- Send a POST request to `/api/shorten` with a URL to receive a short link.
- Access the short link to be redirected to the original URL.

## Technologies

- Node.js
- Express.js
- MongoDB (or your preferred database)

## License

MIT# URL_Shortener
