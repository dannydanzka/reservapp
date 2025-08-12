# 📱 API Contracts - ReservApp Mobile

Simple and clear contracts for all API endpoints used in ReservApp Mobile. Think of this as a reference manual for what data to send and what data you'll get back.

## 🌐 Base Information

**API Base URL:** `https://reservapp-web.vercel.app/api`

**Authentication:** Most endpoints require JWT token in header:
```
Authorization: Bearer your-jwt-token-here
```

**Response Format:** All responses follow this structure:
```json
{
  "success": true/false,
  "message": "Description of what happened",
  "data": { /* Your actual data */ }
}
```

---

## 🔐 Authentication API

### POST `/auth/login`
**What it does:** Login with email and password

**Send this:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "phone": "+1234567890"
    }
  }
}
```

### POST `/auth/register`
**What it does:** Create a new user account

**Send this:**
```json
{
  "email": "nuevo@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "new-user-uuid",
      "email": "nuevo@example.com",
      "name": "John Doe"
    }
  }
}
```

### POST `/auth/logout`
**What it does:** Logout and invalidate token

**Send this:** Nothing (just the Auth header)

**You get back:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST `/auth/forgot-password`
**What it does:** Send password reset email

**Send this:**
```json
{
  "email": "user@example.com"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### POST `/auth/reset-password`
**What it does:** Reset password with token from email

**Send this:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newPassword123"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## 🏢 Venues API

### GET `/venues`
**What it does:** Get list of venues

**Query parameters you can add:**
- `page=1` - Which page (starts at 1)
- `limit=10` - How many venues per page
- `search=restaurant` - Search by name/description
- `category=dining` - Filter by category

**Example:** `GET /venues?page=1&limit=10&category=restaurant&search=jardín`

**You get back:**
```json
{
  "success": true,
  "data": [
    {
      "id": "venue-uuid",
      "name": "Restaurante El Jardín",
      "category": "restaurant", 
      "description": "Mediterranean restaurant",
      "address": "Main Street 123",
      "city": "Madrid",
      "phone": "+34123456789",
      "email": "info@eljardin.com",
      "rating": 4.5,
      "priceRange": "$$",
      "images": ["url1.jpg", "url2.jpg"],
      "isActive": true,
      "isFavorite": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasMore": true
  }
}
```

### GET `/venues/{id}`
**What it does:** Get details of one specific venue

**You get back:**
```json
{
  "success": true,
  "data": {
    "id": "venue-uuid",
    "name": "Hotel Las Palmas",
    "description": "Luxury beachfront hotel",
    "category": "accommodation",
    "rating": 4.8,
    "reviewCount": 125,
    "priceRange": { "min": 150, "max": 300, "currency": "USD" },
    "images": ["hotel1.jpg", "hotel2.jpg"],
    "address": {
      "street": "Beach Avenue 456",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "zipCode": "33139"
    },
    "contact": {
      "phone": "+1305123456",
      "email": "info@laspalmas.com",
      "website": "https://laspalmas.com"
    },
    "amenities": ["WIFI", "PARKING", "PAYMENT_CARDS"],
    "services": [
      {
        "id": "service-uuid",
        "name": "Deluxe Room",
        "price": { "amount": 200, "currency": "USD", "unit": "per_night" },
        "duration": 1440,
        "isAvailable": true
      }
    ]
  }
}
```

### POST `/venues/favorites/{venueId}`
**What it does:** Add venue to favorites

**Send this:** Nothing (venue ID is in URL)

**You get back:**
```json
{
  "success": true,
  "message": "Added to favorites"
}
```

### DELETE `/venues/favorites/{venueId}`
**What it does:** Remove venue from favorites

**You get back:**
```json
{
  "success": true,
  "message": "Removed from favorites"
}
```

### GET `/venues/favorites`
**What it does:** Get your favorite venues

**Query parameters:**
- `page=1` - Page number
- `limit=10` - Items per page

**You get back:** Same format as GET `/venues` but only your favorites

---

## 🛍️ Services API

### GET `/services`
**What it does:** Get list of services

**Query parameters:**
- `page=1` - Page number
- `limit=10` - Items per page
- `category=SPA_WELLNESS` - Filter by service category
- `venueId=venue-uuid` - Services from specific venue
- `available=true` - Only available services
- `minPrice=50` - Minimum price filter
- `maxPrice=200` - Maximum price filter

**You get back:**
```json
{
  "success": true,
  "data": [
    {
      "id": "service-uuid",
      "name": "Relaxing Massage",
      "description": "60-minute full body massage",
      "category": "SPA_WELLNESS",
      "venueId": "venue-uuid",
      "venue": {
        "id": "venue-uuid",
        "name": "Spa Resort"
      },
      "price": {
        "amount": 120,
        "currency": "USD",
        "unit": "per_person"
      },
      "duration": 60,
      "capacity": { "min": 1, "max": 2 },
      "rating": 4.7,
      "reviewCount": 45,
      "images": ["massage1.jpg"],
      "isActive": true,
      "isAvailable": true,
      "features": ["Professional therapist", "Essential oils"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "hasMore": true
  }
}
```

### GET `/services/{id}`
**What it does:** Get details of one specific service

**You get back:** Same service object format as above, but with complete details

### GET `/services/{id}/availability`
**What it does:** Check availability for a service on a specific date

**Query parameters:**
- `date=2025-02-15` - Date to check (YYYY-MM-DD format)
- `duration=60` - Duration in minutes (optional)

**You get back:**
```json
{
  "success": true,
  "data": {
    "serviceId": "service-uuid",
    "date": "2025-02-15",
    "timeSlots": [
      {
        "startTime": "09:00",
        "endTime": "10:00",
        "available": true,
        "capacity": 4,
        "booked": 1,
        "price": 120
      },
      {
        "startTime": "10:00",
        "endTime": "11:00",
        "available": false,
        "capacity": 4,
        "booked": 4
      }
    ]
  }
}
```

---

## 📅 Reservations API

### GET `/reservations`
**What it does:** Get your reservations

**Query parameters:**
- `page=1` - Page number  
- `limit=10` - Items per page
- `status=CONFIRMED` - Filter by status
- `dateFrom=2025-01-01` - Start date filter
- `dateTo=2025-12-31` - End date filter

**You get back:**
```json
{
  "success": true,
  "data": [
    {
      "id": "reservation-uuid",
      "bookingReference": "RES-2025-001",
      "status": "CONFIRMED",
      "dateTime": {
        "startDate": "2025-02-15",
        "startTime": "14:00",
        "endDate": "2025-02-16", 
        "endTime": "12:00"
      },
      "guestInfo": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "adults": 2,
        "children": 0,
        "specialRequests": "Late check-in please"
      },
      "venue": {
        "id": "venue-uuid",
        "name": "Hotel Las Palmas"
      },
      "service": {
        "id": "service-uuid",
        "name": "Deluxe Room",
        "price": { "amount": 200, "currency": "USD" }
      },
      "pricing": {
        "basePrice": 200,
        "taxes": 20,
        "fees": 10,
        "discount": 0,
        "total": 230,
        "currency": "USD"
      },
      "payment": {
        "method": "card",
        "status": "paid",
        "transactionId": "txn_123456789"
      },
      "createdAt": "2025-01-12T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "hasMore": false
  }
}
```

### POST `/reservations`
**What it does:** Create a new reservation

**Send this:**
```json
{
  "venueId": "venue-uuid",
  "serviceId": "service-uuid",
  "dateTime": {
    "startDate": "2025-02-15",
    "startTime": "14:00",
    "endDate": "2025-02-16",
    "endTime": "12:00"
  },
  "guestInfo": {
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "phone": "+1234567890",
    "adults": 2,
    "children": 0,
    "specialRequests": "Anniversary celebration"
  },
  "paymentMethodId": "pm_stripe_payment_method"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Reservation created successfully",
  "data": {
    "id": "new-reservation-uuid",
    "bookingReference": "RES-2025-002",
    "status": "PENDING",
    // ... all reservation details like GET response
  }
}
```

### GET `/reservations/{id}`
**What it does:** Get details of one specific reservation

**You get back:** Same reservation object format as above

### PATCH `/reservations/{id}`
**What it does:** Update an existing reservation

**Send this (only the fields you want to change):**
```json
{
  "dateTime": {
    "startDate": "2025-02-20",
    "startTime": "15:00"
  },
  "guestInfo": {
    "adults": 3,
    "specialRequests": "Updated request"
  },
  "status": "CONFIRMED"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Reservation updated successfully",
  "data": {
    // ... updated reservation object
  }
}
```

### DELETE `/reservations/{id}`
**What it does:** Cancel/delete a reservation

**You get back:**
```json
{
  "success": true,
  "message": "Reservation cancelled successfully"
}
```

---

## 🔔 Notifications API

### GET `/notifications`
**What it does:** Get your notifications

**Query parameters:**
- `page=1` - Page number
- `limit=20` - Items per page  
- `isRead=false` - Filter read/unread
- `type=RESERVATION_CONFIRMATION` - Filter by notification type

**You get back:**
```json
{
  "success": true,
  "data": [
    {
      "id": "notification-uuid",
      "type": "RESERVATION_CONFIRMATION",
      "title": "Reservation Confirmed",
      "message": "Your reservation for February 15 has been confirmed",
      "metadata": {
        "reservationId": "reservation-uuid",
        "venueName": "Hotel Las Palmas",
        "amount": 230
      },
      "isRead": false,
      "createdAt": "2025-01-12T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "hasMore": false
  }
}
```

### POST `/notifications/{id}/read`
**What it does:** Mark a notification as read

**You get back:**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### POST `/notifications/read-all`
**What it does:** Mark all notifications as read

**You get back:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### GET `/notifications/unread-count`
**What it does:** Get count of unread notifications

**You get back:**
```json
{
  "success": true,
  "data": {
    "count": 3
  }
}
```

---

## 💳 Payment API

### POST `/payments/create-intent`
**What it does:** Create a payment intent for Stripe

**Send this:**
```json
{
  "amount": 23000,
  "currency": "usd",
  "reservationId": "reservation-uuid"
}
```

**You get back:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_1234567890_secret_abcdefg",
    "amount": 23000,
    "currency": "usd",
    "status": "requires_payment_method"
  }
}
```

### POST `/payments/confirm`
**What it does:** Confirm a payment

**Send this:**
```json
{
  "paymentIntentId": "pi_1234567890",
  "paymentMethodId": "pm_stripe_card_123"
}
```

**You get back:**
```json
{
  "success": true,
  "data": {
    "paymentIntentId": "pi_1234567890",
    "status": "succeeded",
    "amount": 23000
  }
}
```

---

## 👤 User Profile API

### GET `/users/profile`
**What it does:** Get your user profile

**You get back:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe", 
    "phone": "+1234567890",
    "role": "USER",
    "isActive": true,
    "settings": {
      "language": "en",
      "currency": "USD",
      "notifications": {
        "email": true,
        "push": false,
        "sms": false,
        "marketing": false,
        "reservationUpdates": true
      }
    },
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

### PUT `/users/profile`
**What it does:** Update your profile

**Send this (only the fields you want to change):**
```json
{
  "firstName": "Johnny",
  "phone": "+1234567891",
  "settings": {
    "language": "es",
    "notifications": {
      "email": false,
      "push": true
    }
  }
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // ... updated user object
  }
}
```

### POST `/users/change-password`
**What it does:** Change your password

**Send this:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

**You get back:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 📊 Common Response Codes

| Code | Meaning | What to do |
|------|---------|------------|
| 200 | Success | Everything worked! |
| 201 | Created | New resource created |
| 400 | Bad Request | Check your data format |
| 401 | Unauthorized | Your token expired, login again |
| 403 | Forbidden | You don't have permission |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Fix the validation errors |
| 500 | Server Error | Try again or contact support |

---

## 🎯 Error Response Format

When something goes wrong, you'll get:
```json
{
  "success": false,
  "message": "What went wrong",
  "error": "VALIDATION_ERROR",
  "details": {
    "field": "email",
    "message": "Email is required"
  }
}
```

---

## ⏱️ Rate Limiting

- Maximum 100 requests per minute per user
- Authentication endpoints: 10 requests per minute
- If exceeded, you get `429 Too Many Requests`

---

## 🔄 Pagination Pattern

All list endpoints support pagination:

**Request:**
```
GET /endpoint?page=2&limit=20
```

**Response includes:**
```json
{
  "data": [/* your items */],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasMore": true
  }
}
```

---

This document is your quick reference for integrating with ReservApp's API. Each endpoint is a simple contract: send this, get that. No complicated implementation details, just what you need to know to make it work.

**Last Updated:** January 2025
**API Version:** 1.0