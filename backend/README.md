# Dawn Child Foundation (DCF) — Backend REST API

This is the dedicated Node.js, Express & MongoDB backend architecture for the **Dawn Child Foundation** platform, supporting early childhood parenting programs, the **"Not Yet" Parent Pledge**, volunteer onboarding, Section 80G tax-exempt donations, school workshops, and community inquiries.

---

## 📁 Directory Structure

```text
backend/
│
├── src/
│   ├── server.js                     # Main Express server and route registration
│   │
│   ├── config/
│   │   └── db.js                     # MongoDB connection with resilient in-memory fallback
│   │
│   ├── routes/
│   │   ├── auth.routes.js            # User authentication routes
│   │   ├── pledge.routes.js          # "Not Yet" Parent Pledge routes
│   │   ├── volunteer.routes.js       # Volunteer registration routes
│   │   ├── donation.routes.js        # Section 80G donations & stats routes
│   │   ├── contact.routes.js         # Community inquiries & contact form
│   │   ├── event.routes.js           # Workshops & school sessions routes
│   │   └── admin.routes.js           # Administrative dashboard overview
│   │
│   ├── controllers/
│   │   ├── auth.controller.js        # Register, login, and profile logic
│   │   ├── pledge.controller.js      # Pledge submission & stats logic
│   │   ├── volunteer.controller.js   # Volunteer onboarding logic
│   │   ├── donation.controller.js    # 80G donation records & stats logic
│   │   ├── contact.controller.js     # Inquiry handling logic
│   │   ├── event.controller.js       # Event scheduling & seat reservation
│   │   └── admin.controller.js       # Aggregated stats & metrics
│   │
│   ├── models/
│   │   ├── User.js                   # User & Admin credentials model
│   │   ├── Pledge.js                 # "Not Yet" Parent Pledge model
│   │   ├── Volunteer.js              # Volunteer applications model
│   │   ├── Donation.js               # Section 80G donations model
│   │   └── Event.js                  # Workshops & sessions model
│   │
│   └── middleware/
│       ├── auth.js                   # JWT Bearer verification middleware
│       └── admin.js                  # Administrative role authorization
│
├── .env                              # Environment variables
├── package.json                      # Dependencies and scripts
└── README.md                         # Documentation
```

---

## 🚀 Quick Start in VS Code

### 1. Open the Backend Folder
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Verify `.env` has your settings (or copy from `.env`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/dawn_child_foundation
JWT_SECRET=dawn_child_foundation_super_secret_jwt_key_2026_xyz
```
*(Note: If you do not have MongoDB running locally, the server will automatically activate a resilient in-memory development store, allowing all API requests to succeed!)*

### 4. Run Development Server
```bash
npm run dev
```

The server starts at `http://localhost:5000`.

---

## 📡 API Endpoints Reference

### Health Check
* `GET /api/health` — Verifies backend status and active database connection mode.

### 1. "Not Yet" Parent Pledge (2025–2026)
* `POST /api/pledge` — Submit a parent pledge with 4 core commitments:
  ```json
  {
    "parentName": "Pooja Sharma",
    "childName": "Aarav Sharma",
    "childGrade": "Class 3",
    "school": "MCD Primary School, Chirag Dilli",
    "commitments": {
      "noSmartphoneUntilClass9": true,
      "noSocialMediaUntil16": true,
      "encourageDeviceFreePlay": true,
      "supportPhoneFreeClassrooms": true
    }
  }
  ```
* `GET /api/pledge/stats` — Returns total verified pledges and target milestones.
* `GET /api/pledge/verify/:certificateId` — Verifies a pledge certificate identifier.
* `GET /api/pledge` *(Admin only)* — Retrieve all submitted pledges.

### 2. Volunteer Management
* `POST /api/volunteer` — Register as a volunteer:
  ```json
  {
    "fullName": "Rohit Verma",
    "email": "rohit.verma@example.com",
    "phone": "+91 98111 22334",
    "rolePreference": "Storyteller & Creative Arts Lead",
    "availability": "Weekends"
  }
  ```
* `GET /api/volunteer` *(Admin only)* — List all volunteer applications.
* `PATCH /api/volunteer/:id/status` *(Admin only)* — Update volunteer onboarding status (`contacted`, `onboarded`).

### 3. Section 80G Donations & Receipts
* `POST /api/donation` — Record donation with 80G tax exemption details:
  ```json
  {
    "donorName": "Sunita Kapoor",
    "donorEmail": "sunita@example.com",
    "donorPan": "ABCPS1234D",
    "amount": 5000,
    "paymentMethod": "UPI",
    "transactionReference": "UPI-UTR-9876543210"
  }
  ```
* `GET /api/donation/stats` — Total funds raised and Section 80G approval number (`DEL-80G/2023-24/A-1082`).
* `GET /api/donation` *(Admin only)* — Complete donation ledger.

### 4. Events & Workshops
* `GET /api/event` — List upcoming Parivaar Parivartan Shaala sessions and workshops.
* `GET /api/event/:id` — View event details.
* `POST /api/event/:id/register` — Reserve seats for a workshop.
* `POST /api/event` *(Admin only)* — Schedule a new school workshop.

### 5. Contact & Inquiries
* `POST /api/contact` — Send a query from the website contact modal.
* `GET /api/contact` *(Admin only)* — View community inquiries.

### 6. Authentication & Admin
* `POST /api/auth/register` — Register a new account.
* `POST /api/auth/login` — Login with email and password to receive JWT.
* `GET /api/auth/profile` *(Protected)* — Get current user information.
* `GET /api/admin/overview` *(Admin only)* — Holistic metrics dashboard.
