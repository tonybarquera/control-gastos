import { categories } from "../data/categories";

function ExpenseForm() {
  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input type="text" name="expenseName" id="expenseName" placeholder="Añade el Nombre del gasto" className="bg-slate-200 p-2" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input type="number" name="amount" id="amount" placeholder="Añade la cantidad del gasto" className="bg-slate-200 p-2" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoría:</label>
        <select id="category" name="category" className="bg-slate-200 p-2">
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <input type="submit" value="Registrar Gasto" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
    </form>
  )
}

export default ExpenseForm;