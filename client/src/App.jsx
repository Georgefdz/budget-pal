import { useState, useEffect } from "react";

import "./App.css";
import Header from "./Header";
import Expenses from "./Expenses";
import Graphs from "./Graphs";
import AddExpense from "./AddExpense";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDateOption, setSelectedDateOption] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/expenses");
        if (response.ok) {
          const fetchExpenses = await response.json();
          setExpenses(fetchExpenses);
        } else {
          throw new Error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses: ", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const addExpense = (expense) => {
  //   setExpenses([...expenses, expense]);
  //   handleModalClose();
  // };

  const addExpense = async (expense) => {
    try {
      const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      if (response.ok) {
        const newExpense = await response.json();
        setExpenses([...expenses, newExpense]);
        handleModalClose();
      } else {
        throw new Error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateFilterChange = (option) => {
    setSelectedDateOption(option);
  };

  const handleDateRangeChange = ([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  };

  const onCloseCalendar = () => {
    setSelectedDateOption("all");
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      // console.log(selectedCategory);
      // console.log(expense.category);
      const expenseDate = dayjs(expense.date);
      const now = dayjs();
      switch (selectedDateOption) {
        case "day":
          return expenseDate.isSame(now, "day");
        case "week":
          return expenseDate.isSame(now, "week");
        case "month":
          return expenseDate.isSame(now, "month");
        case "custom":
          return (
            (!startDate || expenseDate.isSameOrAfter(dayjs(startDate))) &&
            (!endDate || expenseDate.isSameOrBefore(dayjs(endDate)))
          );
        default:
          return true;
      }
    })
    .filter((expense) => {
      return (
        selectedCategory === "all" || expense.category === selectedCategory
      );
    });

  return (
    <>
      <div className="main-container">
        <Header
          onAddExpense={handleModalOpen}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          onDateFilterChange={handleDateFilterChange}
          selectedDateOption={selectedDateOption}
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={handleDateRangeChange}
          onCloseCalendar={onCloseCalendar}
        />
        <Expenses
          expenses={filteredExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
        <Graphs expenses={filteredExpenses} />
        <AddExpense
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAddExpense={addExpense}
        />
      </div>
    </>
  );
}

export default App;
