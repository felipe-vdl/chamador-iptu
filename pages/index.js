import prisma from '../db';
import { useState, useEffect } from 'react';
import mainLogo from "../public/logo.png";
let first = true;

export default function HomePage(props) {
  const [currentPassword, setCurrentPassword] = useState(props.currentPassword.password);
  const [currentCallCounter, setCurrentCallCounter] = useState(props.currentCallCounter.counter);
  
  
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

  return (
    <div className='flex flex-col h-screen'>
      <img src={mainLogo.src} className="self-center sm:self-center md:self-start mb-3 mt-5 ml-5 w-[250px]" />
      <h2 className='text-center text-xl mt-auto'>Chamada</h2>
      <div className="m-auto mb-3 mt-3 bg-blue-300 rounded w-[95%] p-8 border-8 border-indigo-800 text-center text-slate-800 font-bold text-[220px]">
        {currentPassword}
      </div>
      <footer className='mt-auto bg-indigo-800 p-1 text-indigo-200 text-white text-xs text-center'>2023 © Subsecretaria de Tecnologia da Informação — Prefeitura Municipal de Mesquita</footer>
    </div>
  );
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