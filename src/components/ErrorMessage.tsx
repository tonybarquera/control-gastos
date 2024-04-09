import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-center rounded-sm text-lg shadow-md">
      {children}
    </p>
  )
}

export default ErrorMessage; <div></div>