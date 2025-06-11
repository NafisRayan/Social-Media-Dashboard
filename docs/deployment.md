# 🚀 Deployment Guide

## Overview
This guide covers deployment options and configurations for the Social Media Dashboard application.

## 🌐 **Deployment Platforms**

### **Vercel (Recommended)**

Vercel provides the best deployment experience for Next.js applications with automatic optimizations and CI/CD.

#### **Quick Deploy**
1. **Connect Repository**
   ```bash
   # Fork/clone the repository
   git clone <your-repo-url>
   cd social-media-dashboard
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Deploy**
   ```bash
   vercel
   ```

#### **Automatic Deployment**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Every push to main branch triggers automatic deployment

#### **Environment Variables**
Set these in your Vercel dashboard:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_DEFAULT_THEME=light
```

#### **Custom Domain**
1. Add your domain in Vercel dashboard
2. Configure DNS records
3. SSL certificates are automatically provisioned

### **Netlify**

#### **Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node version**: 18.x

#### **netlify.toml Configuration**
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NEXT_PUBLIC_API_URL = "https://api.yourdomain.com"
```

### **AWS Amplify**

#### **Build Configuration**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### **Docker Deployment**

#### **Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### **Docker Compose**
```yaml
version: '3.8'
services:
  dashboard:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
    restart: unless-stopped
```

#### **Build and Run**
```bash
# Build image
docker build -t social-media-dashboard .

# Run container
docker run -p 3000:3000 social-media-dashboard

# Using Docker Compose
docker-compose up -d
```

## ⚙️ **Build Configuration**

### **Next.js Configuration**

#### **next.config.ts**
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for platforms like Netlify
  output: 'export',
  
  // Image optimization
  images: {
    unoptimized: true, // For static export
    domains: ['example.com', 'api.yourdomain.com'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
```

### **Build Scripts**

#### **package.json**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "build:analyze": "ANALYZE=true npm run build",
    "build:static": "next build && next export",
    "preview": "npm run build && npm run start"
  }
}
```

### **Environment Configuration**

#### **Environment Files**
```bash
.env.local          # Local development (ignored by git)
.env.development    # Development environment
.env.staging        # Staging environment  
.env.production     # Production environment
```

#### **Example .env.local**
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=dev_api_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# Theme
NEXT_PUBLIC_DEFAULT_THEME=light
```

## 🔒 **Security Configuration**

### **Content Security Policy**
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com;
      style-src 'self' 'unsafe-inline' *.googleapis.com;
      img-src 'self' blob: data: *.githubusercontent.com;
      font-src 'self' *.gstatic.com;
      connect-src 'self' *.vercel.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### **HTTPS Configuration**
Ensure all production deployments use HTTPS:
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS  
- Custom: Configure SSL certificates

## 📊 **Performance Optimization**

### **Build Optimization**
```typescript
// next.config.ts
const nextConfig = {
  // Bundle analyzer
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
  
  // Compression
  compress: true,
  
  // Static optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};
```

### **Image Optimization**
```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### **Caching Strategy**
```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🔄 **CI/CD Pipeline**

### **GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to Vercel
        uses: vercel/action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### **GitLab CI**
```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run test

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm run deploy
  only:
    - main
```

## 🌍 **CDN Configuration**

### **Cloudflare**
1. **DNS Configuration**
   - Point your domain to deployment platform
   - Enable Cloudflare proxy

2. **Performance Settings**
   - Enable Auto Minify (HTML, CSS, JS)
   - Enable Brotli compression
   - Set up caching rules

3. **Security Settings**
   - Enable SSL/TLS encryption
   - Configure firewall rules
   - Enable bot protection

### **AWS CloudFront**
```json
{
  "CallerReference": "social-media-dashboard",
  "Aliases": {
    "Quantity": 1,
    "Items": ["dashboard.yourdomain.com"]
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "vercel-origin",
        "DomainName": "your-app.vercel.app",
        "CustomOriginConfig": {
          "HTTPPort": 443,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "vercel-origin",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  }
}
```

## 📈 **Monitoring & Analytics**

### **Error Tracking**
```typescript
// Install Sentry
npm install @sentry/nextjs

// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### **Performance Monitoring**
```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### **Google Analytics**
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
npm install

# Type checking
npm run type-check
```

#### **Memory Issues**
```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
  }
}
```

#### **Static Export Issues**
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### **Performance Issues**
1. **Bundle Size Analysis**
   ```bash
   npm run build:analyze
   ```

2. **Image Optimization**
   - Use Next.js Image component
   - Implement lazy loading
   - Serve appropriate formats (WebP, AVIF)

3. **Code Splitting**
   - Use dynamic imports
   - Implement route-based splitting
   - Lazy load heavy components

This deployment guide ensures your Social Media Dashboard is properly configured, secure, and optimized for production environments.
