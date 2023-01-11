import { useState } from 'react';

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
      win.document.write(`<h1 style="font-size: 120px; text-align: center; margin: auto;">${data.id}<h1>`);
      win.document.write('</body></html>');
      win.print();
      win.close();
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="m-auto">
      <button
        to={`/senha`}
        onClick={handleGerarSenha}
        className="text-white font-bold disabled:bg-indigo-600 p-2 bg-indigo-800 rounded hover:bg-indigo-900 text-1xl hover:text-indigo-300"
        disabled={isLoading}
      >
        {!isLoading ? "Imprimir Nova Senha" : "Imprimindo..."}
      </button>
    </div>
  );
}