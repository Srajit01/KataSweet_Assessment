# Sweet Shop Management System

A comprehensive full-stack application for managing a sweet shop built using Test-Driven Development (TDD) principles. The system includes a robust backend API with Node.js/TypeScript and a modern React frontend.

![Sweet Shop Management System](https://images.pexels.com/photos/1684718/pexels-photo-1684718.jpeg?auto=compress&cs=tinysrgb&w=1200)

## 🚀 Features

### Backend API
- **RESTful API** with Node.js, TypeScript, and Express
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** with role-based authorization
- **Complete CRUD Operations** for sweet management
- **Advanced Search & Filtering** by name, category, and price range
- **Purchase & Inventory Management** with real-time stock updates
- **Comprehensive Test Coverage** with Jest and Supertest
- **Security Features** including helmet, CORS, and rate limiting

### Frontend Application
- **Modern React SPA** with TypeScript
- **Responsive Design** with Tailwind CSS
- **Role-based UI** for customers and administrators
- **Real-time Updates** for inventory and purchases
- **Advanced Search Interface** with intuitive filters
- **Professional Design** with smooth animations and micro-interactions

## 🏗️ Architecture

```
sweet-shop-management-system/
├── backend/                 # Node.js/TypeScript API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Utility functions
│   │   └── validation/     # Joi validation schemas
│   └── __tests__/          # Test files
├── frontend/               # React/TypeScript SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layers
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Joi
- **Testing:** Jest with Supertest
- **Security:** Helmet, CORS, Rate Limiting

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **UI Components:** Lucide React icons
- **Notifications:** React Hot Toast

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sweetshop
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system or update the connection string for cloud MongoDB.

5. **Run the backend**
   ```bash
   # Development
   npm run dev
   
   # Production build
   npm run build
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the frontend**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweet Management (Protected)
- `GET /api/sweets` - Get all sweets (paginated)
- `GET /api/sweets/search` - Search sweets with filters
- `POST /api/sweets` - Create new sweet (admin only)
- `PUT /api/sweets/:id` - Update sweet (admin only)
- `DELETE /api/sweets/:id` - Delete sweet (admin only)

### Inventory Operations
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (admin only)

### Health Check
- `GET /api/health` - API health status

## 👥 User Roles

### Customer (User)
- Browse and search sweets
- Purchase items with quantity selection
- View real-time inventory updates
- Access personal dashboard

### Shop Administrator
- All customer features plus:
- Add, edit, and delete sweets
- Restock inventory items
- View inventory statistics
- Manage product categories

## 🎯 Demo Accounts

For testing purposes, you can use these demo accounts:

- **Customer Account:**
  - Email: `user@demo.com`
  - Password: `password123`

- **Admin Account:**
  - Email: `admin@demo.com`
  - Password: `password123`

## 🔒 Security Features

- **JWT Authentication** with automatic token handling
- **Password Hashing** with bcrypt (12 salt rounds)
- **Rate Limiting** (100 requests per 15 minutes)
- **CORS Protection** with configurable origins
- **Input Validation** with Joi schemas
- **SQL Injection Protection** through Mongoose ODM

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- AWS EC2/Lambda
- DigitalOcean
- Railway

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🤖 My AI Usage

I leveraged AI tools extensively throughout this project while maintaining transparency about their usage:

### AI Tools Used
- **Claude Sonnet 4** - Primary AI assistant for architecture design, code generation, and documentation
- **GitHub Copilot** - Code completion and pattern suggestions during development

### How I Used AI

1. **Project Architecture & Planning**
   - Used Claude to design the overall system architecture
   - Generated comprehensive project structure and file organization
   - Planned the API endpoints and data models

2. **Backend Development**
   - Generated initial Express.js and TypeScript boilerplate
   - Created comprehensive test suites following TDD principles
   - Implemented security middleware and authentication flows
   - Generated Joi validation schemas and error handling

3. **Frontend Development**
   - Created React component architecture and TypeScript interfaces
   - Generated responsive UI components with Tailwind CSS
   - Implemented React Context for state management
   - Built form handling with React Hook Form

4. **Testing & Documentation**
   - Generated comprehensive test cases for both unit and integration testing
   - Created detailed API documentation and README files
   - Implemented proper error handling and user feedback systems

### Reflection on AI Impact

AI tools significantly accelerated the development process by:

**Positive Impacts:**
- **Rapid Prototyping:** Quickly generated boilerplate code and project structure
- **Best Practices:** Ensured adherence to modern development patterns and security practices
- **Comprehensive Testing:** Generated thorough test coverage from the beginning
- **Documentation:** Created detailed documentation and comments
- **Type Safety:** Helped implement comprehensive TypeScript interfaces

**Human Oversight:**
- Carefully reviewed all AI-generated code for correctness and optimization
- Made architectural decisions based on specific requirements
- Customized generated patterns to match project needs
- Ensured business logic correctness through manual testing

**Learning Experience:**
- AI helped me explore new patterns and best practices
- Accelerated learning of TypeScript and modern React patterns
- Provided alternative approaches to problem-solving

The AI tools served as intelligent coding assistants, helping me focus on business logic and architecture decisions while handling boilerplate generation and ensuring consistent patterns throughout the codebase.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: [your-email@example.com]

---

**Built with ❤️ using modern web technologies and Test-Driven Development principles.**