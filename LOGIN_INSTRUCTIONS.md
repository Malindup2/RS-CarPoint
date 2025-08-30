# RS Car Point - Login Instructions

## Fixed Issues ✅

1. **CORS Configuration**: Updated all backend controllers to allow requests from `localhost:3000-3004`
2. **Login Response Handling**: Fixed frontend to properly handle backend response structure
3. **Role-based Routing**: Added proper role-based redirection after login
4. **Dashboard Route**: Created dedicated dashboard for brokers and regular users

## Default Admin Credentials

**Admin Login:**
- Email: `admin@admin.com`
- Password: `admin123`

## How to Login

1. **Start the Backend** (Spring Boot on port 8082):
   ```bash
   mvnw spring-boot:run
   ```

2. **Start the Frontend** (React on port 3002):
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**:
   - Main Website: http://localhost:3002
   - Login Page: http://localhost:3002/login

## User Roles & Redirections

### Admin Users
- **Login URL**: http://localhost:3002/login
- **Credentials**: admin@admin.com / admin123
- **Redirect**: `/admin` - Full admin dashboard with user management, vehicle management, analytics
- **Features**: 
  - User Management (promote/demote users)
  - Vehicle Management 
  - Sales Analytics
  - System Administration

### Broker Users
- **Login URL**: http://localhost:3002/login  
- **Registration**: http://localhost:3002/broker-signup
- **Redirect**: `/dashboard` - Broker-specific dashboard
- **Features**:
  - Vehicle listings management
  - Sales tracking
  - Commission monitoring
  - Lead management

### Regular Users
- **Login URL**: http://localhost:3002/login
- **Registration**: Through broker signup (gets user role initially)
- **Redirect**: `/dashboard` - Basic user dashboard
- **Features**:
  - Profile management
  - Browse vehicles
  - Become a broker option

## Database Setup

The application uses MongoDB with default admin user auto-creation. On first startup, the system will:

1. Create default admin user with credentials above
2. Set up required collections
3. Initialize the database schema

## API Endpoints

- **Backend**: http://localhost:8082/api
- **Authentication**: http://localhost:8082/api/auth/login
- **CORS**: Configured for localhost:3000-3004

## Troubleshooting

### "Invalid credentials" Error
- Ensure backend is running on port 8082
- Check MongoDB connection in application.properties
- Verify default admin user was created (check console logs)

### CORS Errors
- Confirm frontend is running on ports 3000-3004
- Backend CORS is now configured for these ports

### Login Redirect Issues
- Clear browser localStorage if testing multiple users
- Check console for any JavaScript errors
- Verify user role in the response

## Development Ports

- **Backend (Spring Boot)**: 8082
- **Frontend (React)**: 3002 (or 3000-3004)
- **MongoDB**: Standard MongoDB connection via cloud
