import removeIcon from "./assets/remove.png";

function Expenses({ expenses }) {
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
                style={{ marginLeft: "10px" }}
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
