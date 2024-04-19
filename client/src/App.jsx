import { useState, useEffect } from "react";

import "./App.css";
import Header from "./Header";
import Expenses from "./Expenses";
import Graphs from "./Graphs";
import AddExpense from "./AddExpense";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredExpenses = expenses.filter((expense) => {
    // console.log(selectedCategory);
    // console.log(expense.category);
    return selectedCategory === "all" || expense.category === selectedCategory;
  });

  return (
    <>
      <div className="main-container">
        <Header
          onAddExpense={handleModalOpen}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <Expenses expenses={filteredExpenses} />
        <Graphs />
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
