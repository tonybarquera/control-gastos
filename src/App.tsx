import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"

function App() {
  const context = useBudget();
  console.log(context);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-bold text-4xl text-white">Planificador de Gastos</h1>
      </header>

      <div className="max-w-4xl mx-5 lg:mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  )
}

export default App
