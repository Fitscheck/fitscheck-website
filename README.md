# README for FitsCheck Web

## Project Overview

The Fit Check Application allows users to post their outfit fits, engage in challenges, and interact with other users through likes, shares, comments, and voting. This repository contains the web landing page for the FitsCheck app, built using Next.js and TypeScript.

## Features

- **Landing Page**: An engaging introduction to the FitsCheck app.
- **Pricing Page**: Detailed pricing options for users.
- **Admin Dashboard**: A secure area for administrators to manage the application.
- **Login Page**: A login interface for admin users.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static types.
- **React**: A JavaScript library for building user interfaces.

## Project Structure

```
fitscheck-web
├── src
│   ├── app
│   │   ├── admin
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   └── login
│   │   │       └── page.tsx
│   │   ├── pricing
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── common
│   │   │   ├── Button.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── NavBar.tsx
│   │   ├── admin
│   │   │   └── LoginForm.tsx
│   │   ├── home
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Download.tsx
│   │   └── pricing
│   │       └── PricingCards.tsx
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── auth.ts
│   └── styles
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd fitscheck-web
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com), the recommended platform for Next.js applications.

### Deploying to Vercel

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Add environment variables if needed:
   - `NEXT_PUBLIC_API_BASE_URL` - Your API base URL (optional, defaults to `https://fitscheck-backend-5v13.onrender.com`)
7. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

4. Set environment variables (if needed):
   ```bash
   vercel env add NEXT_PUBLIC_API_BASE_URL
   ```

### Environment Variables

The following environment variables can be configured in Vercel:

- `NEXT_PUBLIC_API_BASE_URL` - The base URL for your API backend (optional)

To set environment variables in Vercel:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Environment Variables"
3. Add your variables for Production, Preview, and Development environments
4. **IMPORTANT**: After adding or updating environment variables, you must redeploy your project for the changes to take effect

### Troubleshooting API Connection Issues

If the admin panel or waitlist form is not connecting to the backend API:

1. **Verify Environment Variable is Set**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure `NEXT_PUBLIC_API_BASE_URL` is set for Production, Preview, and Development
   - The value should be your backend API URL (e.g., `https://fitscheck-backend-5v13.onrender.com`)

2. **Redeploy After Setting Environment Variables**:
   - Environment variables are embedded at build time in Next.js
   - After adding/updating env vars, go to Deployments tab and click "Redeploy" on the latest deployment
   - Or push a new commit to trigger a new deployment

3. **Check Browser Console**:
   - Open browser DevTools (F12) → Console tab
   - Look for API errors or network failures
   - Check if the API base URL is correct in the error messages

4. **Verify CORS Settings**:
   - Ensure your backend API allows requests from your Vercel domain
   - Add your Vercel domain (e.g., `https://your-app.vercel.app`) to the backend's CORS allowed origins

5. **Test API Endpoint**:
   - Try accessing your API endpoint directly in a browser or using curl
   - Example: `curl https://fitscheck-backend-5v13.onrender.com/api/waitlist`

6. **Check Network Tab**:
   - Open browser DevTools → Network tab
   - Try submitting the waitlist form or logging in
   - Check if requests are being made and what the response status is

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.