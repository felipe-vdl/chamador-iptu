import prisma from '../db';
import { useState, useEffect } from 'react';
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
    <div className="m-auto bg-blue-300 rounded min-w-[55%] p-8 border-8 border-indigo-800 text-center text-slate-800 font-bold text-[256px]">
      {currentPassword}
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