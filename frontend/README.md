# RetailMax CRM

A full-stack CRM for retail teams: customers, leads, deals, tasks, campaigns and notifications in one workspace, with a sales pipeline dashboard.

**Stack:** React 19 + TypeScript (Vite) · Spring Boot 4.1 (Java 21) · PostgreSQL

## Architecture

```mermaid
flowchart LR
    U([User]) --> FE["React + Vite<br/>localhost:5173"]
    FE -- "REST / JSON" --> API["Spring Boot API<br/>localhost:8081"]
    subgraph Backend
        API --> C[Controllers]
        C --> S[Services]
        S --> R[Repositories<br/>Spring Data JPA]
    end
    R --> DB[("PostgreSQL<br/>retailmax")]
```

## Modules

```mermaid
flowchart TD
    A[Login / Register] --> D[Dashboard]
    D --> CU[Customers]
    D --> L[Leads]
    D --> DE[Deals]
    D --> T[Tasks]
    D --> CA[Campaigns]
    D --> N[Notifications]
    D --> US[Users & Settings]
```

## Workflows

### Sign in

```mermaid
sequenceDiagram
    actor U as User
    participant FE as Frontend
    participant API as /api/auth
    participant DB as PostgreSQL
    U->>FE: Enter credentials
    FE->>API: POST /login
    API->>DB: Find user by username
    DB-->>API: User + BCrypt hash
    API-->>FE: Success or error
    FE-->>U: Open dashboard
```

### Lead to customer

```mermaid
flowchart LR
    A([New lead]) --> B[Calculate score]
    B --> C{Score}
    C -- "70+" --> VH[VERY_HOT]
    C -- "55-69" --> H[HOT]
    C -- "30-54" --> Q[QUALIFIED]
    C -- "below 30" --> NEW[NEW]
    VH & H & Q --> CV[Convert]
    CV --> CUS([Customer created])
    CV --> ST[Lead = CONVERTED]
```

Score (max 80): email 20 · phone 20 · name 10 · source up to 30 (Referral 30, LinkedIn 25, Website 20, Social 15, other 10).

### Sales pipeline

```mermaid
flowchart LR
    N[New] --> Q[Qualified] --> P[Proposal] --> NG[Negotiation] --> W([Won])
```

### Campaign status

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> ACTIVE: Activate
    ACTIVE --> PAUSED: Pause
    PAUSED --> ACTIVE: Activate
    ACTIVE --> COMPLETED
    COMPLETED --> [*]
```

## Data model

Records are linked by ID columns (no database foreign keys).

```mermaid
erDiagram
    CUSTOMER ||--o{ DEAL : has
    CUSTOMER ||--o{ TASK : has
    DEAL ||--o{ TASK : has
    LEAD |o--o| CUSTOMER : "converts to"
    CUSTOMER |o--o{ NOTIFICATION : about
    DEAL |o--o{ NOTIFICATION : about
    TASK |o--o{ NOTIFICATION : about

    CUSTOMER { long id string firstName string lastName string email string phone string company }
    LEAD { long id string source string status int score }
    DEAL { long id string dealName double amount string stage string probability }
    TASK { long id string title string taskType string priority string status }
    CAMPAIGN { long id string campaignName string status double budget double revenueGenerated }
    NOTIFICATION { long id string type string priority boolean isRead }
    USERS { long id string username string role string status }
```

## Getting started

**Prerequisites:** Java 21, Node.js 20+, PostgreSQL

```bash
git clone https://github.com/Ananyaaa171/RetailMax-CRM.git
cd RetailMax-CRM
```

**1. Database**

```sql
CREATE DATABASE retailmax;
```

Tables are created automatically on first run.

**2. Backend** (runs on `http://localhost:8081`)

Set your credentials in `backend/retailmax-backend/src/main/resources/application.properties`, or use environment variables:

```bash
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=<your-password>

cd backend/retailmax-backend
./mvnw spring-boot:run
```

**3. Frontend** (runs on `http://localhost:5173`)

```bash
cd frontend
npm install
npm run dev
```

Register an account, then log in.

## API

Base path `/api`

| Resource | Endpoints |
|---|---|
| `/auth` | `POST /register` `POST /login` |
| `/dashboard` | `GET /summary` `/sales` `/leads` |
| `/customers` `/deals` | CRUD |
| `/leads` | CRUD, `POST /{id}/calculate-score`, `POST /{id}/convert` |
| `/tasks` | CRUD, `PUT /{id}/complete` |
| `/campaigns` | CRUD, `PUT /{id}/status`, `/{id}/performance` |
| `/notifications` | `GET`, `POST`, `PUT /{id}/read`, `/{id}/unread`, `DELETE` |
| `/users` | CRUD, `PUT /{id}/status` |

## Project structure

```
backend/retailmax-backend/src/main/java/retailmax_backend/
├── controller/   entity/   repository/   service/
frontend/src/
├── App.tsx   App.css   components/AuthPage.tsx
```

## Known limitations

- Roles are stored but not enforced; endpoints are not token-protected.
- API URL is hardcoded to `localhost:8081` in the frontend.

## Author

Ananya Sharma, ABES · Guide: Mr. Avinay