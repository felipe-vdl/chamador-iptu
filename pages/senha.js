import { useState } from 'react';
import mainLogo from "../public/logo.png";

export default function Senha() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGerarSenha = async evt => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/gerarsenha');
      if (!response.ok) {
        throw new Error('There was an error!');
      }

      const data = await response.json();
      console.log(data);
      let win = window.open();
      win.document.write('<html><head><title>Print it!</title></head><body style="margin: 0; display: flex;">');
      win.document.write(`<h1 style="font-size: 120px; text-align: center; margin: 0 auto; margin-bottom: auto;">${data.id}<h1>`);
      win.document.write('</body></html>');
      win.print();
      win.close();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <img src={mainLogo.src} className="self-center sm:self-center md:self-start mb-3 mt-5 ml-5 w-[250px]" />
      <h1 className='self-center text-3xl mt-auto mb-5 text-center shadow px-12 py-2 bg-blue-100'>Clique no botão para imprimir uma senha</h1>
      <button
        to={`/senha`}
        onClick={handleGerarSenha}
        className="shadow-lg shadow-indigo-500 hover:shadow-indigo-600 self-center text-white mb-auto font-bold hover:shadow-blue-500 disabled:bg-indigo-300 disabled:text-slate-100 active:bg-blue-700 p-2 bg-indigo-800 rounded hover:scale-105 transition hover:bg-blue-900 text-[86px] px-8 hover:text-blue-100"
        disabled={isLoading}
      >
        {!isLoading ? "Imprimir" : "Imprimindo..."}
      </button>
      <footer className='shadow-inner shadow-indigo-800 mt-auto bg-indigo-800 p-1 text-indigo-200 text-white text-xs text-center'>2023 © Subsecretaria de Tecnologia da Informação — Prefeitura Municipal de Mesquita</footer>
    </div>
  );
}