# ShopFloor

A full-stack retail store management dashboard built with React, TypeScript, Node.js, Express and PostgreSQL.

ShopFloor brings daily store performance, sales targets, tasks, team scheduling and shift handovers into one operational dashboard.

## Live Demo

https://shopfloor-ten.vercel.app/

> **Note:** ShopFloor is currently in development. The core dashboard and full-stack architecture are functional and deployed, with additional store-management features still being built.

> The backend is hosted on Render's free tier and may take up to 50 seconds to respond after a period of inactivity.

## Demo Period

ShopFloor currently uses simulated retail data for **1 August 2026 to 31 August 2026**.

The date selector can be used to move through the trading month and see how store performance, sales targets, tasks, team shifts and handover information change by date.

Supporting historical data is also included where required for previous-day and previous-week comparisons.

Using a fixed simulated period keeps the demo predictable while still demonstrating realistic date-driven behaviour across a complete retail trading month.

## Overview

Store managers need to keep track of several areas of the business throughout the day, including sales performance, KPIs, operational tasks, team coverage and information passed between shifts.

ShopFloor brings this information together into a single dashboard backed by persistent PostgreSQL data.

Rather than using hardcoded dashboard values, the React frontend communicates with a custom Express REST API which retrieves and updates operational data in PostgreSQL based on the selected trading date.

## Features

- Daily sales performance against store targets
- APC, IPC and conversion KPI tracking
- Previous-day performance compared with the previous week
- Weekly sales and target visualisation
- Date-driven dashboard data
- Daily operational task tracking
- Previous-day handover follow-ups
- Employee shift and team overview
- Store user switching with shared React Context
- PostgreSQL-backed persistent data
- REST API integration between frontend and backend
- Responsive dashboard layout

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

### Backend

- Node.js
- Express
- PostgreSQL
- pg
- REST APIs
- ES Modules
- dotenv
- CORS

### Deployment

- Vercel — frontend
- Render — backend API
- Neon — PostgreSQL database
- Git / GitHub

## What I Worked On

- Designed a relational PostgreSQL data model for store performance, employees, shifts, availability, tasks, targets and handovers
- Built REST API endpoints using Node.js and Express
- Structured the backend using a **route → controller → service → PostgreSQL** architecture
- Wrote parameterised SQL queries for retrieving and updating application data
- Modelled relationships using primary keys, foreign keys and database constraints
- Built date-driven queries for daily performance, previous-week comparisons and weekly sales data
- Created task scheduling based on both fixed times and times relative to store opening and closing
- Separated frontend API communication into dedicated service modules
- Defined TypeScript types around backend API responses
- Managed dashboard data and selected-date state through custom React hooks
- Used React Context for shared current-user state
- Implemented loading, empty and interactive dashboard states
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

This keeps UI rendering, API communication, HTTP handling and database logic separated while maintaining a straightforward architecture appropriate to the application.

## In Progress

ShopFloor is actively being developed.

Current and planned work includes:

- Expanding the team management and scheduling functionality
- Building a fuller employee availability view
- Completing remaining dashboard interactions
- Further responsive refinement
- Additional validation and error handling
- Testing and production hardening
- Additional store-management pages and workflows

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

The application requires environment variables for the PostgreSQL database connection and frontend API URL.

Example frontend configuration:

```env
VITE_API_URL=http://localhost:3000
```

Database credentials are kept in environment variables and are not committed to the repository.
