import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import React, { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

function ExpenseForm() {
  const [ expense, setExpense ] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date
  });
  const [ error, setError ] = useState('');

  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter(expense => expense.id === state.editingId)[0];
      setExpense(editingExpense);
    }
  }, [state.editingId, state.expenses]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const previousAmount = state.editingId ? state.expenses.filter(expense => expense.id === state.editingId)[0].amount : 0;

    if(expense.amount > remainingBudget + previousAmount) {
      setError('Se ha rebasado el presupuesto');
      return;
    }

    if(state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } });
    } else {
      dispatch({ type: 'add-expense', payload: { expense: expense } });
    }

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2">{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto' }</legend>

      { error && <ErrorMessage>{error}</ErrorMessage> }

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

      <input type="submit" value={state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto' } className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" />
    </form>
  )
}

export default ExpenseForm;