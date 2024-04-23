import { useState } from "react";

function AddExpense({ isOpen, onClose, onAddExpense, categoriesWithColors }) {
  console.log("🚀 ~ AddExpense ~ categoriesWithColors:", categoriesWithColors);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("");
  const [date, setDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [concept, setConcept] = useState("");
  const categories = Object.keys(categoriesWithColors || {});
  console.log("🚀 ~ AddExpense ~ categories:", categories);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let finalCategory = category === "new" ? newCategory : category;
    console.log("🚀 ~ handleSubmit ~ finalCategory:", finalCategory);
    console.log("🚀 ~ handleSubmit ~ newCategory:", newCategory);
    console.log("🚀 ~ handleSubmit ~ category:", category);
    let finalColor =
      category === "new"
        ? newCategoryColor
        : categoriesWithColors[category].color;
    console.log("🚀 ~ handleSubmit ~ finalColor:", finalColor);
    console.log("🚀 ~ handleSubmit ~ newCategoryColor:", newCategoryColor);

    const expense = {
      concept,
      amount,
      category: finalCategory,
      color: finalColor,
      date,
      isRecurring,
    };

    console.log("Here is the color", expense.color);
    onAddExpense(expense);
    onClose();
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
            id="amount"
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
            {categories.map((cat) => {
              console.log("🚀 ~ {categories.map ~ cat:", cat);
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
            <option value="new">Create new category...</option>
          </select>
          {category === "new" && (
            <>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category Name"
                required
              />
              <input
                id="color"
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                placeholder="Category Color"
                required
              />
            </>
          )}
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
