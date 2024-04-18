function Header({ onAddExpense }) {
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
            <select name="category" id="category">
              <option value="all">All</option>
              <option value="entertainment">Entertainment</option>
              <option value="transport">Transport</option>
              <option value="food">Food</option>
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
