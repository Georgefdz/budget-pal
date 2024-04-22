import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Header({
  onAddExpense,
  onCategoryChange,
  selectedCategory,
  onDateFilterChange,
  selectedDateOption,
  startDate,
  endDate,
  onDateRangeChange,
  onToggleRecurring,
  onToggleGeneral,
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  return (
    <>
      <div className="header-container">
        <h1 className="main-title">Expenses</h1>
        <div className="form-container">
          <form action="" className="date-form">
            <label htmlFor="date">Date</label>
            <select
              name="date"
              id="date"
              value={selectedDateOption}
              onChange={(e) => {
                onDateFilterChange(e.target.value);
                if (e.target.value === "custom") {
                  toggleCalendar();
                } else {
                  handleCloseCalendar();
                }
              }}
            >
              <option value="all">All Time</option>
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Choose a Date</option>
            </select>
            <div
              className={`calendar-modal ${!calendarVisible ? "hidden" : ""}`}
            >
              <div id="close-calendar" onClick={handleCloseCalendar}>
                x
              </div>
              {calendarVisible && (
                <DatePicker
                  selected={startDate}
                  onChange={(update) => onDateRangeChange(update)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              )}
            </div>

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
        <div className="bottom-nav-container">
          <div className="bottom-nav" onClick={onToggleGeneral}>
            <p>General</p>
          </div>
          <div className="bottom-nav" onClick={onToggleRecurring}>
            <p>Recurring</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
