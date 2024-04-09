import { useMemo } from "react";
import { categories } from "../data/categories";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";

type ExpenseDetailProps = {
  expense: Expense
}

function ExpenseDetail({ expense } : ExpenseDetailProps) {
  const dateObj = new Date(expense.date!.toString());
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const expenseDate = Intl.DateTimeFormat('es-ES', options).format(dateObj);

  const categoryInfo = useMemo(() => categories.find(category => category.id === expense.category), [expense]);


  return (
    <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>
        <img src={`/icono_${categoryInfo?.icon}.svg`} alt="category icon" className="w-20"/>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo?.name}</p>
        <p>{expense.expenseName}</p>
        <p className="text-slate-600 text-sm">{expenseDate}</p>
      </div>

      <AmountDisplay 
        amount={expense.amount}
      />
    </div>
  )
}

export default ExpenseDetail;