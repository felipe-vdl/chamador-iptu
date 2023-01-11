import { useState, useEffect } from 'react';
import prisma from '../db';
let first = true;

export default function AdminPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(props.currentPassword.password);
  const [currentCallCounter, setCurrentCallCounter] = useState(props.currentCallCounter.counter);

  useEffect(() => {
    const passwordSocket = setInterval(async () => {
      const response = await fetch('/api/current');
      const data = await response.json();
      setCurrentPassword(data.id);
    }, 1500);

    return () => clearInterval(passwordSocket);
  }, []);

  useEffect(() => {
    const callCurrentSocket = setInterval(async () => {
      const response = await fetch('/api/counter', { method: "GET" });
      const data = await response.json();
      setCurrentCallCounter(data.counter);
    }, 1500);

    return () => clearInterval(callCurrentSocket);
  }, []);

  useEffect(() => {
    if (first) {
      first = false;
      return
    }

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Número ${currentPassword}`));
  }, [currentPassword, currentCallCounter]);

  const handleChamarProximo = async (n) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/proximo', {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
          nextId: currentPassword + n,
          currentId: currentPassword,
        }),
      });
      const data = await response.json();
      setCurrentPassword(data.id);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  const handleChamarAtual = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/counter', { method: "POST" });
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col gap-12 m-auto">
      <div className="m-auto bg-indigo-300 rounded p-8 border border-8 border-indigo-800 text-center text-slate-800 font-bold">
        <p className="text-3xl">Painel</p>
        <span className="text-[96px]">{currentPassword}</span>
      </div>
      <div className="flex flex-col text-white gap-8">
        <div className="flex gap-8">
          <button className="disabled:bg-indigo-600 p-2 bg-indigo-800 rounded hover:bg-indigo-900 text-1xl hover:text-indigo-300 w-36"
            disabled={isLoading}
            onClick={() => handleChamarProximo(-1)}
          >
            Chamar Anterior
          </button>
          <button className="disabled:bg-indigo-600 p-2 bg-indigo-800 rounded hover:bg-indigo-900 text-1xl hover:text-indigo-300 w-36"
            disabled={isLoading}
            onClick={handleChamarAtual}
          >
            Chamar Atual
          </button>
          <button className="disabled:bg-indigo-600 p-2 bg-indigo-800 rounded hover:bg-indigo-900 text-1xl hover:text-indigo-300 w-36"
            disabled={isLoading}
            onClick={() => handleChamarProximo(1)}
          >
            Chamar Próximo
          </button>
        </div>
      </div >
    </div>
  )
}

export const getServerSideProps = async context => {
  let currentPassword = await prisma.currentPassword.findMany();
  currentPassword = JSON.parse(JSON.stringify(currentPassword));

  let currentCallCounter = await prisma.counter.findMany();
  currentCallCounter = JSON.parse(JSON.stringify(currentCallCounter));

  return {
    props: {
      currentPassword: currentPassword[0],
      currentCallCounter: currentCallCounter[0]
    }
  }
}