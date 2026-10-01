<h1 align="center">🛍️ RetailMax CRM</h1>

<p align="center">
  A full-stack CRM for retail teams to manage customers, leads, deals, tasks and campaigns in one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white" alt="Java 21">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white" alt="Maven">
</p>

---

## 📌 Overview

RetailMax CRM keeps a retail sales team's daily work together: who the customers are, which leads are promising, which deals are in progress, and what needs follow-up. A React interface talks to a Spring Boot REST API, which stores everything in PostgreSQL.

## ✨ Features

- 🔐 **Authentication:** register and log in
- 👥 **Customers:** add, edit, search and delete
- 🎯 **Leads:** track by source and status, score them, and convert them into customers
- 💼 **Deals:** track amount and stage, with probability set from the stage
- ✅ **Tasks:** calls, emails and meetings with priority, due date and completion
- 📣 **Campaigns:** budget, lead targets and revenue, with activate and pause
- 🔔 **Notifications:** type, priority and read or unread state
- 🧑‍💼 **Users & Settings:** manage accounts, roles and status
- 🎨 **Interface:** light and dark mode, plus an optional cursor trail

## 🏗️ How it works

```mermaid
flowchart LR
    A["⚛️ React + TypeScript<br/>:5173"] -- "REST / JSON" --> B["🍃 Spring Boot API<br/>:8081"]
    B --> C["Controllers"] --> D["Services"] --> E["JPA Repositories"]
    E --> F[("🐘 PostgreSQL")]

    classDef fe fill:#61DAFB,stroke:#0b7285,color:#000
    classDef be fill:#6DB33F,stroke:#2b8a3e,color:#000
    classDef db fill:#4169E1,stroke:#1e3a8a,color:#fff
    class A fe
    class B,C,D,E be
    class F db
```

## 🎯 Lead scoring

A lead earns points for contact details and source, up to a maximum of **80**:

- Email **+20**, phone **+20**, first and last name **+10**
- Source: Referral **+30**, LinkedIn **+25**, Website **+20**, Social Media **+15**, other **+10**

```mermaid
flowchart LR
    S(["Score"]) --> A["70+<br/>VERY_HOT"]
    S --> B["55–69<br/>HOT"]
    S --> C["30–54<br/>QUALIFIED"]
    S --> D["below 30<br/>NEW"]

    classDef vh fill:#ff6b6b,stroke:#c92a2a,color:#000
    classDef h fill:#ffa94d,stroke:#d9480f,color:#000
    classDef q fill:#ffe066,stroke:#e67700,color:#000
    classDef n fill:#a5d8ff,stroke:#1971c2,color:#000
    class A vh
    class B h
    class C q
    class D n
```

Converting a lead creates a customer from its name, email and phone, and marks the lead `CONVERTED`.

## 🚀 Getting started

**You need:** Java 21, Node.js and npm, and PostgreSQL.

```bash
git clone https://github.com/Ananyaaa171/RetailMax-CRM.git
cd RetailMax-CRM
```

**1. Create the database**

```sql
CREATE DATABASE retailmax;
```

Tables are created automatically on first run.

**2. Run the backend** (http://localhost:8081)

Set your own PostgreSQL credentials in `backend/retailmax-backend/src/main/resources/application.properties`, or use environment variables:

```env
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```

```bash
cd backend/retailmax-backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

**3. Run the frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

Register an account on the login screen, then sign in.

## 🔌 API

All endpoints start with `/api`: `auth`, `dashboard`, `customers`, `leads`, `deals`, `tasks`, `campaigns`, `notifications` and `users`. Most support the usual create, read, update and delete calls. Leads also have `POST /api/leads/{id}/calculate-score` and `POST /api/leads/{id}/convert`.

## ⚠️ Current limitations

- Endpoints are not protected, and roles are stored but not enforced.
- The dashboard shows sample figures rather than live data.
- The support form only shows an on-screen confirmation and does not send anything.
- The login screen and the Users page use separate user tables.
- The Deal form offers some stages the backend rejects (`QUALIFIED`, `WON`, `LOST`).
- The API URL is hardcoded to `localhost:8081`.
- Testing is limited to one context-load test, and there is no deployment setup.

## 🔭 Future scope

Token-based authentication, role-based access control, a live dashboard, aligned deal stages, input validation, more automated tests, and cloud deployment.

## 👩‍💻 Author

**Ananya Sharma**

## 📄 License

No license has been specified yet.
