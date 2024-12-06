/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const AnalyticsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions"));

    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  const processData = (data) => {
    const months = Array(12)
      .fill(0)
      .map(() => ({ income: 0, expense: 0 }));

    data.forEach((item) => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth(); // Get month (0 = January, 11 = December)
      const amount = parseInt(item.amount, 10); // Convert amount to number

      if (item.type === "income") {
        months[monthIndex].income += amount;
      } else if (item.type === "expense") {
        months[monthIndex].expense += amount;
      }
    });

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Income",
          data: months.map((month) => month.income),
          backgroundColor: "#75d05e", // Green color for income
        },
        {
          label: "Expense",
          data: months.map((month) => month.expense),
          backgroundColor: "#f24e1e", // Red color for expense
        },
      ],
    };
  };

  const chartData = processData(transactions);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "100px",
          marginBottom: "100px",
        }}
      >
        <div style={{ width: "800px", height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Monthly Income and Expense",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Months",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Amount",
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
