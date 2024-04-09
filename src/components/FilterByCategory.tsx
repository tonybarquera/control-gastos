import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

function FilterByCategory() {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { id: e.target.value } });
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form className="flex flex-col md:flex-row md:items-center gap-5">
        <label htmlFor="category">Filtrar Gastos</label>
        <select name="category" id="category" className="bg-slate-200 p-3 flex-1 rounded" onChange={handleChange}>
          <option value="">--- Todas las categorías ---</option>
          { categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          )) }
        </select>
      </form>
    </div>
  )
}

export default FilterByCategory;