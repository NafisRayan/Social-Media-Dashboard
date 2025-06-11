# 🔌 API Reference

## Overview
This document provides comprehensive API reference for integrating with the Social Media Dashboard backend services.

## 🌐 **Base Configuration**

### **Base URL**
```
Production: https://api.socialmedia-dashboard.com/v1
Staging: https://staging-api.socialmedia-dashboard.com/v1
Development: http://localhost:8000/v1
```

### **Authentication**
All API requests require authentication using Bearer tokens:

```typescript
const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};
```

### **Request/Response Format**
- All requests and responses use JSON format
- Timestamps are in ISO 8601 format
- Pagination follows cursor-based pattern

## 🔐 **Authentication Endpoints**

### **Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": "https://avatar.url"
    },
    "expiresIn": 3600
  }
}
```

### **Refresh Token**
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Logout**
```http
POST /auth/logout
Authorization: Bearer {token}
```

## 👤 **User Management**

### **Get Current User**
```http
GET /user/me
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://avatar.url",
    "settings": {
      "theme": "light",
      "notifications": true,
      "timezone": "UTC"
    },
    "subscription": {
      "plan": "premium",
      "expiresAt": "2025-12-31T23:59:59Z"
    }
  }
}
```

### **Update User Profile**
```http
PUT /user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "https://new-avatar.url",
  "settings": {
    "theme": "dark",
    "notifications": false
  }
}
```

## 📊 **Analytics Endpoints**

### **Get Overview Statistics**
```http
GET /analytics/overview
Authorization: Bearer {token}
```

**Query Parameters**:
- `period`: `7d`, `30d`, `90d`, `1y` (default: `30d`)
- `accounts`: Comma-separated account IDs

**Response**:
```json
{
  "success": true,
  "data": {
    "summary": {
      "followers": 278534,
      "reach": 5192879,
      "engagement": 98.2,
      "posts": 189
    },
    "growth": {
      "followers": 2.1,
      "reach": 15.3,
      "engagement": -0.5
    },
    "period": {
      "start": "2025-05-11T00:00:00Z",
      "end": "2025-06-11T00:00:00Z"
    }
  }
}
```

### **Get Demographics Data**
```http
GET /analytics/demographics
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "locations": [
      {
        "country": "United States",
        "count": 197520,
        "percentage": 100
      },
      {
        "country": "Brazil", 
        "count": 32985,
        "percentage": 65
      }
    ],
    "ageGroups": [
      {
        "range": "18-24",
        "count": 89234,
        "percentage": 85
      },
      {
        "range": "25-34",
        "count": 156789,
        "percentage": 100
      }
    ]
  }
}
```

### **Get Post Activity**
```http
GET /analytics/activity
Authorization: Bearer {token}
```

**Query Parameters**:
- `startDate`: ISO date string
- `endDate`: ISO date string
- `granularity`: `day`, `week`, `month`

**Response**:
```json
{
  "success": true,
  "data": {
    "calendar": [
      {
        "date": "2025-06-01",
        "posts": 3,
        "stories": 8,
        "reels": 1
      }
    ],
    "summary": {
      "totalPosts": 189,
      "totalStories": 687,
      "totalReels": 24
    }
  }
}
```

## 📱 **Social Media Accounts**

### **List Connected Accounts**
```http
GET /accounts
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "acc_123",
      "platform": "instagram",
      "username": "@samanthawilliam_",
      "displayName": "Samantha William",
      "avatar": "https://avatar.url",
      "followers": 278534,
      "isPrimary": true,
      "status": "active",
      "connectedAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

### **Connect New Account**
```http
POST /accounts/connect
Authorization: Bearer {token}
Content-Type: application/json

{
  "platform": "instagram",
  "authCode": "auth_code_from_oauth",
  "redirectUri": "https://dashboard.app/callback"
}
```

### **Disconnect Account**
```http
DELETE /accounts/{accountId}
Authorization: Bearer {token}
```

### **Set Primary Account**
```http
PUT /accounts/{accountId}/primary
Authorization: Bearer {token}
```

