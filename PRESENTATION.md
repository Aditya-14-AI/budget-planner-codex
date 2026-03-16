# Monthly Expense Tracker Dashboard
## Meeting Presentation Document

---

## Slide 1 — Project Overview

**Project Title:** Modern Monthly Expense Tracker Dashboard  
**Prepared For:** Stakeholder Review Meeting  
**Prepared By:** Development Team  
**Technology Stack:** HTML, CSS, JavaScript, Local Storage

### Objective
To design and deliver a modern, responsive, and accessible monthly expense tracking web application with dashboard insights, expense management, analytics visualization, and local persistence.

### Scope Delivered
- Multi-page financial dashboard interface
- Expense CRUD (create/delete with sortable table)
- Budget tracking and remaining balance insights
- Category-based and time-based analytics
- Dark mode and CSV export

---

## Slide 2 — Original Prompt (Provided by Requestor)

The following prompt was used to guide development of the application:

> “Build a modern monthly expense tracker dashboard.
>
> Tech stack:
> - HTML, CSS, JavaScript
> - Local storage persistence
>
> Features:
>
> Dashboard
> - total monthly spending card
> - I should add my budget on my own
> - budget remaining card
> - number of transactions card
>
> Expense management
> - add expense modal
> - fields:
>   - amount
>   - category
>   - description
>   - date
>   - payment method
>
> Categories
> - food
> - transport
> - rent
> - entertainment
> - utilities
> - shopping
> - other
>
> Charts
> - pie chart for spending by category
> - line chart for spending over time
> - bar chart for category comparison
>
> Tables
> - transaction table
> - sorting
> - delete expense
>
> UX/UI
> - responsive design
> - modern dashboard layout
> - sidebar navigation
> - smooth animations
> - clean financial dashboard style
> - Accessibility supported
> - Add dark mode toggle bar
>
> Option to download the file at any point. Like a csv file.
>
> Pages
> - Dashboard
> - Expenses
> - Analytics
>
> Generate the full project with folder structure and all code files.”

---

## Slide 3 — Tools & Technologies Used

### Core Development Tools
- **HTML5**: Page structure for Dashboard, Expenses, and Analytics
- **CSS3**: Responsive layout, sidebar UI, visual hierarchy, animation, dark mode styling
- **Vanilla JavaScript (ES Modules)**: Data handling, UI rendering, interactions, sorting, modal controls
- **Local Storage API**: Browser-based persistence for budget, expenses, and theme mode

### Visualization & Export Tools
- **Chart.js (CDN)**: Pie, line, and bar analytics charts
- **Blob + URL APIs**: Client-side CSV file generation and download

### Validation / Execution Tools
- **Node.js (`node --check`)**: JavaScript syntax checks
- **Python HTTP Server (`python -m http.server`)**: Local static hosting for page execution

---

## Slide 4 — Website Structure and Navigation

### Application Pages
1. **Dashboard (`index.html`)**
   - Total monthly spending
   - Budget value and remaining amount
   - Number of transactions
   - Recent transactions snapshot

2. **Expenses (`expenses.html`)**
   - Add expense via modal form
   - View all records in transaction table
   - Sort by date/amount/category/description/payment
   - Delete records

3. **Analytics (`analytics.html`)**
   - Pie chart: spending by category
   - Line chart: spending over time
   - Bar chart: category comparison

### Common Sidebar Functions
- Page navigation (Dashboard, Expenses, Analytics)
- Dark mode toggle
- CSV export download

---

## Slide 5 — How to Use the Website (User Walkthrough)

### Step 1: Launch the Application
From project root:

```bash
python -m http.server 4173
```

Open browser: `http://localhost:4173`

### Step 2: Configure Monthly Budget
- Open **Dashboard**
- Enter budget amount
- Click **Save Budget**
- Observe budget remaining calculation

### Step 3: Add Expenses
- Open **Expenses** page
- Click **+ Add Expense**
- Fill fields: amount, category, description, date, payment method
- Save entry

### Step 4: Review and Manage Transactions
- Sort table by clicking column headers
- Delete incorrect/obsolete entries with **Delete**

### Step 5: Analyze Spending
- Open **Analytics** page
- Review pie, line, and bar charts for category and trend insights

### Step 6: Export Data
- Click **Download CSV** from sidebar on any page
- Save exported transaction file for reporting or audit

---

## Slide 6 — Professional Notes for Stakeholders

### Strengths
- Lightweight frontend architecture with no backend dependency
- Works offline-like using browser storage
- Clear user experience with modern and responsive UI
- Immediate value for personal monthly budget control

### Operational Considerations
- Data is stored per browser/device (not cloud-synced)
- Clearing browser storage removes persisted records
- For organizational scale, backend auth + database can be added in future roadmap

---

## Slide 7 — Suggested Next Enhancements (Optional)

- Edit transaction capability
- Recurring monthly expense templates
- Multi-currency support
- Date-range filtering and search
- Cloud sync / login-based persistence
- PDF report generation

---

## Slide 8 — Closing

This project successfully implements the requested monthly expense tracker in a professional, maintainable, and presentation-ready form using the specified technology stack.

**Thank you.**
