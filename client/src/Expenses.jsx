import removeIcon from "./assets/remove.png";

function Expenses({ expenses, onDeleteExpense }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(`http://localhost:3000/expenses/${id}`, {
          method: "DELETE",
        });
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
      <div className="expenses-container">
        {expenses.map((expense, index) => (
          <div key={index} className="expense-items">
            <p id="amount">${expense.amount}</p>
            <p id="category">{expense.category}</p>
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
    </>
  );
}

export default Expenses;
