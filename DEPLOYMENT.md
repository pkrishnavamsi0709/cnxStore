# Deployment Guide

This project includes a proxy solution to handle CORS issues when calling Adobe AEM APIs. The solution works both locally and on Vercel.

## How it works

1. **Local Development**: Uses a local Express proxy server running on port 3001
2. **Production (Vercel)**: Uses Vercel serverless functions to handle the proxy

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start both the React app and proxy server:

   ```bash
   npm run dev
   ```

   This will start:

   - React app on http://localhost:3000
   - Proxy server on http://localhost:3001

## Vercel Deployment

1. **Install Vercel CLI** (optional):

   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:

   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

3. **Environment Variables**: No additional environment variables are needed for the free tier.

## API Usage

The proxy automatically handles CORS issues. Use the utility functions in your code:

```javascript
import { fetchAEMContent } from "./utils/apiProxy";

// This will work both locally and on Vercel
const data = await fetchAEMContent(
  "/content/concentrixpartnersandboxprogram/us/en/about-page.model.json"
);
```

## File Structure

- `api/proxy.js` - Vercel serverless function for production proxy
- `proxy-server.js` - Local Express proxy server for development
- `src/utils/apiProxy.js` - Utility functions for making API calls
- `vercel.json` - Vercel configuration

## Troubleshooting

1. **CORS errors**: Make sure you're using the proxy utility functions instead of direct API calls
2. **Proxy not working locally**: Ensure both the React app and proxy server are running
3. **Vercel deployment issues**: Check the Vercel function logs in the dashboard

## Free Tier Limitations

- Vercel Functions have a 10-second timeout on the free tier
- Maximum payload size is 4.5MB
- 100GB-hours of serverless function execution per month

For most use cases, these limits should be sufficient for the proxy functionality.
