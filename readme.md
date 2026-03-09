# Tiny URL Service

A simple URL shortener service that converts long URLs into short, shareable links.

## Features

- Shorten long URLs
- Redirect short URLs to original URLs
- Generate unique short codes
- Store and retrieve URLs efficiently
- Simple REST API

---

## How It Works

1. User submits a long URL.
2. The system generates a unique short code.
3. The long URL is stored in the database with the short code.
4. When the short URL is accessed, the service redirects to the original URL.

Example:

**Long URL**
https://www.example.com/blog/how-to-build-a-url-shortener


**Short URL**
http://yourdomain.com/abc123


---

## API Endpoints

### 1. Create Short URL

**POST** `/shorten`

Request Body:

```json
{
  "url": "https://www.example.com"
}

Response:

{
  "shortUrl": "http://yourdomain.com/abc123"
}
```

### 2. Redirect to Original URL

GET /:shortCode

This endpoint redirects the user to the original long URL.