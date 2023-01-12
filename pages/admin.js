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
    }, 1000);

    return () => clearInterval(passwordSocket);
  }, []);

  useEffect(() => {
    const callCurrentSocket = setInterval(async () => {
      const response = await fetch('/api/counter', { method: "GET" });
      const data = await response.json();
      setCurrentCallCounter(data.counter);
    }, 1000);

    return () => clearInterval(callCurrentSocket);
  }, []);

  useEffect(() => {
    if (first) {
      first = false;
      return
    }

    const voices = window.speechSynthesis.getVoices();
    let newSpeech = new SpeechSynthesisUtterance(`Número ${currentPassword}`);
    newSpeech.voice = voices[0];
    window.speechSynthesis.speak(newSpeech);
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

      if (data.id === currentPassword) {
        setIsLoading(false);
        return
      }

      setCurrentPassword(data.id);
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

  const handleChamarAtual = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/counter', { method: "POST" });
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
    <div className="flex flex-col gap-12 m-auto">
      <div className="m-auto bg-blue-300 rounded p-8 border-8 border-indigo-800 text-center text-slate-800 font-bold">
        <p className="text-3xl">Painel</p>
        <span className="text-[96px]">{currentPassword}</span>
      </div>
      <div className="flex flex-col text-white gap-8">
        <div className="flex gap-8">
          <button className="text-white font-bold disabled:bg-indigo-300 disabled:text-slate-100 p-2 bg-indigo-800 rounded hover:bg-blue-900 text-1xl hover:text-blue-100 w-36"
            disabled={isLoading}
            onClick={() => handleChamarProximo(-1)}
          >
            {isLoading ? "Chamando..." : "Chamar Anterior"}
          </button>
          <button className="text-white font-bold disabled:bg-indigo-300 disabled:text-slate-100 p-2 bg-indigo-800 rounded hover:bg-blue-900 text-1xl hover:text-blue-100 w-36"
            disabled={isLoading}
            onClick={handleChamarAtual}
          >
            {isLoading ? "Chamando..." : "Chamar Atual"}
          </button>
          <button className="text-white font-bold disabled:bg-indigo-300 disabled:text-slate-100 p-2 bg-indigo-800 rounded hover:bg-blue-900 text-1xl hover:text-blue-100 w-36"
            disabled={isLoading}
            onClick={() => handleChamarProximo(1)}
          >
            {isLoading ? "Chamando..." : "Chamar Próximo"}
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