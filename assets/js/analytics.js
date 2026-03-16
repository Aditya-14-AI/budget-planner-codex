import { CATEGORIES, readExpenses, summarize, wireShell } from './app.js';

wireShell();

let pieChart;
let lineChart;
let barChart;

function byDate(expenses) {
  const map = expenses.reduce((acc, item) => {
    acc[item.date] = (acc[item.date] || 0) + Number(item.amount);
    return acc;
  }, {});
  return Object.entries(map).sort((a, b) => new Date(a[0]) - new Date(b[0]));
}

function renderCharts() {
  const expenses = readExpenses();
  const { categoryTotals } = summarize(expenses);
  const hasData = expenses.length > 0;

  const pieCtx = document.getElementById('pieChart');
  const lineCtx = document.getElementById('lineChart');
  const barCtx = document.getElementById('barChart');

  const categoryLabels = CATEGORIES;
  const categoryValues = categoryLabels.map((category) => categoryTotals[category] || 0);

  const dated = byDate(expenses);

  pieChart?.destroy();
  lineChart?.destroy();
  barChart?.destroy();

  pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: categoryValues,
        backgroundColor: ['#4f46e5', '#0ea5e9', '#ef4444', '#f59e0b', '#10b981', '#ec4899', '#64748b']
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });

  lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: dated.map(([date]) => date),
      datasets: [{
        label: 'Spending Over Time',
        data: dated.map(([, amount]) => amount),
        borderColor: '#4f46e5',
        tension: 0.35,
        fill: true,
        backgroundColor: 'rgba(79, 70, 229, 0.15)'
      }]
    },
    options: { responsive: true }
  });

  barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Category Comparison',
        data: categoryValues,
        backgroundColor: '#0ea5e9'
      }]
    },
    options: { responsive: true }
  });

  document.getElementById('analyticsEmpty').hidden = hasData;
}

window.addEventListener('storage', renderCharts);
renderCharts();
