import AmountDisplay from "./AmountDisplay";
import { CircularProgressbarWithChildren ,buildStyles } from 'react-circular-progressbar';
import { useBudget } from "../hooks/useBudget";
import 'react-circular-progressbar/dist/styles.css';
import RadialSeparators from "./RadioSeparator";

function BudgetTracker() {
  const { state, dispatch, remainingBudget, totalExpenses } = useBudget();
  
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbarWithChildren value={percentage}
            styles={buildStyles({
              pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#D9D9D9',
              textSize: 8,
              textColor: '#3B82F6',
              strokeLinecap: "butt",
              pathTransitionDuration: 0.8
            })}
            text={`${percentage}% Gastado`}
            strokeWidth={15}
          >
            <RadialSeparators
              count={10}
              style={{
                background: "#fff",
                width: "5px",
                // This needs to be equal to props.strokeWidth
                height: `${15}%`
              }}
            />
          </CircularProgressbarWithChildren>
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button
            type="button"
            className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
            onClick={() => dispatch({ type: 'remove-budget' })}
          >Reiniciar App</button>

          <AmountDisplay 
            label="Presupuesto"
            amount={state.budget}
          />

          <AmountDisplay 
            label="Disponible"
            amount={remainingBudget}
          />

          <AmountDisplay 
            label="Gastado"
            amount={totalExpenses}
          />
        </div>
      </div>
    </>
  )
}

export default BudgetTracker;