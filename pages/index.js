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

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Número ${currentPassword}`));
  }, [currentPassword, currentCallCounter]);

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

  return (
    <div className="m-auto bg-indigo-300 rounded min-w-[55%] p-8 border border-8 border-indigo-800 text-center text-slate-800 font-bold text-[256px]">
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