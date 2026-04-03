# Finance Dashboard UI

## Overview

This project is a simple finance dashboard built to help users track and understand their financial activity. It provides a clear overview of income, expenses, and balance along with transaction-level details.

The goal of this project was to design a clean and intuitive user interface while handling frontend state effectively without relying on a backend.

---

## Features

### 1. Dashboard Overview

* Displays Total Balance, Income, and Expenses
* Uses color coding for quick understanding:

  * Green for income
  * Red for expenses
* Includes a pie chart to visualize spending vs income

---

### 2. Transactions Section

* Shows transaction details including:

  * Date
  * Category
  * Amount
  * Type (income/expense)
* Supports:

  * Search by category
  * Filter by type (income/expense)

---

### 3. Role-Based UI

* Viewer:

  * Can only view data
* Admin:

  * Can add new transactions
* Role switching implemented using a dropdown (frontend simulation)

---

### 4. Insights Section

* Displays a summary of income vs expenses
* Provides a basic recommendation to improve savings

---

### 5. State Management

* Managed using React state (`useState`, `useEffect`)
* Handles:

  * Transactions data
  * Filters and search
  * User role
* Data persistence implemented using localStorage

---

## Tech Stack

* React (Vite)
* Tailwind CSS
* Recharts (for visualization)
* JavaScript (ES6)

---

## Design Approach

* Focused on clean and minimal UI
* Used consistent spacing and layout
* Structured the dashboard into clear sections:

  * Overview
  * Visualization
  * Insights
  * Transactions
* Prioritized readability and usability over complex design

---

## Assumptions

* Data is static or locally stored (no backend integration)
* Role-based access is simulated on frontend
* Transactions are simplified for demonstration purposes

---

## How to Run

```bash
npm install
npm run dev
```

---

## Future Improvements

* Add edit/delete transaction functionality
* Improve insights with detailed analytics
* Add charts for time-based trends
* Backend integration with API
* Authentication system for real role management

---

## Conclusion

This project demonstrates my ability to:

* Build a structured and responsive UI
* Manage application state effectively
* Design user-friendly interfaces
* Implement basic data visualization

---
