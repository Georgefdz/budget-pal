import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const width = chart.width,
      height = chart.height,
      ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 250).toFixed(2);
    ctx.font = "bold " + fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    const total = chart.config.data.datasets[0].total;
    const label = "Total:",
      valueText = `$${total}`,
      labelX = Math.round((width - ctx.measureText(label).width) / 2),
      valueX = Math.round((width - ctx.measureText(valueText).width) / 2),
      labelY = height / 2 - fontSize * 10,
      valueY = height / 2 + fontSize * 10;

    ctx.fillText(label, labelX, labelY);
    ctx.fillText(valueText, valueX, valueY);
    ctx.save();
  },
};

ChartJS.register(centerTextPlugin);

function Graphs({ expenses, categoriesWithColors }) {
  const categories = expenses.reduce((acc, expense) => {
    const color = categoriesWithColors[expense.category]?.color || "#000000";
    if (!acc[expense.category]) {
      acc[expense.category] = { total: 0, color };
    }
    acc[expense.category].total += parseFloat(expense.amount);
    // console.log(`Category: ${expense.category}, Color: ${color}`);
    return acc;
  }, {});

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category $",
        data: Object.values(categories).map((cat) => cat.total),
        backgroundColor: Object.values(categories).map((cat) => cat.color),
        // hoverBackgroundColor: Object.values(categories).map((cat) => cat.color),
        total: expenses
          .reduce((total, expense) => total + expense.amount, 0)
          .toFixed(2),
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex] || "";
            const value =
              data.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.dataIndex
              ];
            const percentage = ((value / totalAmount) * 100).toFixed(2) + "%";
            return `${label}: $${value.toFixed(2)} (${percentage})`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 16,
            weight: "bold",
          },
          boxWidth: 40,
          boxHeight: 40,
          padding: 25,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div className="graphs-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Graphs;
