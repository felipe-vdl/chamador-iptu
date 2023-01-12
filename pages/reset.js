import { useState } from "react";
export default function ResetPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/reset');
      setCurrentPassword(1);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }

  return (
    <div className='m-auto'>
      <button
        disabled={isLoading}
        className="text-white font-bold disabled:bg-red-300 disabled:text-slate-100 p-2 bg-red-800 rounded hover:bg-red-900 text-1xl hover:text-red-100 w-36"
        onClick={handleReset}
      >{isLoading ? "Reiniciando..." : "Reiniciar Fila"}</button>
    </div>
  );
}