## 📝 **Posts Management**

### **Get Posts**
```http
GET /posts
Authorization: Bearer {token}
```

**Query Parameters**:
- `accountId`: Filter by account
- `status`: `published`, `scheduled`, `draft`
- `limit`: Number of posts (default: 20, max: 100)
- `cursor`: Pagination cursor

**Response**:
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "accountId": "acc_123",
        "content": "Amazing sunset today! 🌅",
        "media": [
          {
            "type": "image",
            "url": "https://media.url/image.jpg",
            "thumbnail": "https://media.url/thumb.jpg"
          }
        ],
        "status": "published",
        "scheduledAt": "2025-06-11T18:00:00Z",
        "publishedAt": "2025-06-11T18:00:00Z",
        "metrics": {
          "likes": 1250,
          "comments": 89,
          "shares": 34,
          "reach": 12500
        }
      }
    ],
    "pagination": {
      "hasNext": true,
      "nextCursor": "cursor_abc123"
    }
  }
}
```

### **Create Post**
```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "accountId": "acc_123",
  "content": "New post content with #hashtags",
  "media": [
    {
      "type": "image",
      "url": "https://media.url/image.jpg"
    }
  ],
  "scheduledAt": "2025-06-12T10:00:00Z"
}
```

### **Update Post**
```http
PUT /posts/{postId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Updated content",
  "scheduledAt": "2025-06-12T11:00:00Z"
}
```

### **Delete Post**
```http
DELETE /posts/{postId}
Authorization: Bearer {token}
```

### **Get Post Analytics**
```http
GET /posts/{postId}/analytics
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "metrics": {
      "reach": 12500,
      "impressions": 15600,
      "likes": 1250,
      "comments": 89,
      "shares": 34,
      "saves": 156
    },
    "demographics": {
      "gender": {
        "male": 45,
        "female": 55
      },
      "ageGroups": [
        {"range": "18-24", "percentage": 35},
        {"range": "25-34", "percentage": 40}
      ]
    },
    "timeline": [
      {
        "timestamp": "2025-06-11T18:00:00Z",
        "likes": 0,
        "comments": 0
      },
      {
        "timestamp": "2025-06-11T19:00:00Z", 
        "likes": 150,
        "comments": 12
      }
    ]
  }
}
```

## 📅 **Scheduling**

### **Get Schedule**
```http
GET /schedule
Authorization: Bearer {token}
```

**Query Parameters**:
- `startDate`: ISO date string
- `endDate`: ISO date string
- `accountId`: Filter by account

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "schedule_123",
      "postId": "post_456",
      "accountId": "acc_123",
      "scheduledAt": "2025-06-12T10:00:00Z",
      "content": "Scheduled post content",
      "status": "pending",
      "type": "post"
    }
  ]
}
```

### **Create Scheduled Post**
```http
POST /schedule
Authorization: Bearer {token}
Content-Type: application/json

{
  "accountId": "acc_123",
  "content": "Scheduled content",
  "scheduledAt": "2025-06-15T14:00:00Z",
  "type": "post",
  "media": []
}
```

## 🚨 **Notifications**

### **Get Notifications**
```http
GET /notifications
Authorization: Bearer {token}
```

**Query Parameters**:
- `limit`: Number of notifications (default: 20)
- `unreadOnly`: Boolean

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "notif_123",
      "type": "milestone",
      "title": "New follower milestone reached!",
      "message": "You've reached 280k followers on Instagram",
      "isRead": false,
      "createdAt": "2025-06-11T15:30:00Z",
      "data": {
        "accountId": "acc_123",
        "milestone": 280000
      }
    }
  ]
}
```

### **Mark Notification as Read**
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer {token}
```

### **Mark All as Read**
```http
PUT /notifications/read-all
Authorization: Bearer {token}
```

## 📈 **Analytics Insights**

