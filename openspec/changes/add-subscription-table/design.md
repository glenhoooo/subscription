# Design: Subscription Management Table

## Context

The dashboard needs full subscription management capabilities with MongoDB Atlas as the data store. Users should be able to view all their subscriptions in a table format and perform CRUD operations (Create, Read, Update, Delete) on subscription entries.

## Goals / Non-Goals

**Goals:**
- Persistent storage of subscription data in MongoDB Atlas
- Full CRUD operations on subscriptions
- Display subscription details: icon, name, renewal cycle, price, remaining time
- Search/filter functionality to find specific subscriptions
- Responsive table design for all devices
- Icon selection from lucide-react predefined set
- Automatic calculation of remaining time until renewal

**Non-Goals:**
- Payment integration or actual billing
- Email notifications for renewals (can be added later)
- Multi-currency conversion (store as-is, display raw values)
- Subscription history or audit logs
- Bulk operations (import/export)
- User account management (single authenticated user for now)

## Decisions

### Database Architecture

**MongoDB Atlas Setup:**
- Use Mongoose ODM for schema validation and queries
- Connection string stored in `MONGODB_URI` environment variable
- Single collection: `subscriptions`

**Subscription Schema:**
```typescript
{
  icon: String,              // lucide-react icon name (e.g., "Netflix", "Music", "Video")
  name: String,              // Subscription name (e.g., "Netflix Premium")
  renewalCycle: String,      // "yearly" | "quarterly" | "monthly"
  price: Number,             // Price in base currency units
  currency: String,          // Currency code (e.g., "USD", "CNY", "EUR")
  nextRenewalDate: Date,     // Next billing/renewal date
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

### API Design

**REST Endpoints:**
- `GET /api/subscriptions` - List all subscriptions
- `POST /api/subscriptions` - Create new subscription
- `PUT /api/subscriptions/[id]` - Update subscription
- `DELETE /api/subscriptions/[id]` - Delete subscription

**Response Format:**
```json
{
  "success": true,
  "data": [...],
  "error": null
}
```

### Frontend Architecture

**Component Structure:**
```
Dashboard Page
├── Subscription Table
│   ├── Search/Filter Bar
│   ├── Add Button
│   └── Table Rows
│       ├── Icon Cell
│       ├── Name Cell
│       ├── Renewal Cycle Cell
│       ├── Price Cell
│       ├── Remaining Time Cell
│       └── Actions Cell (Edit/Delete)
└── Add/Edit Modal
    └── Form with icon picker, inputs
```

**State Management:**
- React useState for local form state
- Client-side fetch for API calls
- Optimistic updates for better UX (update UI before server confirms)

**Icon Selection:**
- Predefined list of common lucide-react icons
- Dropdown/select component for icon picker
- Preview icon in real-time during selection

**Remaining Time Calculation:**
- Calculate client-side from `nextRenewalDate`
- Display format: "X days", "X months", "Expired"
- Color coding: green (>30 days), yellow (7-30 days), red (<7 days or expired)

### Search/Filter Implementation

- Client-side filtering for simplicity (database has few records)
- Search across: name, renewal cycle
- Case-insensitive matching
- Real-time filtering as user types

## Risks / Trade-offs

### Risk: MongoDB Atlas Connection Failures
- **Mitigation**: Display user-friendly error messages, implement retry logic
- **Alternative considered**: Local MongoDB or serverless DB
  - **Rationale**: Atlas provides free tier, automatic backups, and scalability

### Risk: Icon Selection UX Complexity
- **Mitigation**: Limit to ~20 commonly used icons for subscriptions
- **Alternative considered**: Icon URL field for custom icons
  - **Rationale**: Predefined set ensures consistent quality and faster selection

### Trade-off: Client-Side vs Server-Side Filtering
- **Decision**: Client-side filtering
- **Rationale**: Small dataset (<100 subscriptions), simpler implementation, faster perceived performance
- **Future upgrade path**: Move to server-side if dataset grows large

### Risk: Date/Time Zone Handling
- **Mitigation**: Store dates in UTC, display in user's local timezone
- **Implementation**: Use Date objects, let browser handle timezone conversion

## Migration Plan

N/A - This is a new feature with no existing data.

### Rollout Steps
1. Install mongoose dependency
2. Set up MongoDB Atlas cluster and obtain connection string
3. Configure environment variable with connection string
4. Deploy database connection utility and model
5. Deploy API routes
6. Deploy updated dashboard with table
7. Test full CRUD workflow

### Data Seeding (Optional)
- Can add sample subscriptions for demo/testing purposes
- Seed script can be created separately if needed

## Open Questions

None - design is comprehensive and well-defined.
