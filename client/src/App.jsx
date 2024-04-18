import { useState } from "react";

import "./App.css";
import Header from "./Header";
import Expenses from "./Expenses";
import Graphs from "./Graphs";
import AddExpense from "./AddExpense";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    handleModalClose();
  };

  return (
    <>
      <div className="main-container">
        <Header onAddExpense={handleModalOpen} />
        <Expenses expenses={expenses} />
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
