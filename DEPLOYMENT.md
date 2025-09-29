# Albanian Music Analytics Platform - Deployment Guide

This document outlines the steps required to deploy the Albanian Music Analytics Platform to a production environment. The platform is built using React and leverages an API abstraction layer for music data.

## 🚀 Deployment Steps

### 1. Prerequisites

Before deployment, ensure you have the following:

-   **Node.js and npm/yarn**: Installed on your deployment server or local machine for building the React application.
-   **Git**: For cloning the repository.
-   **Web Server**: A web server like Nginx or Apache to serve the static React files.
-   **Environment Variables**: API keys and other sensitive configurations set up securely.

### 2. Clone the Repository

First, clone the project repository to your deployment environment:

```bash
git clone <repository-url>
cd albanian-music-website
```

### 3. Install Dependencies

Install the necessary Node.js dependencies:

```bash
npm install
# or
yarn install
```

### 4. Configure Environment Variables

Create a `.env` file in the root of the project directory (`/home/ubuntu/albanian-music-website/`) and populate it with your production environment variables. These variables are crucial for API keys, default provider selection, and other settings.

Example `.env` file:

```
# API Configuration
REACT_APP_DEFAULT_PROVIDER=viberate
REACT_APP_FALLBACK_TO_MOCK=false
REACT_APP_CACHE_ENABLED=true
REACT_APP_RETRY_ATTEMPTS=3
REACT_APP_CACHE_DURATION=300000

# Viberate API (current primary)
REACT_APP_VIBERATE_BASE_URL=https://api.viberate.com/v1
REACT_APP_VIBERATE_API_KEY=YOUR_VIBERATE_PRODUCTION_API_KEY
REACT_APP_VIBERATE_RATE_LIMIT=1000
REACT_APP_VIBERATE_ENABLED=true

# Songstats API (future migration target)
REACT_APP_SONGSTATS_BASE_URL=https://api.songstats.com/v1
REACT_APP_SONGSTATS_API_KEY=YOUR_SONGSTATS_PRODUCTION_API_KEY
REACT_APP_SONGSTATS_RATE_LIMIT=500
REACT_APP_SONGSTATS_ENABLED=false

# Development Settings (ensure these are false for production)
REACT_APP_ENABLE_LOGGING=false
REACT_APP_DEBUG_MODE=false
REACT_APP_MOCK_DATA_ONLY=false
```

**Important**: Replace `YOUR_VIBERATE_PRODUCTION_API_KEY` and `YOUR_SONGSTATS_PRODUCTION_API_KEY` with your actual production API keys. Ensure `REACT_APP_MOCK_DATA_ONLY` is set to `false` for production.

### 5. Build the Application

Build the React application for production. This will create an optimized static build in the `dist` directory (or `build` depending on your React setup, typically `dist` for Vite projects).

```bash
npm run build
# or
yarn build
```

### 6. Configure Web Server (Nginx Example)

Configure your web server to serve the static files from the `dist` directory. Below is an example Nginx configuration.

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /home/ubuntu/albanian-music-website/dist; # Adjust path if necessary
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Configure SSL/TLS
    # listen 443 ssl;
    # ssl_certificate /etc/nginx/ssl/yourdomain.com.crt;
    # ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;
}
```

After creating or modifying the Nginx configuration, test it and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Continuous Integration/Continuous Deployment (CI/CD)

For automated deployments, consider setting up a CI/CD pipeline using tools like GitHub Actions, GitLab CI, Jenkins, or Vercel/Netlify. This would automate steps 2-6 upon code pushes to your main branch.

### 8. Monitoring and Logging

Implement monitoring for your application to track performance, errors, and user activity. Configure logging to capture application logs for debugging and auditing purposes.

## ✅ Post-Deployment Checks

-   Verify that the application is accessible at `yourdomain.com`.
-   Check the browser console for any JavaScript errors.
-   Ensure API calls are successfully being made to the configured provider (Viberate initially).
-   Test key features: artist profiles, track analytics, search, and data visualizations.
-   Monitor server logs for any errors or warnings.

By following these steps, you can successfully deploy the Albanian Music Analytics Platform to a production environment.
