# CodeArena API

A RESTful API for the CodeArena coding challenge platform.

## Features

- **Challenges Management**: CRUD operations for coding challenges
- **User Management**: User profiles and statistics
- **Leaderboard**: Global and filtered leaderboards
- **Submissions**: Code submission tracking and statistics
- **RESTful Design**: Clean, consistent API endpoints
- **Error Handling**: Comprehensive error responses
- **Pagination**: Efficient data pagination
- **Filtering & Search**: Advanced filtering capabilities

## API Endpoints

### Health Check
- `GET /api/health` - API health status

### Challenges
- `GET /api/challenges` - Get all challenges (with filtering)
- `GET /api/challenges/:id` - Get specific challenge
- `GET /api/challenges/:id/stats` - Get challenge statistics
- `GET /api/challenges/tags/popular` - Get popular tags

### Users
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/:id` - Get specific user
- `GET /api/users/:id/profile` - Get user profile with stats
- `GET /api/users/:id/submissions` - Get user submissions

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/top/:count` - Get top N users
- `GET /api/leaderboard/user/:id/position` - Get user position
- `GET /api/leaderboard/stats` - Get leaderboard statistics

### Submissions
- `GET /api/submissions` - Get all submissions (with filtering)
- `GET /api/submissions/:id` - Get specific submission
- `GET /api/submissions/challenge/:challengeId/stats` - Get challenge submission stats
- `GET /api/submissions/user/:userId/recent` - Get recent user submissions

## Query Parameters

### Pagination
- `limit` - Number of items per page (default: 10-20 depending on endpoint)
- `offset` - Number of items to skip (default: 0)

### Filtering
- `search` - Search term for text fields
- `difficulty` - Filter by challenge difficulty (Easy, Medium, Hard)
- `tag` - Filter by challenge tags
- `status` - Filter by submission status
- `language` - Filter by programming language
- `country` - Filter by user country
- `timeframe` - Filter by time period (all, month, week)

### Sorting
- `sortBy` - Field to sort by
- `sortOrder` - Sort direction (asc, desc)

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  },
  "metadata": {
    "lastUpdated": "2024-01-20T10:00:00Z"
  }
}
```

## Error Responses

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure
4. Start development server: `npm run dev`
5. Start production server: `npm start`

## Development

- `npm run dev` - Start with nodemon for development
- `npm test` - Run tests
- `npm start` - Start production server

## Technologies Used

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-restart
- **Jest** - Testing framework

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication & Authorization (JWT)
- Rate limiting
- API documentation (Swagger)
- Caching (Redis)
- Real-time features (WebSockets)
- File upload handling
- Email notifications