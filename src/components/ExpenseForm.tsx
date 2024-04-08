import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { ChangeEvent, useState } from "react";
import { DraftExpense, Value } from "../types";

function ExpenseForm() {
  const [ expense, setExpense ] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    });
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    });
  }

  return (
    <form className="space-y-5">
      <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2">Nuevo Gasto</legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input type="text" name="expenseName" id="expenseName" placeholder="Añade el Nombre del gasto" className="bg-slate-200 p-2" value={expense.expenseName} onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input type="number" name="amount" id="amount" placeholder="Añade la cantidad del gasto" className="bg-slate-200 p-2" value={expense.amount} onChange={handleChange} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoría:</label>
        <select id="category" name="category" className="bg-slate-200 p-2" value={expense.category} onChange={handleChange} >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">Fecha Gasto:</label>
        <DatePicker 
          className="bg-slate-200 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input type="submit" value="Registrar Gasto" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
    </form>
  )
}

export default ExpenseForm;