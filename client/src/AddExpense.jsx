import { useState } from "react";

function AddExpense({ isOpen, onClose, onAddExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [concept, setConcept] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submission has started");
    try {
      const expense = { concept, amount, category, date, isRecurring };
      console.log("Sending expense: ", expense);
      const response = await fetch("http://localhost:3000/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      if (response.ok) {
        const newExpense = await response.json();
        console.log("Expense was added successfully: ", newExpense);
        onClose();
      } else {
        throw new Error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Add Expense:</h2>
          <label htmlFor="concept">Concept</label>
          <input
            type="text"
            id="concept"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Add Concept..."
            required
            className="concept-input-field"
          />
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            required
            className="amount-input-field"
          />
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              - Select Category -
            </option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
          </select>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <label htmlFor="recurring">Recurring</label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          <button type="submit">Add Expense</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
