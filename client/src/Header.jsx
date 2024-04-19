function Header({ onAddExpense, onCategoryChange, selectedCategory }) {
  return (
    <>
      <div className="header-container">
        <h1 className="main-title">Expenses</h1>
        <div className="form-container">
          <form action="" className="date-form">
            <label htmlFor="date">Date</label>
            <select name="date" id="date">
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
            </select>
          </form>
        </div>
        <div className="add-expense-container">
          <button className="add-expense-btn" onClick={onAddExpense}>
            +
          </button>
          <h3>
            Add
            <br /> Expense
          </h3>
        </div>
      </div>
    </>
  );
}

export default Header;
