# Next.js App Deployment Guide

This guide explains how to set up and run the Next.js app locally.

---

## Steps to Run Locally

### 1. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 2. Configure Environment Variables
Set up the backend server URL by creating a .env file in the root of your project and adding the following line:

```env
VITE_REACT_APP_API_URL=<your-backend-server-url>
```

### 3. Start the Development Server
Run the following command to start the app in development mode:

```bash
npm run dev
```
