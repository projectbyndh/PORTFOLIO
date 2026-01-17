# API Configuration

## Backend Server Setup

This frontend application expects a backend API server running on `http://localhost:5000`.

### To start the backend server:

1. Navigate to your backend directory
2. Run `npm install`
3. Run `npm run dev` or `npm start`

### API Endpoints Expected:

- `GET /api/partners` - Fetch all partners
- `GET /api/faqs` - Fetch all FAQs
- `GET /api/teams` - Fetch all team members
- `GET /api/services` - Fetch all services
- `GET /api/projects` - Fetch all projects
- `GET /api/careers` - Fetch all careers
- `GET /api/blogs` - Fetch all blogs

## Development Mode

By default, API calls are disabled in development mode to prevent console spam when the backend is not running.

### To enable API calls in development:

Open your browser's developer console and run:
```javascript
localStorage.setItem('enable-api-calls', 'true');
```

Then refresh the page. The hooks will now make API calls to fetch data.

### To disable API calls again:

```javascript
localStorage.removeItem('enable-api-calls');
```

Or:
```javascript
localStorage.setItem('enable-api-calls', 'false');
```

## Environment Variables

You can also set the API URL using environment variables:

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Proxy Configuration

The Vite development server is configured to proxy `/api` requests to `http://localhost:5000`. This is defined in `vite.config.js`.