### **Get Anomaly Detection**
```http
GET /analytics/anomalies
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "anomaly_123",
      "type": "follower_spike",
      "severity": "high",
      "detected_at": "2025-06-11T12:00:00Z",
      "description": "Unusual increase in followers",
      "metrics": {
        "expected": 100,
        "actual": 580,
        "deviation": 480
      },
      "suggestions": [
        "Check for viral content",
        "Monitor engagement quality"
      ]
    }
  ]
}
```

### **Get Competitor Analysis**
```http
GET /analytics/competitors
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "username": "@competitor1",
      "followers": 350000,
      "growth": 5.2,
      "engagement": 3.8,
      "topPosts": [
        {
          "url": "https://instagram.com/p/abc123",
          "likes": 15000,
          "comments": 500
        }
      ]
    }
  ]
}
```

## 🔍 **Search & Discovery**

### **Search Posts**
```http
GET /search/posts
Authorization: Bearer {token}
```

**Query Parameters**:
- `q`: Search query
- `accountId`: Filter by account
- `dateFrom`: Start date
- `dateTo`: End date

### **Hashtag Analysis**
```http
GET /analytics/hashtags
Authorization: Bearer {token}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "hashtag": "#sunset",
      "usage": 15,
      "avgLikes": 1200,
      "avgReach": 8500,
      "trend": "up"
    }
  ]
}
```

## ⚠️ **Error Handling**

### **Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Authentication token is invalid or expired",
    "details": {
      "field": "authorization",
      "value": "Bearer invalid_token"
    }
  },
  "timestamp": "2025-06-11T16:30:00Z",
  "requestId": "req_abc123"
}
```

### **HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

### **Common Error Codes**
- `INVALID_TOKEN` - Authentication token is invalid
- `TOKEN_EXPIRED` - Authentication token has expired
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `VALIDATION_ERROR` - Request validation failed
- `ACCOUNT_NOT_FOUND` - Social media account not found
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions

## 🔄 **Rate Limiting**

### **Rate Limits**
- **Authentication**: 5 requests per minute
- **Analytics**: 100 requests per hour
- **Posts**: 50 requests per hour
- **General**: 1000 requests per hour

### **Rate Limit Headers**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1623456789
X-RateLimit-Window: 3600
```

## 🔗 **Webhooks**

### **Configure Webhooks**
```http
POST /webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://yourapp.com/webhook",
  "events": ["post.published", "follower.milestone"],
  "secret": "webhook_secret_key"
}
```

### **Webhook Events**
- `post.published` - Post has been published
- `post.failed` - Post publishing failed
- `follower.milestone` - Follower milestone reached
- `anomaly.detected` - Anomaly detected in metrics
- `account.connected` - New account connected
- `account.disconnected` - Account disconnected

### **Webhook Payload Example**
```json
{
  "event": "follower.milestone",
  "timestamp": "2025-06-11T16:30:00Z",
  "data": {
    "accountId": "acc_123",
    "milestone": 280000,
    "previousCount": 279500
  },
  "signature": "sha256=abc123..."
}
```

## 📚 **SDK Examples**

### **JavaScript/TypeScript**
```typescript
import { SocialMediaDashboardAPI } from '@socialmedia/api-client';

const api = new SocialMediaDashboardAPI({
  baseURL: 'https://api.socialmedia-dashboard.com/v1',
  token: 'your_access_token'
});

// Get overview statistics
const overview = await api.analytics.getOverview({
  period: '30d'
});

// Create a scheduled post
const post = await api.posts.create({
  accountId: 'acc_123',
  content: 'Hello world!',
  scheduledAt: new Date('2025-06-15T10:00:00Z')
});
```

### **Python**
```python
from socialmedia_api import SocialMediaAPI

api = SocialMediaAPI(
    base_url='https://api.socialmedia-dashboard.com/v1',
    token='your_access_token'
)

# Get analytics
overview = api.analytics.get_overview(period='30d')

# Create post
post = api.posts.create(
    account_id='acc_123',
    content='Hello world!',
    scheduled_at='2025-06-15T10:00:00Z'
)
```

This API reference provides comprehensive documentation for integrating with the Social Media Dashboard backend services. For additional support, refer to the SDK documentation or contact the API support team.
