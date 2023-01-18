import { useState } from "react";
import mainLogo from "../public/logo.png";

export default function ResetPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/reset');
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
    <div className='flex flex-col h-screen'>
      <img src={mainLogo.src} className="self-center sm:self-center md:self-start mb-3 mt-5 ml-5 w-[250px]" />
      <button
        disabled={isLoading}
        className="m-auto shadow-lg shadow-red-500 hover:shadow-yellow-300 self-center text-white mb-auto font-bold disabled:bg-red-300 disabled:text-slate-100 active:bg-red-500 p-2 bg-red-600 rounded hover:scale-105 transition hover:bg-orange-700 text-[50px] px-8 hover:text-red-100"
        onClick={handleReset}
      >{isLoading ? "Reiniciando..." : "Reiniciar Fila"}</button>
      <footer className='mt-auto bg-indigo-800 p-1 text-indigo-200 text-white text-xs text-center'>2023 © Subsecretaria de Tecnologia da Informação — Prefeitura Municipal de Mesquita</footer>
    </div>
  );
}