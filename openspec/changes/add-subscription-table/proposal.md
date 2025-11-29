# Change: Add Subscription Management Table

## Why

The dashboard currently displays only a welcome message with no actual subscription management functionality. Users need to be able to view, add, edit, and delete their subscriptions with details including icons, names, renewal cycles, prices, and remaining time. This data needs to be persisted in MongoDB Atlas to provide a complete subscription tracking system.

## What Changes

- Set up MongoDB Atlas connection with Mongoose ODM
- Create subscription data model with fields: icon, name, renewal cycle, price, next renewal date
- Implement API routes for CRUD operations (Create, Read, Update, Delete)
- Build subscription table component on dashboard with:
  - Icon display (selectable from lucide-react library)
  - Name, renewal cycle (yearly/quarterly/monthly), price, remaining time columns
  - Edit and delete action buttons for each row
  - Add new subscription button with modal/form
  - Search/filter functionality to find subscriptions
- Calculate and display remaining time until next renewal
- Add loading states and error handling for database operations
- Implement responsive table design for mobile and desktop

## Impact

- **Affected specs**:
  - `dashboard` (MODIFIED - add subscription table and CRUD operations)
  - `database` (ADDED - new capability for MongoDB connection and models)
  - `api` (ADDED - new capability for subscription API endpoints)
- **Affected code**:
  - `app/dashboard/page.tsx` - Add subscription table, add/edit forms, and search
  - `app/api/subscriptions/route.ts` - New API route for listing and creating subscriptions
  - `app/api/subscriptions/[id]/route.ts` - New API route for updating and deleting specific subscriptions
  - `lib/mongodb.ts` - MongoDB connection utility
  - `lib/models/Subscription.ts` - Mongoose subscription model
  - `.env.local` - Add `MONGODB_URI` environment variable
  - `.env.example` - Document MongoDB URI requirement
  - `package.json` - Add mongoose dependency
- **User experience**: Users can now fully manage their subscriptions with persistent storage
- **Database**: Requires MongoDB Atlas cluster and connection configuration
