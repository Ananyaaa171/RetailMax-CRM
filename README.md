# RetailMax CRM

A full-stack CRM for retail businesses. RetailMax keeps customers, leads, deals, tasks, marketing campaigns and notifications in one workspace, with a dashboard that summarises the sales pipeline.

The frontend is a React + TypeScript single-page app. The backend is a Spring Boot REST API backed by PostgreSQL.

![RetailMax dashboard](docs/screenshots/dashboard-light.png)

## Features

| Module | What you can do |
|---|---|
| **Authentication** | Register and log in. Passwords are hashed with BCrypt. |
| **Dashboard** | See customer, lead and deal totals, pipeline value, and deals grouped by stage with win probability. |
| **Customers** | Add, edit, search and delete customer records (name, company, email, phone). |
| **Leads** | Manage leads by source and status. Calculate a lead score and convert a lead into a customer. |
| **Deals** | Track deal name, customer, amount, stage, probability and expected close date. |
| **Tasks** | Create calls, emails and meetings with due date, priority and status. Mark tasks complete. |
| **Campaigns** | Manage campaigns with type, audience, budget, leads and revenue. Activate or pause them. |
| **Notifications** | Create alerts with type and priority, and mark them read or unread. |
| **Users & Settings** | Manage user accounts, roles and status. View workspace details. |
| **Interface** | Light and dark modes (remembered in the browser) and an optional emerald cursor trail. |

### Lead scoring

`POST /api/leads/{id}/calculate-score` scores a lead out of a maximum of 80 points:

- Email present: 20
- Phone present: 20
- Source: Referral 30, LinkedIn 25, Website 20, Social Media 15, any other 10
- First and last name present: 10

The status is then set from the score: **70+ VERY_HOT**, **55+ HOT**, **30+ QUALIFIED**, otherwise **NEW**. Converting a lead creates a customer from its details and sets the lead to `CONVERTED`.

## Screenshots

| Dark mode dashboard | Customers |
|---|---|
| ![Dark dashboard](docs/screenshots/dashboard-dark.png) | ![Customers](docs/screenshots/customers.png) |

| Leads | Deals |
|---|---|
| ![Leads](docs/screenshots/leads.png) | ![Deals](docs/screenshots/deals.png) |

| Tasks | Campaigns |
|---|---|
| ![Tasks](docs/screenshots/tasks.png) | ![Campaigns](docs/screenshots/campaigns.png) |

| Notifications | Users |
|---|---|
| ![Notifications](docs/screenshots/notifications.png) | ![Users](docs/screenshots/users.png) |

| Workspace settings | Support request |
|---|---|
| ![Workspace settings](docs/screenshots/workspace-settings.png) | ![Support request](docs/screenshots/support-request.png) |

## Tech stack

**Frontend**
- React 19 and TypeScript
- Vite
- Oxlint

**Backend**
- Java 21
- Spring Boot 4.1 (Spring Web MVC, Spring Data JPA, Bean Validation)
- Spring Security Crypto (BCrypt password hashing)
- PostgreSQL
- Lombok
- Maven (wrapper included)

## Project structure

```
retailmax-crm/
├── backend/
│   └── retailmax-backend/
│       ├── pom.xml
│       └── src/main/
│           ├── java/retailmax_backend/
│           │   ├── controller/    # REST endpoints
│           │   ├── service/       # Business logic (lead scoring, dashboard, ...)
│           │   ├── repository/    # Spring Data JPA repositories
│           │   └── entity/        # JPA entities
│           └── resources/application.properties
└── frontend/
    ├── package.json
    └── src/
        ├── App.tsx                # Dashboard and all CRM modules
        ├── App.css
        └── components/AuthPage.tsx  # Login and register
```

## Getting started

### Prerequisites

- Java 21
- Node.js 20 or newer, with npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/Ananyaaa171/RetailMax-CRM.git
cd RetailMax-CRM
```

### 2. Create the database

```sql
CREATE DATABASE retailmax;
```

Tables are created automatically on first start (`spring.jpa.hibernate.ddl-auto=update`).

### 3. Configure the backend

Open `backend/retailmax-backend/src/main/resources/application.properties` and set your own PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/retailmax
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
server.port=8081
```

Spring Boot also reads these from environment variables, so you can avoid committing credentials:

```bash
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=<your-password>
```

### 4. Run the backend

```bash
cd backend/retailmax-backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

The API starts on **http://localhost:8081**.

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**, register an account and log in.

> The frontend calls the API at `http://localhost:8081` (set in `src/App.tsx` and `src/components/AuthPage.tsx`). The backend allows CORS from `http://localhost:5173` and `http://localhost:3000`. Change both if you deploy elsewhere.

### Other frontend scripts

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build
npm run lint      # run Oxlint
```

## API overview

All endpoints are prefixed with `/api`.

| Resource | Endpoints |
|---|---|
| **Auth** `/auth` | `POST /register`, `POST /login` |
| **Dashboard** `/dashboard` | `GET /summary`, `GET /sales`, `GET /leads` |
| **Customers** `/customers` | `GET /`, `GET /{id}`, `POST /`, `PUT /{id}`, `DELETE /{id}` |
| **Leads** `/leads` | CRUD, plus `POST /{id}/calculate-score` and `POST /{id}/convert` |
| **Deals** `/deals` | CRUD |
| **Tasks** `/tasks` | CRUD, `PUT /{id}/complete`, filters by `customer/{id}`, `deal/{id}`, `status/{s}`, `priority/{p}` |
| **Campaigns** `/campaigns` | CRUD, `PUT /{id}/status`, `PUT /{id}/performance`, `GET /{id}/performance`, filters by `status`, `type`, `audience` |
| **Notifications** `/notifications` | `GET /`, `GET /unread`, `POST /`, `PUT /{id}/read`, `PUT /{id}/unread`, `DELETE /{id}`, filters by `type`, `priority` |
| **Users** `/users` | CRUD, `PUT /{id}/status`, filters by `role/{role}` and `status/{status}` |

## Known limitations

- The API does not yet enforce role-based permissions or issue tokens. Roles are stored on user accounts, but endpoints are not protected.
- The API URL is hardcoded for local development.
- Test coverage is limited to the default Spring Boot context test.

## Author

Ananya Sharma, ABES. Project guide: Mr. Avinay