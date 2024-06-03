import removeIcon from "./assets/remove.png";
import recurringIcon from "./assets/recurring.png";
import { useEffect, useState } from "react";

function Expenses({ expenses, categoriesWithColors, onDeleteExpense }) {
  useEffect(() => {
    console.log("Expenses updated:", expenses);
  }, [expenses]);

  const getCategoryColor = (category) => {
    return categoriesWithColors[category]?.color || "#000000";
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(
          `https://localhost:3010/expenses/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          onDeleteExpense(id);
        } else {
          alert("Failed to delete expense.");
        }
      } catch (error) {
        console.error("Error deleting expense: ", error);
      }
    }
  };

  return (
    <>
      {expenses.length === 0 ? (
        <div className="expenses-container">
          <h1 id="no-expenses">Please add expenses.</h1>
        </div>
      ) : (
        <div className="expenses-container">
          {expenses.map((expense, index) => (
            <div key={index} className="expense-items">
              {expense.isRecurring && (
                <img
                  src={recurringIcon}
                  alt="Recurring"
                  style={{ marginRight: "90px", cursor: "pointer" }}
                  className="recurringIcon"
                />
              )}
              <p id="amount">${expense.amount}</p>
              <p id="category">
                <span
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: getCategoryColor(expense.category),
                    display: "inline-block",
                    borderRadius: "50%",
                    marginRight: "5px",
                  }}
                ></span>
                {/* {expense.category} */}
                {expense.concept}
              </p>
              <p id="date">
                {expense.date}{" "}
                <img
                  src={removeIcon}
                  alt="Remove"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => handleDelete(expense.id)}
                  className="removeIcon"
                />{" "}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Expenses;
