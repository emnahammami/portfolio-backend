# Deployment Guide for Render

## Environment Variables Required

Set these environment variables in your Render dashboard:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

## Build Configuration

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x or higher

## API Endpoints

- Health Check: `GET /health`
- Get Certificates: `GET /api/certifs/getCertificates`
- Projects: `GET /api/projets/...`

## Troubleshooting

1. Check the Render logs for any build or runtime errors
2. Ensure all environment variables are set correctly
3. Verify MongoDB connection is working
4. Check CORS configuration if frontend requests are failing
