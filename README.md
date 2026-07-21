# StreamVerseX

AI-Powered Entertainment Platform — Movies, TV Shows & Anime discovery, reviews, watchlists, and AI-assisted recommendations.

## 🎬 About

StreamVerseX is an industry-level full stack web application where users can browse movies, TV shows, and anime, manage favorites/watchlists, write reviews, subscribe to premium plans, and get AI-powered recommendations, summaries, and insights.

This repository contains the **backend** — a Spring Boot REST API built with MongoDB, JWT authentication, and integrations with TMDB, OMDb, Gemini AI, and Razorpay.

## 🛠️ Tech Stack

**Backend**
- Java 21
- Spring Boot 4.0.7 (Spring Framework 7)
- Spring Security 7 + JWT Authentication
- Spring Data MongoDB
- Java Mail Sender
- Maven
- Swagger / OpenAPI (springdoc 3.x)

**Database**
- MongoDB

**External APIs**
- TMDB API
- OMDb API
- Gemini AI API
- Razorpay (Test Mode)

**Frontend** *(separate repo, built by teammates)*
- React.js, Material UI, React Router, Axios, Context API

## 📁 Project Structure

com.streamversex.backend
├── config/ # CORS, Swagger, and other @Configuration classes
├── security/ # JWT filter, SecurityConfig
├── controller/ # REST controllers
├── service/ # Business logic interfaces + impl/
├── repository/ # Spring Data MongoDB interfaces
├── dto/ # request/ and response/ DTOs
├── mapper/ # Entity <-> DTO conversion
├── model/ # MongoDB @Document entities
├── exception/ # Custom exceptions + GlobalExceptionHandler
├── validation/ # Custom Bean Validation annotations
├── util/ # Reusable helpers (JwtUtil, etc.)
├── email/ # Email sending logic
├── payment/ # Razorpay integration
├── externalapi/ # TMDB, OMDb clients
├── ai/ # Gemini AI integration
└── admin/ # Admin-specific logic


## 🚀 Getting Started

### Prerequisites
- Java 21 (JDK)
- Maven
- MongoDB running locally on port `27017` (or a `MONGODB_URI` pointing to Atlas)

### Run locally

```bash
git clone <repo-url>
cd streamversex-backend
mvn spring-boot:run
```

The server starts on **`http://localhost:8080`**.

### API Documentation

Once running, Swagger UI is available at: http://localhost:8080/swagger-ui.html

## ⚙️ Environment Variables

| Variable | Purpose | Default (dev) |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/streamversex` |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | SMTP credentials | *(empty)* |
| `JWT_SECRET` | Secret used to sign JWTs | placeholder — **must** be overridden before deploying |
| `JWT_EXPIRATION_MS` | JWT expiry in ms | `86400000` (24h) |
| `TMDB_API_KEY` | TMDB API key | *(empty)* |
| `OMDB_API_KEY` | OMDb API key | *(empty)* |
| `GEMINI_API_KEY` | Gemini API key | *(empty)* |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay test credentials | *(empty)* |

Set these via a `.env` file, IDE run configuration, or your OS environment — never commit real values.

## 📌 Status

🚧 **Actively in development.** Currently: project setup, security/CORS/Swagger skeleton complete. Auth module (Register/Login/JWT) in progress.

## 👥 Team

- Backend: [Yash] — Java, Spring Boot, MongoDB, Security, AI/Payment integrations
- Frontend: 2 teammates — React.js
