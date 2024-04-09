import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import { useBudget } from "./hooks/useBudget";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-bold text-4xl text-white">Planificador de Gastos</h1>
      </header>

      <div className="max-w-4xl mx-5 lg:mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        { isValidBudget ? <BudgetTracker /> :  <BudgetForm /> }
      </div>

      { isValidBudget && (
        <main className="max-w-4xl mx-5 py-10 lg:mx-auto">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
