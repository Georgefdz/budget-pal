import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Expenses from "./Expenses";
import Graphs from "./Graphs";
import AddExpense from "./AddExpense";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDateOption, setSelectedDateOption] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showRecurring, setShowRecurring] = useState(false);
  const [categoriesWithColors, setCategoriesWithColors] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3000/expenses");
        if (response.ok) {
          const fetchedExpenses = await response.json();
          console.log("Fetched Expenses:", fetchedExpenses);
          setExpenses(fetchedExpenses);
          updateCategoriesWithColors(fetchedExpenses, {});
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

  const handleToggleGeneral = () => {
    setShowRecurring(false);
  };

  const handleToggleRecurring = () => {
    setShowRecurring(true);
  };

  const addExpense = async (expense) => {
    try {
      console.log("expenseeee: ", expense);
      const response = await fetch(`https://budget-pal.fly.dev/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
      console.log("🚀 ~ addExpense ~ response:", response);
      if (response.ok) {
        console.log("response OK");
        const newExpense = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        updateCategoriesWithColors(
          [...expenses, newExpense],
          categoriesWithColors
        );
        if (newCategory) {
          console.log("🚀 ~ addExpense ~ newCategory:", newCategory);
          setCategoriesWithColors({
            ...categoriesWithColors,
            [newCategory]: { color: newColor },
          });
        }

        handleModalClose();
      } else {
        const errorResponse = await response.json();
        throw new Error(`Failed to add expense: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Er ror adding expense: ", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDateFilterChange = (option) => {
    setSelectedDateOption(option);
  };

  const handleDateRangeChange = ([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  };

  const onCloseCalendar = () => {
    setSelectedDateOption("all");
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses
    .filter((expense) => {
      const expenseDate = dayjs(expense.date);
      const now = dayjs();
      switch (selectedDateOption) {
        case "day":
          return expenseDate.isSame(now, "day");
        case "week":
          return expenseDate.isSame(now, "week");
        case "month":
          return expenseDate.isSame(now, "month");
        case "custom":
          return (
            (!startDate || expenseDate.isSameOrAfter(dayjs(startDate))) &&
            (!endDate || expenseDate.isSameOrBefore(dayjs(endDate)))
          );
        default:
          return true;
      }
    })
    .filter((expense) => {
      return (
        selectedCategory === "all" || expense.category === selectedCategory
      );
    })
    .filter((expense) => (showRecurring ? expense.isRecurring : true));

  const updateCategoriesWithColors = (
    expenses,
    initialCategoriesWithColors = {}
  ) => {
    console.log("cat expensess:", expenses);
    const newCategoriesWithColors = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        // console.log(
        //   `Assigning color ${expense.color} to category ${expense.category}`
        // );
        acc[expense.category] = { color: expense.color };
      }
      return acc;
    }, initialCategoriesWithColors);
    setCategoriesWithColors(newCategoriesWithColors);
    // console.log(
    //   "Updated Categories with Colors Map: ",
    //   newCategoriesWithColors
    // );
  };

  // console.log("Filtered Expenses: ", filteredExpenses);
  // console.log("Show Recurring State: ", showRecurring);
  // console.log("Categories with Colors Map: ", categoriesWithColors);

  return (
    <>
      <div className="main-container">
        <Header
          expenses={expenses}
          onAddExpense={handleModalOpen}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          onDateFilterChange={handleDateFilterChange}
          selectedDateOption={selectedDateOption}
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={handleDateRangeChange}
          onCloseCalendar={onCloseCalendar}
          onToggleGeneral={handleToggleGeneral}
          onToggleRecurring={handleToggleRecurring}
        />
        <Expenses
          expenses={filteredExpenses}
          categoriesWithColors={categoriesWithColors}
          onDeleteExpense={handleDeleteExpense}
        />
        <Graphs
          expenses={filteredExpenses}
          categoriesWithColors={categoriesWithColors}
        />
        <AddExpense
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAddExpense={addExpense}
          categoriesWithColors={categoriesWithColors}
        />
      </div>
    </>
  );
}

export default App;
