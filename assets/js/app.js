const STORAGE_KEYS = {
  budget: 'expenseTracker_budget',
  expenses: 'expenseTracker_expenses',
  darkMode: 'expenseTracker_darkMode'
};

export const CATEGORIES = ['food', 'transport', 'rent', 'entertainment', 'utilities', 'shopping', 'other'];

export function readBudget() {
  return Number(localStorage.getItem(STORAGE_KEYS.budget) || 0);
}

export function saveBudget(value) {
  localStorage.setItem(STORAGE_KEYS.budget, String(Number(value) || 0));
}

export function readExpenses() {
  const raw = localStorage.getItem(STORAGE_KEYS.expenses);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
}

export function addExpense(expense) {
  const expenses = readExpenses();
  expenses.push({ ...expense, id: crypto.randomUUID() });
  saveExpenses(expenses);
}

export function deleteExpenseById(id) {
  const filtered = readExpenses().filter((item) => item.id !== id);
  saveExpenses(filtered);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(Number(amount) || 0);
}

export function summarize(expenses) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  return {
    total,
    count: expenses.length,
    categoryTotals: CATEGORIES.reduce((acc, category) => {
      acc[category] = expenses
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + Number(item.amount), 0);
      return acc;
    }, {})
  };
}

export function setupThemeToggle(toggleButton) {
  const saved = localStorage.getItem(STORAGE_KEYS.darkMode);
  if (saved === 'on') {
    document.body.classList.add('dark');
  }
  toggleButton?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const on = document.body.classList.contains('dark');
    localStorage.setItem(STORAGE_KEYS.darkMode, on ? 'on' : 'off');
  });
}

export function setupCsvExport(button) {
  button?.addEventListener('click', () => {
    const expenses = readExpenses();
    const header = ['Amount', 'Category', 'Description', 'Date', 'Payment Method'];
    const rows = expenses.map((item) => [item.amount, item.category, item.description, item.date, item.paymentMethod]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

export function wireShell() {
  setupThemeToggle(document.getElementById('themeToggle'));
  setupCsvExport(document.getElementById('csvExport'));
}
