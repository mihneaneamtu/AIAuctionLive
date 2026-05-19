# Quick Start Guide - AI Auction Live

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
# From project root
npm install
```

### Step 2: Setup Database (1 minute)

**Option A: PostgreSQL Docker (Easiest)**
```bash
docker pull postgres:15-alpine
docker run --name auction_postgres \
  -e POSTGRES_USER=auction_user \
  -e POSTGRES_PASSWORD=auction_password \
  -e POSTGRES_DB=auction_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

**Option B: Using Docker Compose (Recommended)**
```bash
docker-compose up -d postgres
```

**Option C: Local PostgreSQL**
- Make sure PostgreSQL 14+ is installed
- Create database: `createdb auction_db`
- Create user: `createuser -P auction_user`
- Grant privileges: `psql -c "ALTER USER auction_user WITH SUPERUSER;"`

### Step 3: Start Frontend (Terminal 1)

```bash
cd apps/frontend
npm run dev
```

**Output:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
```

✅ **Frontend running at:** http://localhost:3000

### Step 4: Start Backend (Terminal 2)

```bash
cd apps/backend
npm run dev
```

**Output:**
```
Server running on port 3001
Environment: development
```

✅ **Backend running at:** http://localhost:3001

### Step 5: Test It Out! 🎉

1. Open http://localhost:3000 in your browser
2. You should see the AI Auction Live homepage
3. Try browsing auctions
4. Test login/register functionality

---

## 📊 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:3000 | Web application |
| **Backend API** | http://localhost:3001 | REST API |
| **Health Check** | http://localhost:3001/health | API status |
| **Database** | localhost:5432 | PostgreSQL |

---

## 🔧 Using Docker Compose (All-in-One)

```bash
# Start all services at once
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

---

## 📝 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env.local)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://auction_user:auction_password@localhost:5432/auction_db
JWT_SECRET=your_jwt_secret_key_min_32_characters
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Database Connection Failed
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Reset Docker container
docker-compose down -v
docker-compose up -d postgres
```

### Dependencies Error
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 5432 Already in Use
```bash
# Change port in docker-compose.yml or use different port
# Or kill existing PostgreSQL
lsof -ti:5432 | xargs kill -9
```

---

## 📚 Key Pages to Test

- **Home**: http://localhost:3000
- **Browse Auctions**: http://localhost:3000/auctions
- **Auction Detail**: http://localhost:3000/auction/1
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/dashboard
- **API Health**: http://localhost:3001/health

---

## 🎨 Default Accounts (After Seed)

```
Email: demo@example.com
Password: Demo1234!
```

---

## 🚀 Next Steps

1. ✅ Servers running?
2. Create a user account
3. Create an auction listing
4. Place some bids
5. Explore the dashboard
6. Check out the admin panel

---

## 💡 Pro Tips

- Use **React DevTools** extension for debugging
- Check **Network tab** in DevTools for API calls
- Use **VS Code REST Client** to test API endpoints
- Keep **browser console** open for errors
- Hot reload works - edit files and refresh!

---

**🎉 You're all set! Happy auctioning!**
