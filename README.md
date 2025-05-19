---
title: Real-Time Bidding System
description: A real-time bidding system built with NestJS, PostgreSQL, and WebSocket
---

# Real-Time Bidding System

A real-time bidding system built with NestJS, PostgreSQL, and WebSocket for live auction functionality.

## Features

- Real-time bidding with WebSocket support
- Concurrent auction management
- Automatic auction expiration handling
- PostgreSQL database with TypeORM
- Docker containerization
- CI/CD pipeline with GitHub Actions

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd bidding
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=bidding
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

### Docker Setup

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. Seed the database with users:
   ```bash
   docker-compose exec backend npm run seed:users
   ```

## API Endpoints

### Items

- `POST /items` - Create a new auction item
- `GET /items` - Get all active auction items
- `GET /items/:id` - Get a specific auction item

### Bids

- `POST /bids` - Place a new bid
- `GET /bids/item/:itemId` - Get all bids for an item
- `GET /bids/user/:userId` - Get all bids by a user

## WebSocket Events

- `joinItem` - Join an item's auction room
- `leaveItem` - Leave an item's auction room
- `newBid` - Receive updates on new bids
- `auctionEnd` - Receive notification when an auction ends

## Architecture Decisions

### Database Design

- Used PostgreSQL for its reliability and support for concurrent operations
- Implemented proper indexing for frequently queried fields
- Used TypeORM for type-safe database operations

### Real-time Updates

- Implemented WebSocket using Socket.IO for real-time bid updates
- Created room-based architecture for efficient message broadcasting
- Implemented proper error handling and connection management

### Concurrency Handling

- Used database transactions for bid operations
- Implemented optimistic locking for bid updates
- Added proper validation for bid amounts and auction status

### Scalability Considerations

- Designed for horizontal scaling
- Implemented proper connection pooling
- Used efficient database queries with proper indexing

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. Runs tests on every push and pull request
2. Builds and pushes Docker images on main branch updates
3. Includes database integration tests
4. Implements proper caching for faster builds

## Security Considerations

- Input validation using class-validator
- Proper error handling and logging
- Environment variable management
- Database connection security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Database Setup

1. Create the database:

   ```bash
   createdb bidding
   ```

2. Run migrations:

   ```bash
   # Run all migrations
   npm run migration:run

   # Revert last migration
   npm run migration:revert

   # Generate new migration
   npm run migration:generate

   # Create new migration
   npm run migration:create
   ```

## Running the Application

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. The API will be available at `http://localhost:3000`
3. Swagger documentation will be available at `http://localhost:3000/api`

## API Documentation

The API documentation is available through Swagger UI at `http://localhost:3000/api`. It includes:

- User endpoints
- Item endpoints
- Bid endpoints
- WebSocket events

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```
