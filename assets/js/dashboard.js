import { formatCurrency, readBudget, readExpenses, saveBudget, summarize, wireShell } from './app.js';

wireShell();

const budgetInput = document.getElementById('budgetInput');
const saveBudgetBtn = document.getElementById('saveBudgetBtn');
const totalCard = document.getElementById('totalSpending');
const budgetCard = document.getElementById('budgetValue');
const remainingCard = document.getElementById('budgetRemaining');
const countCard = document.getElementById('transactionCount');
const recentTableBody = document.getElementById('recentRows');

function render() {
  const budget = readBudget();
  const expenses = readExpenses();
  const summary = summarize(expenses);

  budgetInput.value = budget || '';
  totalCard.textContent = formatCurrency(summary.total);
  budgetCard.textContent = formatCurrency(budget);
  remainingCard.textContent = formatCurrency(budget - summary.total);
  remainingCard.style.color = budget - summary.total < 0 ? 'var(--danger)' : 'var(--success)';
  countCard.textContent = String(summary.count);

  recentTableBody.innerHTML = '';
  const recent = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (!recent.length) {
    recentTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">No expenses yet. Add your first transaction from Expenses page.</td></tr>';
    return;
  }

  for (const item of recent) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.date}</td>
      <td>${item.category}</td>
      <td>${item.description}</td>
      <td>${item.paymentMethod}</td>
      <td class="amount-cell">${formatCurrency(item.amount)}</td>
    `;
    recentTableBody.appendChild(row);
  }
}

saveBudgetBtn.addEventListener('click', () => {
  saveBudget(Number(budgetInput.value));
  render();
});

window.addEventListener('storage', render);
render();
