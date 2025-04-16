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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.