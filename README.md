# AI Auction Live - Modern Online Auction Marketplace

A premium, fully-featured online auction marketplace platform for vehicles, products, and services built with Next.js, Node.js, Express, PostgreSQL, and real-time WebSockets.

![Status](https://img.shields.io/badge/Status-Development-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### Core Auction Features
- ✅ Real-time bidding with WebSocket support
- ✅ Live auction countdown timers
- ✅ Automatic bid increment system
- ✅ Reserve price and buyout options
- ✅ Auction history and bid tracking
- ✅ Watchlist/Favorites system
- ✅ Real-time notifications

### Marketplace Categories
- 🚗 Vehicles (Cars, Motorcycles, Trucks, Boats)
- 💻 Electronics
- 🏠 Real Estate
- 👜 Luxury Items
- 🔧 Services
- 🎨 Collectibles
- ⚙️ Spare Parts
- 🏗️ Construction Equipment

### User Features
- 👤 Buyer & Seller Dashboards
- 💬 Real-time Messaging System
- ⭐ Reviews & Ratings System
- 📧 Email Notifications
- 🔒 Secure JWT Authentication
- 🔐 Role-based Access Control

### Vehicle Marketplace
- VIN field and detailed specifications
- Multiple image uploads
- Inspection reports
- Location mapping
- Mileage and condition tracking
- Service history

### Service Marketplace
- Service listings with pricing packages
- Availability calendar
- Portfolio/gallery
- Certifications
- Reviews and ratings

### Admin Panel
- User management
- Auction moderation
- Payment and payout handling
- Dispute resolution
- Fraud detection
- Analytics dashboard

### Payment Integration
- 💳 Stripe
- 🅿️ PayPal
- 💰 Wallet system
- 🔄 Escrow simulation
- 📊 Commission tracking

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time updates
- **React Hook Form** - Form management
- **Zustand** - State management
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **Stripe SDK** - Payment processing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

- Node.js 18+ or Docker
- PostgreSQL 14+ (or use Docker)
- npm or yarn package manager
- Git

## 🚀 Quick Start

### Option 1: Local Development (Recommended)

#### 1. Clone Repository
```bash
git clone <repository-url>
cd AIAuctionLive
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Setup Database

**Option A: Using PostgreSQL locally**
```bash
# Create database
createdb auction_db

# Setup schema
psql auction_db < apps/backend/scripts/schema.sql

# Optional: Seed sample data
npm run db:seed
```

**Option B: Using Docker**
```bash
docker-compose up -d postgres
npm run db:setup
npm run db:seed
```

#### 4. Environment Variables

Frontend (`.env.local`):
```bash
cp apps/frontend/.env.example apps/frontend/.env.local
# Edit with your configuration
```

Backend (`.env.local`):
```bash
cp apps/backend/.env.example apps/backend/.env.local
# Edit with your configuration
```

#### 5. Run Development Servers

**Terminal 1 - Frontend:**
```bash
cd apps/frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd apps/backend
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/health

### Option 2: Using Docker Compose

```bash
# Start all services
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
AIAuctionLive/
├── apps/
│   ├── frontend/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/             # Next.js pages and layouts
│   │   │   ├── components/      # Reusable React components
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   ├── store/           # Zustand stores
│   │   │   ├── utils/           # Utility functions
│   │   │   └── types/           # TypeScript types
│   │   ├── public/              # Static assets
│   │   ├── next.config.js       # Next.js configuration
│   │   ├── tailwind.config.js   # Tailwind CSS configuration
│   │   └── package.json
│   │
│   └── backend/                  # Express.js backend application
│       ├── src/
│       │   ├── server.ts         # Entry point
│       │   ├── config/           # Configuration files
│       │   ├── routes/           # API routes
│       │   ├── middleware/       # Express middleware
│       │   ├── controllers/      # Route controllers
│       │   ├── services/         # Business logic
│       │   ├── models/           # Database models
│       │   ├── types/            # TypeScript types
│       │   └── utils/            # Utility functions
│       ├── scripts/
│       │   ├── schema.sql        # Database schema
│       │   ├── seed.ts           # Sample data seeder
│       │   └── setup-db.ts       # Database setup
│       └── package.json
│
├── docker-compose.yml            # Docker Compose configuration
├── .gitignore
├── .prettierrc                   # Code formatter config
├── package.json                  # Root package.json
└── README.md                     # This file
```

## 🔑 Key Files

### Database
- **Schema**: `apps/backend/scripts/schema.sql` - Complete database schema with 30+ tables
- **Types**: `apps/backend/src/types/index.ts` - TypeScript interfaces for all entities

### Frontend Pages
- **Home**: `apps/frontend/src/app/page.tsx` - Homepage with hero, categories, featured auctions
- **Auctions**: `apps/frontend/src/app/auctions/page.tsx` - Browse auctions with filters
- **Auction Detail**: `apps/frontend/src/app/auction/[id]/page.tsx` - Detailed auction view with bidding
- **Dashboard**: `apps/frontend/src/app/dashboard/page.tsx` - User dashboard (buyer/seller)
- **Auth**: `apps/frontend/src/app/login/page.tsx` - Login page
- **Auth**: `apps/frontend/src/app/register/page.tsx` - Registration page

### Backend API Routes
- **Auth**: `apps/backend/src/routes/auth.ts` - Registration, login, token verification
- **Auctions**: `apps/backend/src/routes/auctions.ts` - CRUD operations for auctions

### Configuration
- **Tailwind**: `apps/frontend/tailwind.config.js` - Custom theme, colors, components
- **TypeScript**: `tsconfig.json` files in both apps
- **Environment**: `.env.example` files in both apps

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/refresh` - Refresh token

### Auctions
- `GET /api/auctions` - List auctions (with pagination, filters, search)
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions` - Create auction
- `PATCH /api/auctions/:id` - Update auction
- `DELETE /api/auctions/:id` - Delete auction

### Real-time Events (WebSocket)
- `join-auction` - Join auction room
- `place-bid` - Place a bid
- `bid-placed` - Broadcast new bid

## 🎨 UI/UX Features

### Design System
- Dark/Light mode support
- Glassmorphism effect cards
- Smooth animations with Framer Motion
- Custom Tailwind components
- Responsive grid layouts
- Toast notifications
- Loading skeletons

### Color Palette
- **Primary**: Sky Blue (#0ea5e9)
- **Secondary**: Slate Gray (#0f172a - #f8fafc)
- **Accent**: Orange (#ff6b1a)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

## 🔐 Security Features

- JWT authentication with 7-day expiration
- Password hashing with bcryptjs
- Email validation
- Role-based access control (User, Seller, Admin)
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- SQL injection prevention with parameterized queries

## 🧪 Testing

```bash
# Run tests (coming soon)
npm run test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Environment Configuration
1. Set all required environment variables
2. Update API URLs for production
3. Configure Stripe/PayPal keys
4. Set up email service
5. Configure S3/Cloud storage for images

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 📝 Code Style

The project uses:
- **Prettier** for code formatting
- **ESLint** for code linting
- **TypeScript** for type safety

```bash
# Format code
npm run format

# Run linter
npm run lint

# Type check
npm run type-check
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
psql postgres -c "SELECT 1"

# Reset database
dropdb auction_db
createdb auction_db
npm run db:setup
```

### Port Already in Use
```bash
# Change port in .env or use different port
# Frontend (3000)
# Backend (3001)
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📧 Support

For support, email: support@aiauctionlive.com

Or open an issue on GitHub.

## 🙋 FAQ

**Q: How do I add more categories?**
A: Insert into the `categories` table in the database, or use an admin endpoint.

**Q: How do I integrate Stripe?**
A: Add your Stripe keys to `.env` and implement payment routes.

**Q: How do real-time bids work?**
A: Users connect via Socket.io, join auction rooms, and broadcast bids to all connected clients.

**Q: Can I modify the UI?**
A: Yes! All UI components are in `/components` and styled with Tailwind CSS.

**Q: How do I add new features?**
A: Follow the existing pattern: create routes, services, and components. Update database schema if needed.

---

**Made with ❤️ for modern auction enthusiasts**
