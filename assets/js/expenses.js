import {
  addExpense,
  deleteExpenseById,
  formatCurrency,
  readExpenses,
  saveExpenses,
  wireShell
} from './app.js';

wireShell();

const modal = document.getElementById('expenseModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const expenseForm = document.getElementById('expenseForm');
const tableBody = document.getElementById('expenseRows');
const totalPill = document.getElementById('expenseTotalPill');

let sortBy = 'date';
let sortDir = 'desc';

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('amount').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  expenseForm.reset();
}

function toggleSort(column) {
  if (sortBy === column) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy = column;
    sortDir = 'asc';
  }
  render();
}

function render() {
  const expenses = readExpenses();
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  totalPill.textContent = `Total: ${formatCurrency(total)}`;

  const sorted = [...expenses].sort((a, b) => {
    const left = sortBy === 'amount' ? Number(a[sortBy]) : a[sortBy];
    const right = sortBy === 'amount' ? Number(b[sortBy]) : b[sortBy];
    if (left < right) return sortDir === 'asc' ? -1 : 1;
    if (left > right) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  tableBody.innerHTML = '';
  if (!sorted.length) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty-state">No transactions yet.</td></tr>';
    return;
  }

  for (const item of sorted) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.date}</td>
      <td class="amount-cell">${formatCurrency(item.amount)}</td>
      <td>${item.category}</td>
      <td>${item.description}</td>
      <td>${item.paymentMethod}</td>
      <td><button class="delete-btn" data-id="${item.id}" aria-label="Delete expense ${item.description}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  }
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(expenseForm);
  addExpense({
    amount: Number(formData.get('amount')),
    category: String(formData.get('category')),
    description: String(formData.get('description')),
    date: String(formData.get('date')),
    paymentMethod: String(formData.get('paymentMethod'))
  });

  closeModal();
  render();
});

tableBody.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.matches('.delete-btn')) {
    deleteExpenseById(target.dataset.id);
    render();
  }
});

for (const thButton of document.querySelectorAll('th button[data-sort]')) {
  thButton.addEventListener('click', () => {
    toggleSort(thButton.dataset.sort);
  });
}

window.addEventListener('storage', () => {
  saveExpenses(readExpenses());
  render();
});

render();
