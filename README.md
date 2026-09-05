# ShopFloor

A full-stack retail store management application built with React, TypeScript, Node.js, Express and PostgreSQL.

ShopFloor brings store performance, sales targets, operational tasks, team scheduling, employee availability and shift handovers into a single role-aware application.

## Live Demo

https://shopfloor-ten.vercel.app/

> **Note:** ShopFloor is actively being developed. The core dashboard, authentication system, team management features and full-stack architecture are functional and deployed, with additional store-management pages and workflows still being built.

> The backend is hosted on Render's free tier and may take up to 50 seconds to respond after a period of inactivity.

The application includes an **Explore Demo** option for accessing the deployed demo without creating an account.

## Demo Period

ShopFloor currently uses simulated retail data for **1 August 2026 to 31 August 2026**.

The date selector can be used to move through the trading month and see how store performance, sales targets, tasks, team shifts and handover information change by date.

Supporting historical data is included where required for previous-day and previous-week comparisons.

Using a fixed simulated period keeps the demo predictable while still demonstrating realistic date-driven behaviour across a complete retail trading month.

## Overview

Retail store teams need to manage several areas of the business throughout the day, including sales performance, KPIs, operational tasks, team coverage, employee availability and information passed between shifts.

ShopFloor brings these workflows together in a full-stack application backed by persistent PostgreSQL data.

Rather than using hardcoded dashboard values, the React frontend communicates with a custom Express REST API which retrieves and updates operational data in PostgreSQL based on the selected trading date and authenticated user.

Authentication is handled through Clerk, while application users are mapped to PostgreSQL user and employee records. Role-based permissions control appropriate frontend functionality, while sensitive data such as employee availability is scoped by the backend rather than relying on frontend visibility alone.

## Features

- Clerk authentication and authenticated demo access
- Role-based application permissions
- Daily sales performance against store targets
- APC, IPC and conversion KPI tracking
- Previous-day performance compared with the previous week
- Weekly sales and target visualisation
- Date-driven dashboard data
- Daily operational task tracking
- Previous-day handover follow-ups and acknowledgement
- Daily and weekly employee shift views
- Employee availability
- Role-scoped availability access
- Demo user switching
- Actionable operational notifications
- PostgreSQL-backed persistent data
- REST API integration between frontend and backend
- Responsive dashboard and team layouts

## Role-Based Access

ShopFloor supports different application roles with different levels of access.

Current roles include:

- Store Manager
- Assistant Store Manager
- Supervisor
- Sales Assistant

Frontend permissions control which operational features are presented to each role.

Sensitive data access is also enforced by the backend. For example, Store Managers and Assistant Store Managers can retrieve team-wide employee availability, while Supervisors with linked employee profiles receive only their own availability data.

Authenticated Clerk identities are mapped to application users in PostgreSQL, which can in turn be linked to employee records through a foreign-key relationship.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS Modules
- Recharts
- Font Awesome
- Clerk

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- Clerk authentication middleware
- REST APIs
- ES Modules
- dotenv
- CORS

### Deployment

- Vercel — frontend
- Render — backend API
- Neon — PostgreSQL database
- Clerk — authentication
- Git / GitHub

## What I Worked On

- Designed a relational PostgreSQL data model for users, employees, store performance, shifts, availability, tasks, targets and handovers
- Built REST API endpoints using Node.js and Express
- Structured the backend using a **route → controller → service → PostgreSQL** architecture
- Wrote parameterised SQL queries for retrieving and updating application data
- Modelled relationships using primary keys, foreign keys and database constraints
- Integrated Clerk authentication across the React frontend and Express backend
- Mapped authenticated Clerk identities to PostgreSQL application users
- Linked application users to employee records through a PostgreSQL foreign key
- Implemented role-based frontend permissions for operational features
- Implemented backend data authorization for employee availability
- Used authenticated user roles and employee relationships to scope PostgreSQL queries
- Built date-driven queries for daily performance, previous-week comparisons and weekly sales data
- Created task scheduling based on fixed times and times relative to store opening and closing
- Built daily and weekly employee scheduling views
- Built employee availability views with role-dependent data access
- Separated frontend API communication into dedicated service modules
- Defined TypeScript types around backend API responses
- Managed dashboard and team data through custom React hooks
- Used React Context for shared application, user and permission state
- Implemented loading, empty and interactive application states
- Built an aggregated notification system from operational PostgreSQL data
- Connected the deployed Express API to a hosted PostgreSQL database using environment variables
- Deployed the frontend and backend independently and configured production API communication

## Architecture

ShopFloor uses a separated frontend, backend and database architecture:

```text
React / TypeScript
       ↓
Frontend Services
       ↓
REST API
       ↓
Express Routes
       ↓
Controllers
       ↓
Services
       ↓
PostgreSQL
```

Authentication and authorization sit across this flow:

```text
Clerk Authentication
       ↓
Authenticated User
       ↓
PostgreSQL User
       ↓
Role / Employee Relationship
       ↓
Backend Authorization
       ↓
Scoped PostgreSQL Data
```

This keeps UI rendering, API communication, HTTP handling, authorization and database logic separated while maintaining a straightforward architecture appropriate to the application.

## Data Access Example

Employee availability demonstrates the distinction between frontend permissions and backend authorization.

The authenticated Clerk identity is resolved to a PostgreSQL user containing the user's role and linked employee ID.

Managers can retrieve team-wide availability, while other linked employees are restricted to their own employee record:

```sql
WHERE ($1::boolean = TRUE OR e.id = $2)
```

The boolean parameter represents whether the authenticated role can view the full team. When false, only the employee matching the authenticated user's linked employee ID passes the filter.

This prevents sensitive data access from depending only on hidden frontend components or client-provided identity information.

## In Progress

ShopFloor is actively being developed.

Current planned work includes:

- Building the full Handover management page and workflow
- Building the full Sales performance and analytics page
- Extending role-based permissions to page navigation and actions
- Additional validation and error handling
- Automated testing and production hardening
- Further responsive refinement

## Run Locally

Clone the repository:

```bash
git clone https://github.com/Rosuelo996/shopfloor.git
cd shopfloor
```

Install and start the backend:

```bash
cd server
npm install
npm run dev
```

Install and start the frontend:

```bash
cd ../client
npm install
npm run dev
```

The application requires environment variables for services including the PostgreSQL database connection, Clerk authentication and frontend API URL.

Example frontend configuration:

```env
VITE_API_URL=http://localhost:3000
```

Database credentials, authentication keys and other secrets are stored in environment variables and are not committed to the repository.
